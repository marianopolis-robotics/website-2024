import {writable} from "svelte/store";
import {browser} from "$app/environment";

// Initial Store values
const user = { 
                name: "",
                superPower: "", 
                hobbies: "",
                submittedName: false, 
                submittedCostume: false, 
                submittedAttributes: false,
                hat: "whiteHat", 
                hatIndex: 0, 
                accessory: "caliper", 
                accessoryIndex: 0, 
                shape: "red", 
                shapeIndex: 0, 
                level: 1,
                highscore: 0,
            };

// Retrieve stored object from local storage
const storedUserData = browser && localStorage.getItem("userData");

export const userStore = writable(storedUserData ? JSON.parse(storedUserData) : user);

// Subscribe to changes in the store and update local storage 
userStore.subscribe((val) => browser && localStorage.setItem("userData", JSON.stringify(val)));
