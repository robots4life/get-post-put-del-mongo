<script context="module">
	export async function load({ params, fetch, session, stuff }) {
		try {
			const url = '/todos/api.json';
			const response = await fetch(url);

			// AAA
			// if we return the todos data from api.json.js in an ARRAY like so
			// body: todos
			// then we return the todos as props inside an object

			// in the end we will need "array-like objects" so {[],[],[]}

			// https://developer.mozilla.org/en-US/docs/Web/API/Response/json
			// Note that despite the method being named json(), the result is not JSON but is instead
			// the result of taking JSON as input and parsing it to produce a JavaScript object.
			const todos = await response.json();
			console.log('load function');
			console.log(todos);

			if (response.ok) {
				return {
					props: {
						todos
					}
				};
			}

			// BBB
			// if we return the todos data from api.json.js in an OBJECT like so
			// body: {
			// 	todos
			// }
			// then we return the todos as props inside an object with
			// a key of "todos" that has a value of the returned todosObject with property todos

			// in the end we will need "array-like objects" so {[],[],[]}

			// https://developer.mozilla.org/en-US/docs/Web/API/Response/json
			// Note that despite the method being named json(), the result is not JSON but is instead
			// the result of taking JSON as input and parsing it to produce a JavaScript object.
			// const todosObject = await response.json();
			// console.log(todosObject);

			// if (response.ok) {
			// 	return {
			// 		props: {
			// 			todos: todosObject.todos
			// 		}
			// 	};
			// }
		} catch (error) {
			console.log('ERROR');
			console.log(error);

			return {
				status: response.status,
				error: new Error(`Could not load url`)
			};
		}
	}
</script>

<script>
	// load todos from MongoDB
	// this prop comes from the /todos/index.js and is loaded there and displayed here
	// when loading or navigating to the /todos route
	export let todos;

	// keep client up to date or in sync with the server side todos
	// run this after a todo is added, changed or deleted on the server
	async function fetchTodos() {
		const url = '/todos/api.json';
		const response = await fetch(url);
		// https://developer.mozilla.org/en-US/docs/Web/API/Response/json
		// Note that despite the method being named json(), the result is not JSON but is instead
		// the result of taking JSON as input and parsing it to produce a JavaScript object.
		// this cannot be named todos because then we have an assignment to constant variable
		// so we name this latestTodos
		const latestTodos = await response.json();

		// here, finally, we update the exported props "todos" in the client
		// with the latest todos from the server
		todos = latestTodos;
	}

	// load external data
	async function fetchPosts() {
		const response = await fetch('https://css-tricks.com/wp-json/wp/v2/posts');
		const wpPosts = await response.json();
		return wpPosts;
	}
	const wpPostsPromise = fetchPosts();

	// https://svelte.dev/repl/0104cd0c8b934b10a1887c3e962e7860?version=3.46.4
	// load external data on click of button
	// define the promose outside of the async function
	// and also outside of the button buttonFetchPosts function
	// this is necessary for the {#await placeholderPostsPromise} block
	// as otherwise the {#await promise} block is undefined
	let placeholderPostsPromise;

	function buttonFetchPosts() {
		// load external data on click of button function
		async function fetchPostsJSONPlaceholder() {
			const response = await fetch('https://jsonplaceholder.typicode.com/posts');
			const placeholderPosts = await response.json();
			return placeholderPosts;
		}
		placeholderPostsPromise = fetchPostsJSONPlaceholder();
	}

	// post todo data to MongoDB
	let payload, payloadJSON, name, email, age, todoDate, completed;

	name = 'John Smith';
	email = 'john@example.com';
	age = '45';
	todoDate = Date.now();
	completed = false;

	payload = {
		name,
		email,
		age,
		todoDate,
		completed
	};

	// stringify the payload
	payloadJSON = JSON.stringify(payload);
	// console.log(payloadJSON);

	async function addTodo() {
		const response = await fetch('/todos', {
			method: 'POST',
			// can be included, not a must
			headers: {
				'Content-Type': 'application/json'
			},
			body: payloadJSON
		});
		// ATTENTION !
		// now here the data we get back from the response is the /todos´ page HTML
		// since that is what the async export get() /todos page is returning
		// *1
		// However, when we log the request data on the server
		// we correctly get the payload as JSON
		// check both, your terminal and the browser console to
		// understand 100% what is happening
		const data = await response.text();
		console.log(data);

		// keep client up to date or in sync with the server side todos
		// run this after a todo is added, changed or deleted on the server
		fetchTodos();
	}
</script>

<h1>Add Todo Data</h1>

<input type="text" label="name" name="name" bind:value="{name}" />
<input type="text" label="email" name="email" bind:value="{email}" />
<input type="text" label="email" name="age" bind:value="{age}" />
<input type="text" label="age" name="todoDate" bind:value="{todoDate}" />
<input type="text" label="date" name="completed" bind:value="{completed}" />
<button on:click="{addTodo}">Add Todo</button>

<hr />
<button on:click="{buttonFetchPosts}">Fetch Posts from JSONPlaceholder</button>

{#if placeholderPostsPromise}
	<h1>Button Fetch Posts from JSONPlaceholder</h1>
	<!-- content here -->
	<div>
		{#await placeholderPostsPromise}
			<p>Loading...</p>
		{:then placeholderPosts}
			{#each placeholderPosts as placeholderPost}
				<p>Post ID : {placeholderPost.id}</p>
				<p>User ID : {placeholderPost.userId}</p>
				<p>Post Title : {placeholderPost.title}</p>
				<p>Post Data : {placeholderPost.body}</p>
				<hr />
			{/each}
		{:catch error}
			<p style="color: red">{error.message}</p>
		{/await}
	</div>
{/if}

<h1>MongoDB Todos</h1>
<hr />
{#each todos as todo}
	<p>{todo._id}</p>
	<p>{todo.name}</p>
	<p>{todo.email}</p>
	<p>{todo.age}</p>
	<p>{todo.todoDate}</p>
	<hr />
{/each}

<h1>External WP JSON POST Data</h1>

<div>
	{#await wpPostsPromise}
		<p>Loading...</p>
	{:then wpPosts}
		{#each wpPosts as wpPost}
			<p>Post ID : {wpPost.id}</p>
			<p>Post Title : {wpPost.title.rendered}</p>
			<p>Post Data : {wpPost.date}</p>
			<p>Post Link : <a href="{wpPost.link}" target="_blank">{wpPost.link}</a></p>
			<hr />
		{/each}
	{:catch error}
		<p style="color: red">{error.message}</p>
	{/await}
</div>
