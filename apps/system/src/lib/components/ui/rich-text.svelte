<script lang="ts">
	import { Editor } from '@tiptap/core';
	import HardBreak from '@tiptap/extension-hard-break';
	import Link from '@tiptap/extension-link';
	import Underline from '@tiptap/extension-underline';
	import StarterKit from '@tiptap/starter-kit';
	import {
		Bold,
		Heading,
		Italic,
		Link as LinkIcon,
		List,
		Underline as UnderlineIcon
	} from 'lucide-svelte';
	import { onDestroy, onMount } from 'svelte';

	export let value = '';
	export let onChange = (content: string) => {};

	let element: HTMLDivElement | null = null;
	let editor: Editor | null = null;

	onMount(() => {
		if (element) {
			editor = new Editor({
				element: element,
				extensions: [
					StarterKit.configure({
						hardBreak: {
							keepMarks: true
						}
					}),
					Underline,
					Link.configure({
						openOnClick: true
					})
				],
				content: value,
				editorProps: {
					attributes: {
						class: 'prose prose-sm focus:outline-none min-h-[300px] leading-normal p-2'
					}
				},
				onTransaction: () => {
					editor = editor;
				},
				onUpdate({ editor }) {
					const content = editor.getHTML();
					onChange(content);
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
	<div class="mb-2 flex gap-2 rounded-lg border px-2 py-1">
		<button
			type="button"
			on:click={() => editor?.chain().focus().toggleHeading({ level: 4 }).run()}
			class="rounded bg-gray-200 px-2 py-1 text-sm text-gray-800 transition-colors duration-300 hover:bg-gray-300"
			class:active={editor.isActive('heading', { level: 4 })}
		>
			<Heading class="size-4" />
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
				if (url) editor?.chain().focus().setLink({ href: url, target: '_blank' }).run();
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
	class="h-[300px] overflow-y-scroll rounded-lg border border-gray-300 bg-[#f9fafb] p-2"
></div>
