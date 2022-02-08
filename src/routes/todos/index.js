import clientPromise from '$lib/db';

export async function get(request) {
	try {
		// http://localhost:3000/todos?completed=true
		// http://localhost:3000/todos?completed=false

		// console.log(request);

		// const params = request.url.searchParams;
		// console.log(params);

		// event.query has been replaced by event.url.searchParams
		// so this
		// const completed = request.query.get('complete') === 'true' ? true : false;
		// becomes this
		const completed = request.url.searchParams.get('completed') === 'true' ? true : false;
		// console.log(completed);

		// we import the clientPromise from $lib/db.js
		const dbConnection = await clientPromise;

		const db = dbConnection.db(process.env['MONGODB_DB']);
		const dbName = db.databaseName;
		// console.log(dbName);

		const collectionName = process.env['MONGO_DB_TODOS_COLLECTION'];
		console.log(collectionName);

		const collection = db.collection(collectionName);
		// console.log(collection);

		// show all documents in the collection in an array
		const todos = await collection.find().toArray();
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

export async function post(request) {
	try {
		// we import the clientPromise from $lib/db.js
		const dbConnection = await clientPromise;

		const db = dbConnection.db(process.env['MONGODB_DB']);
		// const dbName = db.databaseName;
		// console.log(dbName);

		const collectionName = process.env['MONGO_DB_TODOS_COLLECTION'];
		console.log(collectionName);

		const collection = db.collection(collectionName);
		// console.log(collection);

		// on the client we JSON.stringify to send the data
		// on the server we JSON.parse to accept the data
		const todo = JSON.parse(request.body);

		// insert todo into the collection of the db
		await collection.insertOne(todo);

		return {
			status: 200,
			body: {
				status: 'Success'
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
