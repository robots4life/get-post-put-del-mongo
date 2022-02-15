<script>
	// load todos from MongoDB
	// this prop comes from the /todos/index.js and is loaded there and displayed here
	// when loading or navigating to the /todos route
	export let todos;
	// console.log(todos);

	// keep client up to date or in sync with the server side todos
	// run this after a todo is added, changed or deleted on the server
	async function fetchTodos() {
		try {
			// on the /todos?completed=true route with a todo that has completed: true state
			// and this todo is switched to completed: false state this fetchTodos function
			// will return the completed: false todo and render it under /todos?completed=true

			// to change this behviour we pass the url search parameters along to the api
			// and return only the todos under the /todos?completed=true route
			let urlParams = window.location.search;

			const url = '/todos/api.json' + urlParams;
			const response = await fetch(url);
			const latestTodos = await response.json();
			// console.log(latestTodos);

			// if return is body:{ todos } then todos = latestTodos.todos
			// if return is body: todos then todos = latestTodos

			// here we update the exported props "todos" in the client
			// with the latest todos from the server
			todos = latestTodos;
		} catch (error) {
			console.log('ERROR');
			console.log(error);
		}
	}

	// post todo data to MongoDB
	let payload, payloadJSON, name, email, age, todoDate, completed;

	async function addTodo() {
		// just some random values for the form fields
		// https://stackoverflow.com/a/4550514
		const names = ['Rob', 'Mary', 'Petra', 'Candice', 'John', 'Stewart', 'Lucy'];
		name = names[Math.floor(Math.random() * names.length)];

		const emails = ['hello@abc.com', 'contact@whynot.com', 'info@hal.org', 'hello@quantum.to'];
		email = emails[Math.floor(Math.random() * emails.length)];

		const ages = ['23', '35', '45', '61', '21', '42'];
		age = ages[Math.floor(Math.random() * ages.length)];

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
		console.log(payloadJSON);
		try {
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
		} catch (error) {
			console.log('ERROR');
			console.log(error);
		}
	}

	async function completeTodo(todo) {
		try {
			console.log(todo._id);
			console.log(todo.completed);
			const response = await fetch('/todos', {
				method: 'PUT',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(todo)
			});
			// keep client up to date or in sync with the server side todos
			// run this after a todo is added, changed or deleted on the server
			fetchTodos();
		} catch (error) {
			console.log('ERROR');
			console.log(error);
		}
	}
</script>

<h3>Add Todo Data</h3>

<input type="text" label="name" name="name" bind:value="{name}" />
<input type="text" label="email" name="email" bind:value="{email}" />
<input type="text" label="age" name="age" bind:value="{age}" />
<input type="text" label="date" name="todoDate" bind:value="{todoDate}" />
<input type="text" label="completed" name="completed" bind:value="{completed}" />
<button on:click="{addTodo}">Add Todo</button>

<h3>MongoDB Todos</h3>
<hr />
{#each todos as todo}
	<p>{todo._id}</p>
	<p>{todo.name}</p>
	<p>{todo.email}</p>
	<p>{todo.age}</p>
	<p>{todo.todoDate}</p>
	<p>completed : {todo.completed}</p>
	<input
		type="checkbox"
		name="completed"
		bind:checked="{todo.completed}"
		on:change="{completeTodo(todo)}"
	/>
	<hr />
{/each}
