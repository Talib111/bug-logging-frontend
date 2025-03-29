// src/SocketContext.tsx
import React, { createContext, useContext, useEffect } from 'react';
import { io } from 'socket.io-client';

const SocketContext = createContext(null);

export const SocketProvider = ({ children }:any) => {
    const socket:any = io('http://localhost:8008'); 
    useEffect(() => {
        socket.on('connect', () => {
            console.log('Connected to Socket.io server');
        });

        return () => {
            socket.disconnect();
        };
    }, [socket]);

    return (
        <SocketContext.Provider value={socket}>
            {children}
        </SocketContext.Provider>
    );
};

export const useSocket = () => {
    return useContext(SocketContext);
};
