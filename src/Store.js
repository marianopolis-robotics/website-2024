import {writable} from "svelte/store";
import {browser} from "$app/environment";

// Initial Store values
const user = { name: "bird", hat: "hat1", color: "blue", level: 1};

// Retrieve stored object from local storage
const storedUserData = browser && localStorage.getItem("userData");

export const userStore = writable(storedUserData ? JSON.parse(storedUserData) : user);

// Subscribe to changes in the store and update local storage 
userStore.subscribe((val) => browser && localStorage.setItem("userData", JSON.stringify(val)));
