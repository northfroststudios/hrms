<script lang="ts">
	import { onMount, onDestroy } from 'svelte';
	import { Editor } from '@tiptap/core';
	import StarterKit from '@tiptap/starter-kit';

	let element: HTMLDivElement | null = null; // Use null to ensure correct typing
	let editor: Editor | null = null; // Initialize editor as null

	onMount(() => {
		if (element) {
			editor = new Editor({
				element: element,
				extensions: [StarterKit],
				content: '',
				onTransaction: () => {
					// force re-render so `editor.isActive` works as expected
					editor = editor;
				}
			});
		}
	});

	onDestroy(() => {
		if (editor) {
			editor.destroy();
		}
	});
</script>

{#if editor}
	<div class="flex gap-2 mb-2">
		<button
			type="button"
			on:click={() => editor?.chain().focus().toggleHeading({ level: 1 }).run()}
			class="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300 transition-colors duration-300"
			class:active={editor.isActive('heading', { level: 1 })}
		>
			H1
		</button>
		<button
			type="button"
			on:click={() => editor?.chain().focus().toggleHeading({ level: 2 }).run()}
			class="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300 transition-colors duration-300"
			class:active={editor.isActive('heading', { level: 2 })}
		>
			H2
		</button>
		<button
			type="button"
			on:click={() => editor?.chain().focus().setParagraph().run()}
			class="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300 transition-colors duration-300"
			class:active={editor.isActive('paragraph')}
		>
			P
		</button>
	</div>
{/if}

<div bind:this={element} class="border border-gray-300 rounded p-2 min-h-[150px]"></div>
