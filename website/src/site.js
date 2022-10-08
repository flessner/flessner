import { browser } from "$app/env";
import { writable } from 'svelte/store';

let storedDarkMode = false
if (browser) {
  storedDarkMode = (localStorage.getItem("darkMode") == "true");
}
export const darkMode = writable(storedDarkMode);
