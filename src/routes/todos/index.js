import clientPromise from '$lib/db';

export async function get(request) {
	try {
		// let's try and see if we can catch the fetchPosts request from the /todos route ??
		// console.log(request);
		console.log('index.js');
		// console.log(Date.now());
		console.log(request.url.href);

		// No ! This is currently not possible.
		// https://github.com/sveltejs/kit/issues/3532
		// "the initial GET would be populated with todos,
		// but when rendering the page following a POST to /todos, the todos prop would be undefined."

		// ==> so the temporary solution is to make an index.json.js file
		// under the same route and direct fetch requests to that endpoint
		// after a post request

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

		// if we like we can send todos as JSON
		// and parse them on the client
		// but this step is not necessary
		// todos = JSON.stringify(todos);

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
	// *1
	// here we correctly accept the uploaded JSON data
	// from the post request
	// check both, your terminal and the browser console to
	// understand 100% what is happening
	console.log(todoPayload);

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
