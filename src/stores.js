import { writable } from 'svelte/store';

export const apiUrl = writable("http://localhost:8080/api");
export const productVisitsPerMinute = writable(60);
export const ordersPerMinute = writable(1);
export const itemsPerOrder = writable(5);
export const timeoutMillis = writable(1000);
