export async function get(request) {
	// http://localhost:3000/todos?completed=true
	// http://localhost:3000/todos?completed=false

	// console.log(request);

	// const params = request.url.searchParams;
	// console.log(params);

	// event.query has been replaced by event.url.searchParams
	// so this
	// const completed = request.query.get('complete') === 'true' ? true : false;
	// becomes this
	const completed = request.url.searchParams.get('completed') === 'true' ? true : false;
	console.log(completed);

	return {
		status: 200,
		body: {
			completed: completed
		}
	};
}

// export async function post(request) {}
// export async function put(request) {}
// export async function del(request) {}
