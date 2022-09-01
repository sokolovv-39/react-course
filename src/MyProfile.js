import { NavLink } from "react-router-dom";

export default function MyProfile() {
    return (
        <div>
            <h2>My Profile</h2>
            <NavLink to='/'>Back to chats</NavLink>
        </div>
    )
}