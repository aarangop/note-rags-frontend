import notesClient from '$lib/api/notes/client.js';

export async function load({ params }) {
	const { data, error } = await notesClient.GET('/notes/{id}', {
		params: {
			path: {
				id: Number(params.id)
			}
		}
	});
	if (error) {
		throw error;
	}
	return data;
}
