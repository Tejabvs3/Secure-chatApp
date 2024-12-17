import { io } from "socket.io-client";
import React from "react";
const SOCKET_URL = process.env.REACT_APP_URL_BACKEND;
export const socket = io(SOCKET_URL);
// app context
export const AppContext = React.createContext();