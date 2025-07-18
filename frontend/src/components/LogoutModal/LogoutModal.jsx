import { useRef } from "react";

export default function LogoutModal({ ref, modalLogoutHandler }){
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