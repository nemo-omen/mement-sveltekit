import { writable } from 'svelte/store';

export const editorStore = writable({ content: '' });

export const scrollStore = writable({ position: 0 });
