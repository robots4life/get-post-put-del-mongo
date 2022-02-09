import clientPromise from '$lib/db';

export async function get(request) {
	try {
		console.log('index.json.js');
		// console.log(Date.now());
		// console.log(request.url.href);

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
		let latestTodos = await collection.find().toArray();
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
				latestTodos
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
