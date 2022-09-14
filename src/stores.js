import { writable } from 'svelte/store';

export const apiUrl = writable("http://localhost:8080/api");
export const viewsPerMinute = writable(0);
export const ordersPerMinute = writable(0);
export const itemsPerOrder = writable(2);
export const timeoutMillis = writable(200);
