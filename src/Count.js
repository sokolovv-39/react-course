import { useSelector } from "react-redux";
import { useDispatch } from "react-redux/es/exports";

export default function Count() {
    const count = useSelector(state => state);
    const dispatch = useDispatch();

    return (
        <div>
            <button onClick={() => dispatch({ type: 'minus' })}>-</button>
            {count.count}
            <button onClick={() => dispatch({ type: 'plus' })} >+</button>
        </div >
    )
}