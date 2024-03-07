import { writable } from "svelte/store";
import { browser } from "$app/environment";

// Initial Store values
const user = { 
                name: "",
                superPower: "", 
                hobbies: "",
                funFact: "",
                submittedName: false, 
                submittedCostume: false, 
                submittedAttributes: false,
                hat: "construction-hat", 
                hatIndex: 0, 
                accessory: "caliper", 
                accessoryIndex: 0, 
                shape: "red", 
                shapeIndex: 0, 
                level: 1,
                archivesPg: 0,
                highscore: 0,
            };

// Retrieve stored object from local storage
const storedUserData = browser && localStorage.getItem("angryneerData");

export const userStore = writable(storedUserData ? JSON.parse(storedUserData) : user);

// Subscribe to changes in the store and update local storage 
userStore.subscribe((val) => browser && localStorage.setItem("angryneerData", JSON.stringify(val)));
