import {writable} from 'svelte/store'

// a store that contains the current path of the application
export const currentPath = writable('')
