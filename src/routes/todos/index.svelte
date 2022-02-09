<script>
	// we get these todos from the shadow endpoint upon a GET /todos request
	// also we receive the tods as JSON since we JSON.stringify before sending them
	// depending on if this is needed the todos need to be JSON.parse
	export let todos;
	// todos = JSON.parse(todos);

	// fetching todos from the collection on click of a button
	async function fetchTodos() {
		try {
			const response = await fetch('/todos.json');
			console.log(response);
		} catch (error) {
			console.log('ERROR');

			console.log(error);
		}
	}
</script>

{#each todos as todo}
	<p>todo id : {todo._id}</p>
{/each}

<button on:click="{fetchTodos}">Fetch Todos From Shadow Endpoint</button>
