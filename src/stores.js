import { writable } from 'svelte/store';

export const apiUrl = writable("http://localhost:8080/api");
export const productViewsPerSecond = writable(0);
export const ordersPerSecond = writable(0);
export const itemsPerOrder = writable(2);
export const timeoutMillis = writable(1000);
