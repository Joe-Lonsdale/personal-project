import { writable } from 'svelte/store';

export let numbers = writable([]);
export let target = writable(0);
export let guesses = writable([]);
