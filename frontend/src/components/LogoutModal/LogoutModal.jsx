import { useContext } from "react";
import { NotificationContext } from "../../store/notification-context";
import { clearStorage } from "../../utils/authUtils";

export default function LogoutModal({ ref, setIsLoggedIn }){
    const { showNotification } = useContext(NotificationContext);

    const modalLogoutHandler = () => {
        clearStorage();
        setIsLoggedIn(false);
        showNotification('success', 'Success:', 'you have been logged out')
    }

    return <dialog ref={ref} className="logoutModalContainer" >
        <div className="message">
            <h3>Session Expired</h3>
            <p>Please logout</p>
        </div>
        <form method="dialog">
            <button className="logout" onClick={modalLogoutHandler}>Logout</button>
        </form>
    </dialog>
}