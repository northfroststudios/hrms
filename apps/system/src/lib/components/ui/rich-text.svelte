<script lang="ts">
	import { onMount, onDestroy } from 'svelte';
	import { Editor } from '@tiptap/core';
	import StarterKit from '@tiptap/starter-kit';
	import Underline from '@tiptap/extension-underline';
	import Link from '@tiptap/extension-link';
	import HardBreak from '@tiptap/extension-hard-break';
	import {
		Bold,
		Italic,
		Underline as UnderlineIcon,
		List,
		Link as LinkIcon,
		Heading1,
		Heading2,
		Heading3
	} from 'lucide-svelte';

	let element: HTMLDivElement | null = null;
	let editor: Editor | null = null;

	onMount(() => {
		if (element) {
			editor = new Editor({
				element: element,
				extensions: [
					StarterKit,
					HardBreak.configure({
						HTMLAttributes: {
							class: 'break-line'
						}
					}),
					Underline,
					Link.configure({
						openOnClick: true
					})
				],
				content: '',
				editorProps: {
					attributes: {
						class: 'prose prose-sm sm:prose lg:prose-lg focus:outline-none'
					}
				},
				onTransaction: () => {
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
	<div class="mb-2 flex gap-2">
		<button
			type="button"
			on:click={() => editor?.chain().focus().toggleHeading({ level: 1 }).run()}
			class="rounded bg-gray-200 px-2 py-1 text-sm text-gray-800 transition-colors duration-300 hover:bg-gray-300"
			class:active={editor.isActive('heading', { level: 1 })}
		>
			<Heading1 class="size-4" />
		</button>
		<button
			type="button"
			on:click={() => editor?.chain().focus().toggleHeading({ level: 2 }).run()}
			class="rounded bg-gray-200 px-2 py-1 text-sm text-gray-800 transition-colors duration-300 hover:bg-gray-300"
			class:active={editor.isActive('heading', { level: 2 })}
		>
			<Heading2 class="size-4" />
		</button>
		<button
			type="button"
			on:click={() => editor?.chain().focus().toggleHeading({ level: 2 }).run()}
			class="rounded bg-gray-200 px-2 py-1 text-sm text-gray-800 transition-colors duration-300 hover:bg-gray-300"
			class:active={editor.isActive('heading', { level: 3 })}
		>
			<Heading3 class="size-4" />
		</button>
		<button
			type="button"
			on:click={() => editor?.chain().focus().toggleBold().run()}
			class="rounded bg-gray-200 px-2 py-1 text-sm text-gray-800 transition-colors duration-300 hover:bg-gray-300"
			class:active={editor.isActive('bold')}
		>
			<Bold class="size-4" />
		</button>
		<button
			type="button"
			on:click={() => editor?.chain().focus().toggleItalic().run()}
			class="rounded bg-gray-200 px-2 py-1 text-sm text-gray-800 transition-colors duration-300 hover:bg-gray-300"
			class:active={editor.isActive('italic')}
		>
			<Italic class="size-4" />
		</button>
		<button
			type="button"
			on:click={() => editor?.chain().focus().toggleUnderline().run()}
			class="rounded bg-gray-200 px-2 py-1 text-sm text-gray-800 transition-colors duration-300 hover:bg-gray-300"
			class:active={editor.isActive('underline')}
		>
			<UnderlineIcon class="size-4" />
		</button>
		<button
			type="button"
			on:click={() => editor?.chain().focus().toggleBulletList().run()}
			class="rounded bg-gray-200 px-2 py-1 text-sm text-gray-800 transition-colors duration-300 hover:bg-gray-300"
			class:active={editor.isActive('bulletList')}
		>
			<List class="size-4" />
		</button>
		<button
			type="button"
			on:click={() => {
				const url = prompt('Enter the URL:');
				if (url) editor?.chain().focus().setLink({ href: url }).run();
			}}
			class="rounded bg-gray-200 px-2 py-1 text-sm text-gray-800 transition-colors duration-300 hover:bg-gray-300"
			class:active={editor.isActive('link')}
		>
			<LinkIcon class="size-4" />
		</button>
	</div>
{/if}

<div
	bind:this={element}
	class="min-h-[250px] rounded-lg border border-gray-300 bg-[#f9fafb] p-2"
></div>
