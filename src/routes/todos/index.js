import clientPromise from '$lib/db';

export async function get(request) {
	try {
		// console.log(Date.now());
		// console.log(request.url.href);
		console.log('index.js');

		// http://localhost:3000/todos?completed=true
		// http://localhost:3000/todos?completed=false
		const completed = request.url.searchParams.get('completed') === 'true' ? true : false;
		console.log('completed ?');
		console.log(completed);

		// we import the clientPromise from $lib/db.js
		const dbConnection = await clientPromise;
		const db = dbConnection.db(process.env['MONGODB_DB']);
		const collectionName = process.env['MONGO_DB_TODOS_COLLECTION'];
		const collection = db.collection(collectionName);

		// show all documents in the collection in an array
		let todos = await collection.find().toArray();
		// console.log(todos);

		// show all completed todos in the collection in an array
		// const todos = await collection.find(completed).toArray();
		// console.log(todos);
		return {
			status: 200,
			body: {
				todos
			}
		};
	} catch (error) {
		return {
			status: 500,
			body: {
				error: 'Server error : ' + error
			}
		};
	}
}

export async function post({ request }) {
	const todoPayload = await request.json();

	// now let's post the data in our collection
	// we import the clientPromise from $lib/db.js
	const dbConnection = await clientPromise;
	const db = dbConnection.db(process.env['MONGODB_DB']);
	const collectionName = process.env['MONGO_DB_TODOS_COLLECTION'];
	const collection = db.collection(collectionName);

	// insert the todoPayload into the collection
	await collection.insertOne(todoPayload);

	return {
		status: 200,
		body: {
			todoPayload
		}
	};
}
