import { createContext, useReducer } from "react";

export const NotificationContext = createContext({
    requestState: null, // pending, success or error
    title: '',
    message: '',
    showNotification: () => {},
    clearNotification: () => {},
})

const INITIAL_NOTIFICATION_STATE_OBJECT = {
    requestState: null,
    title: '',
    message: '',
}

const notificationReducer = (state, action) => {
    switch(action.type) {
        case 'show-notification':
            return {
                ...action.payload
            }
        case 'clear-notification':
            return {
                requestState: null,
                title: '',
                message: '',
            }
        default:
            return state
    }
}

export default function NotificationContextProvider({ children }) {
    const [notificationState, notificationDispatch] = useReducer(notificationReducer, INITIAL_NOTIFICATION_STATE_OBJECT);

    const showNotification = (requestState, title, message) => {
        notificationDispatch({
            type: 'show-notification', 
            payload: {
                requestState, 
                title,
                message,
            }
        });

        // pending state will always switch to 'success' or 'error' so don't set timeout for it 
        if(requestState === 'pending') return;
        setTimeout(() => {
            clearNotification();
        }, 3000);
    };

    const clearNotification = () => {
        notificationDispatch({type: 'clear-notification'})
    }

    const notificationCtxValue = {
        requestState: notificationState.requestState,
        message: notificationState.message,
        title: notificationState.title,
        showNotification,
        clearNotification,
    }


    // console.log(notificationState)
    return <NotificationContext value={notificationCtxValue}>
        {children}
    </NotificationContext>
}