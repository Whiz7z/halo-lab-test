import { io } from "socket.io-client";

// "undefined" means the URL will be computed from the `window.location` object
const URL =
  import.meta.env.NODE_ENV === "production"
    ? undefined
    : "wss://cave-drone-server.shtoa.xyz";

export const socket = io(URL, { autoConnect: false });
