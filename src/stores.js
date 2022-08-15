import { writable } from 'svelte/store';

export const apiUrl = writable("http://localhost:8080/api");
export const visitorsPerSecond = writable(0);
export const conversionRate = writable(0.02);
export const productViewsPerVisitor = writable(10);
export const maxWaitingTimeMillis = writable(2000);
export const itemsPerOrder = writable(2);
export const maxBudgetPerVisitor = writable(3000);
