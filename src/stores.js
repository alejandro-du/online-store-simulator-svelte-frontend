import { writable } from 'svelte/store';

export const apiUrl = writable("http://localhost:8080/api");
export const intervalInSeconds = writable(5);
export const productViewsPerInterval = writable(0);
export const ordersPerInterval = writable(0);
export const itemsPerOrder = writable(2);
export const timeoutMillis = writable(1000);
