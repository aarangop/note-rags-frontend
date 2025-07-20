import { getContext, setContext } from 'svelte';

class NoteState {
	fileName = $state('Untitled Note');
	content = $state('');
}

const NOTE_CONTEXT = Symbol('note');

export function setNoteContext(initialFileName?: string, initialContent?: string) {
	const state = new NoteState();

	if (initialFileName !== undefined) {
		state.fileName = initialFileName;
	}
	if (initialContent !== undefined) {
		state.content = initialContent;
	}
	setContext(NOTE_CONTEXT, state);
	return state;
}

export function getNoteContext() {
	const context = getContext<NoteState>(NOTE_CONTEXT);

	if (!context) {
		throw new Error(
			'getNoteContext must be called within a component that has setNoteContext in its tree'
		);
	}

	return context;
}
