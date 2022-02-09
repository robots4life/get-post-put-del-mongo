import clientPromise from '$lib/db';

export async function get(request) {
	try {
		// http://localhost:3000/todos?completed=true
		// http://localhost:3000/todos?completed=false

		const completed = request.url.searchParams.get('completed') === 'true' ? true : false;
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
		todos = JSON.stringify(todos);

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
