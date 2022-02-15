<script>
	export let todos;

	// keep client up to date or in sync with the server side todos
	// run this after a todo is added, changed or deleted on the server
	async function fetchTodos() {
		try {
			const url = '/todos/api.json?completed=true';
			const response = await fetch(url);
			const latestTodos = await response.json();
			// if return is body:{ todos } then todos = latestTodos.todos
			// if return is body: todos then todos = latestTodos
			todos = latestTodos;
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

<h3>MongoDB Completed Todos</h3>
<hr />
{#each todos as todo}
	<!-- <p>{todo._id}</p> -->
	<p>{todo.name}</p>
	<!-- <p>{todo.email}</p> -->
	<!-- <p>{todo.age}</p> -->
	<!-- <p>{todo.todoDate}</p> -->
	<p>completed : {todo.completed}</p>
	<input
		type="checkbox"
		name="completed"
		bind:checked="{todo.completed}"
		on:change="{completeTodo(todo)}"
	/>
	<hr />
{/each}
