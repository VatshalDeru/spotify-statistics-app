import { useContext } from "react";
import { NotificationContext } from "../../store/notification-context";

export default function Notification() {
    const { requestState, message, title } = useContext(NotificationContext);

    const classes = `notificationContainer ${requestState ? 'visible ' + requestState : ''}`;

    return <div data-testid="notification-div" className={classes}>
        <h3  className="notificationTitle">{title} </h3>
        <p className="notificationMessage">{message}</p>
    </div>
}