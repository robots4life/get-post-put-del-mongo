// test local mongodb server
// in get-post-put-del-mongo/src/lib run node mongodbtest.js
// result should be Connected successfully to server
import { MongoClient } from 'mongodb';

const uri = 'mongodb://localhost:27017';

// Create a new MongoClient
const client = new MongoClient(uri);

async function run() {
	try {
		// Connect the client to the server
		await client.connect();

		// Establish and verify connection
		await client.db('admin').command({ ping: 1 });
		console.log('Connected successfully to server');
	} finally {
		// Ensures that the client will close when you finish/error
		await client.close();
	}
}
run().catch(console.dir);
