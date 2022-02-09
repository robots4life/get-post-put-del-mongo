<script>
	// we get these todos from the shadow endpoint upon a GET /todos request
	// also we receive the tods as JSON since we JSON.stringify before sending them
	// depending on if this is needed the todos need to be JSON.parse
	export let todos;
	// todos = JSON.parse(todos);

	// fetching todos from the collection on click of a button
	export let latestTodos;
	async function fetchTodos() {
		try {
			const response = await fetch('/todos.json');
			// .json parses a JSON response into native JavaScript objects
			latestTodos = await response.json();
			console.log(latestTodos);
		} catch (error) {
			console.log('ERROR');
			console.log(error);
		}
	}

	// let promise = fetchTodos();

	// add a todo
	let todoPayload,
		formValueName,
		formValueEmail,
		formValueAge,
		formValueTodoDate,
		todoPayloadJSON;
	formValueName = 'John Smith';
	formValueEmail = 'john@example.com';
	formValueAge = '45';
	formValueTodoDate = Date.now(); // Unix timestamp https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/now

	todoPayload = {
		formValueName,
		formValueEmail,
		formValueAge,
		formValueTodoDate
	};
	// console.log(todoPayload);

	// send the todo as JSON
	todoPayloadJSON = JSON.stringify(todoPayload);
	// console.log(todoPayloadJSON);

	async function addTodo() {
		console.log('Hello from addTodo function');

		// https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch#uploading_json_data
		// upload the todo
		const response = await fetch('/todos', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: todoPayloadJSON
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
	}
</script>

{#each todos as todo}
	<p>todo id : {todo._id}</p>
{/each}

<button on:click="{fetchTodos}">Fetch Todos From Shadow Endpoint</button>

{JSON.stringify(latestTodos)}

<hr />

<input type="text" label="name" name="name" bind:value="{formValueName}" />
<input type="text" label="email" name="email" bind:value="{formValueEmail}" />
<input type="text" label="age" name="age" bind:value="{formValueAge}" />
<input type="text" label="date" name="date" bind:value="{formValueTodoDate}" />
<button on:click="{addTodo}">Add Todo</button>
