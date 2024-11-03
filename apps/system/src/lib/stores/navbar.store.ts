import { writable } from "svelte/store"


interface NavbarStore {
    isOpen:boolean
}

const navbarStore = writable<NavbarStore>({isOpen:false})