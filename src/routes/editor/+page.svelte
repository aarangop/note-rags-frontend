<script lang="ts">
	import NoteEditor from '$lib/components/editor/NoteEditor.svelte';
</script>

<svelte:head>
	<title>Noted Editor</title>
	<meta name="description" content="Note Editor" />
</svelte:head>

<div class="mx-auto flex h-screen max-w-4xl flex-col px-4 pt-4 pb-4 sm:px-6 lg:px-8">
	<NoteEditor />
</div>
