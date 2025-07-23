import notesClient from '$lib/api/notes/client';

export async function load() {
	const { data, error } = await notesClient.GET('/notes/', {
		params: {
			query: {
				size: 10
			}
		}
	});
	if (error) {
		throw error;
	}
	return data;
}
