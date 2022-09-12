import { useDispatch, useSelector } from "react-redux"
import { NavLink, Outlet, useNavigate } from "react-router-dom"
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

    if (user)
        return (
            <div>
                <h1>Home Page</h1>
                <NavLink to='/contacts' className='noMargin'><button type="button">My contacts</button></NavLink>
                <Outlet />
                <button type="button" onClick={handleLogout}>Logout</button>
            </div>
        )
    else
        return (
            <div>
                <h1>Hello!</h1>
                <div>
                    <NavLink className="noMargin" to='/login'><button className="noMargin" type="button">Sign In</button></NavLink>
                    <NavLink to='/register'><button className="noMargin" type="button">Sign Up</button></NavLink>
                </div>
            </div>

        )
}