import { io } from "socket.io-client";
import { store } from "..";
import { createAction } from "./actions/actions";
import { SET_NOTIFICATION_INFO } from "./actions/actionType";

const socketUrl = 'https://dev.mapllo.com/';
const token = localStorage.getItem('accessToken');


class ClientSocket {
    
    constructor(){
        this.socket = null;
    }

    connectSocket(){
        this.socket = io.connect(socketUrl, {
            reconnection: true,
            reconnectionDelay: 500,
            reconnectionAttempts: 10,
            query: { token },
        });
    }

    getSocketData(){
        this.socket.on('admin.notification', (msg) => {
            store.dispatch(createAction(SET_NOTIFICATION_INFO, msg));
        });
    }

    emitSocket(message){
        this.socket.emit('message', message);
    }

    disConnectSoccket(){
        this.socket.disconnect();
    }

}

export const clientSocket = new ClientSocket();

