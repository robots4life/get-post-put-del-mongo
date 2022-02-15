import clientPromise from '$lib/db';

export async function get(request) {
	try {
		console.log(Date.now());
		console.log(request.url.href);
		console.log('index.js');

		// we import the clientPromise from $lib/db.js
		const dbConnection = await clientPromise;
		const db = dbConnection.db(process.env['MONGODB_DB']);
		const collectionName = process.env['MONGO_DB_TODOS_COLLECTION'];
		const collection = db.collection(collectionName);

		// show all completed todos in the collection in an array
		const todos = await collection.find({ completed: true }).toArray();
		console.log('=========================');
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

const user = { id: 0, username: 'hans' };

function haveFun({ id, username }) {
	console.log(`hi ${username} your id is ${id}`);
}
haveFun(user);
