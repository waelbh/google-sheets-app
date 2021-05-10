import React, { useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
type notif = {
    display: boolean;
    text: string;
};
interface Prop {
    notificationStatus: notif;
}
const Notification: React.FC<Prop> = (props) => {
    const { notificationStatus } = props;
    useEffect(() => {
        notificationStatus.display && toast(notificationStatus.text);
    }, [notificationStatus]);
    return (
        <ToastContainer
            position="top-right"
            autoClose={3000}
            hideProgressBar
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            bodyStyle={{
                color: 'black',
                fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif",
                fontSize: '16px',
                lineHeight: '1.6',
            }}
        ></ToastContainer>
    );
};

export default Notification;
