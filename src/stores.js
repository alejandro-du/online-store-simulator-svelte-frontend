import { writable } from 'svelte/store';

export const apiUrl = writable("http://localhost:8080/api");
export const productVisitsPerMinute = writable(300);
export const ordersPerMinute = writable(3);
export const itemsPerOrder = writable(3);
export const timeoutMillis = writable(5000);
