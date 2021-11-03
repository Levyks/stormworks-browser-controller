import { writable, Writable } from "svelte/store";
import type { Socket } from "socket.io-client";

export const socket: Writable<Socket> = writable();