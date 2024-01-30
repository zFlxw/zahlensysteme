import { writable } from "svelte/store";

export const rangeFrom = writable(1);
export const rangeTo = writable(200);
export const automaticContinue = writable(true);