<script>
	export let todos;

	let todoText = '';

	function addTodo() {
		if (todoText !== '') {
			console.log(todoText);
			todoText = '';
		}
	}
</script>

<h1>TODOS</h1>

<hr />

{JSON.stringify(todos)}

<hr />

<h2>Add Todo</h2>

<input type="text" bind:value="{todoText}" placeholder="Add Todo" />
<button on:click="{addTodo}">Add Todo</button>
