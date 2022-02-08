<script>
	export let todos;

	let todoText;

	function addTodo() {
		console.log(todoText);
	}
</script>

<h1>TODOS</h1>

<hr />

{JSON.stringify(todos)}

<hr />

<h2>Add Todo</h2>

<input type="text" bind:value="{todoText}" />
<button on:click="{addTodo}">Add Todo</button>
