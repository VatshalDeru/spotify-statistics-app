import { useRef } from "react";


export default function LogoutModal(){
    useRef();
    
    return <dialog className="logoutModaContainer">
        <div className="">Session Expired</div>
        <p>Please logout</p>
        <button>Logout</button>
    </dialog>
}