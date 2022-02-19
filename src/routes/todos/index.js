import clientPromise from '$lib/db';
import { ObjectId } from 'mongodb';

export async function get(request) {
	try {
		console.log(Date.now());
		console.log(request.url.href);
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
		// const todos = await collection.find().toArray();
		// console.log(todos);

		// show all completed todos in the collection in an array
		// under route /todos no url.searchParams value is given, so it defaults to completed: false
		const todos = await collection.find({ completed: completed }).toArray();
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

export async function post({ request }) {
	try {
		const todoPayload = await request.json();
		// now let's post the data in our collection
		// we import the clientPromise from $lib/db.js
		const dbConnection = await clientPromise;
		const db = dbConnection.db(process.env['MONGODB_DB']);
		const collectionName = process.env['MONGO_DB_TODOS_COLLECTION'];
		const collection = db.collection(collectionName);

		// insert the todoPayload into the collection
		const result = await collection.insertOne(todoPayload);
		console.log(result);

		return {
			status: 200,
			body: {
				todoPayload
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

export async function put({ request }) {
	try {
		const updatedTodo = await request.json();
		console.log(updatedTodo._id);
		console.log(updatedTodo.completed);
		// now let's update the data in our collection
		// we import the clientPromise from $lib/db.js
		const dbConnection = await clientPromise;
		const db = dbConnection.db(process.env['MONGODB_DB']);
		const collectionName = process.env['MONGO_DB_TODOS_COLLECTION'];
		const collection = db.collection(collectionName);

		// put the updated todo in the document with the todo _id and update the todo data
		// https://mongodb.github.io/node-mongodb-native/4.3/#update-a-document
		const result = await collection.updateOne(
			{ _id: ObjectId(updatedTodo._id) },
			// they key "completed" is updated with the value of what completed was set to in the client
			{ $set: { completed: updatedTodo.completed } }
		);
		console.log(result);
		return {
			status: 200,
			body: {
				updatedTodo
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

export async function del({ request }) {
	try {
		const deleteTodo = await request.json();
		console.log(deleteTodo._id);
		// now let's delete the data in our collection
		// we import the clientPromise from $lib/db.js
		const dbConnection = await clientPromise;
		const db = dbConnection.db(process.env['MONGODB_DB']);
		const collectionName = process.env['MONGO_DB_TODOS_COLLECTION'];
		const collection = db.collection(collectionName);

		const result = await collection.deleteOne({ _id: ObjectId(deleteTodo._id) });
		console.log(result);

		return {
			status: 200,
			body: {
				message: 'Todo deleted'
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
