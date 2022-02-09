<script>
	// we get these todos from the shadow endpoint upon a GET /todos request
	// also we receive the tods as JSON since we JSON.stringify before sending them
	export let todos;
	todos = JSON.parse(todos);
</script>

{#each todos as todo}
	<p>todo id : {todo._id}</p>
{/each}
