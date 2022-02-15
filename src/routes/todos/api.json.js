import clientPromise from '$lib/db';

export async function get(request) {
	try {
		// console.log(Date.now());
		// console.log(request.url.href);
		console.log('api.json.js');

		// http://localhost:3000/todos?completed=true
		// http://localhost:3000/todos?completed=false
		const completed = request.url.searchParams.get('completed') === 'true' ? true : false;
		// console.log('completed ?');
		// console.log(completed);

		// we import the clientPromise from $lib/db.js
		const dbConnection = await clientPromise;
		const db = dbConnection.db(process.env['MONGODB_DB']);
		const collectionName = process.env['MONGO_DB_TODOS_COLLECTION'];
		const collection = db.collection(collectionName);

		// show all documents in the collection in an array
		const todos = await collection.find().toArray();
		// console.log(todos);

		// show all completed todos in the collection in an array
		// const todos = await collection.find(completed).toArray();
		// console.log(todos);
		return {
			status: 200,
			// mind the difference between returning body: todos and body: { todos }
			body: todos
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
