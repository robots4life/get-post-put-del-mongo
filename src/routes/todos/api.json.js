import clientPromise from '$lib/db';

export async function get(request) {
	try {
		console.log('api.json.js');
		// console.log(Date.now());
		// console.log(request.url.href);

		// ==> so the temporary solution is to make an index.json.js file
		// under the same route and direct fetch requests to that endpoint
		// after a post request

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
		let todos = await collection.find().toArray();
		console.log(todos);

		// if we like we can send todos as JSON
		// and parse them on the client
		// but this step is not necessary
		// todos = JSON.stringify(todos);
		// console.log(todos);

		// show all completed todos in the collection in an array
		// const todos = await collection.find(completed).toArray();
		// console.log(todos);
		return {
			status: 200,
			// headers: {
			// 	'Content-Type': 'application/json'
			// },

			// ATTENTION !
			// wrapping todos in an object will create an object key "todos"
			// and mess up the object structure
			// CHECK THE DIFFERENCE !
			// works
			/*
			[{
				_id: new ObjectId("6207b72ea4b82b3d1c052508"),
				name: 'John Smith',
				email: 'john@example.com',
				age: '45',
				todoDate: 1644672812250,
				completed: false
			}]

			VERSUS

			// does not work
			{
				todos: [{
					_id: '6207b72ea4b82b3d1c052508',
					name: 'John Smith',
					email: 'john@example.com',
					age: '45',
					todoDate: 1644672812250,
					completed: false
				}]
			}
			*/

			// does not work
			// body: {
			// 	todos
			// }

			// does work
			// I think for the API JSON can be passed as it
			// whereas when returning a page get request the props need to be
			// wrapped in an object..
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
