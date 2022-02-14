<script>
	// load todos from MongoDB
	// this prop comes from the /todos/index.js and is loaded there and displayed here
	// when loading or navigating to the /todos route
	export let todos;
	// console.log(todos);

	// keep client up to date or in sync with the server side todos
	// run this after a todo is added, changed or deleted on the server
	async function fetchTodos() {
		const url = '/todos/api.json';
		const response = await fetch(url);
		const latestTodos = await response.json();
		// if return is body:{ todos } then todos = latestTodos.todos
		// if return is body: todos then todos = latestTodos
		todos = latestTodos;
	}

	// post todo data to MongoDB
	let payload, payloadJSON, name, email, age, todoDate, completed;

	name = 'John Smith';
	email = 'john@example.com';
	age = '23';
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
		// the HTML we get back from the shadow endpoint
		// const data = await response.text();
		// console.log(data);

		// keep client up to date or in sync with the server side todos
		// run this after a todo is added, changed or deleted on the server
		fetchTodos();
	}
</script>

<h1>Add Todo Data</h1>

<input type="text" label="name" name="name" bind:value="{name}" />
<input type="text" label="email" name="email" bind:value="{email}" />
<input type="text" label="age" name="age" bind:value="{age}" />
<input type="text" label="date" name="todoDate" bind:value="{todoDate}" />
<input type="text" label="completed" name="completed" bind:value="{completed}" />
<button on:click="{addTodo}">Add Todo</button>

<h1>MongoDB Todos</h1>
<hr />
{#each todos as todo}
	<p>{todo._id}</p>
	<p>{todo.name}</p>
	<p>{todo.email}</p>
	<p>{todo.age}</p>
	<p>{todo.todoDate}</p>
	<p>completed : {todo.completed}</p>
	<input type="checkbox" name="completed" bind:checked="{todo.completed}" />
	<hr />
{/each}
