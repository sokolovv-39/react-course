import { useDispatch, useSelector } from "react-redux"
import { NavLink, useNavigate } from "react-router-dom"
import { logoutInitiate } from "../redux/actions";

export default function HomePage() {
    const user = useSelector(state => state.currentUser);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    function handleLogout() {
        if (user) {
            dispatch(logoutInitiate());
        };
        navigate('login');
    }

    return (
        <div>
            <NavLink to='/login'>Sign in</NavLink>
            <NavLink to='/register'>Sign Up</NavLink>
            <h1>Home Page</h1>
            <button type="button" onClick={handleLogout}>Logout</button>
        </div>
    )
}