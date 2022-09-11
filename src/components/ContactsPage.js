import { useState } from "react";
import { db } from "../services/firebase";
import React from "react";

const initialState = {
    name: null,
    email: null,
    contact: null
}

export default function ContactsPage() {
    const [showAdd, setShowAdd] = useState(false);
    const [state, setState] = useState(initialState);
    const { name, email, contact } = state;

    function handleSubmit(e) {
        e.preventDefault();
        if (!name || !email || !contact) {
            alert('Введите всю необходимую информацию')
        } else {
            db.child('contacts').push(state, (e) => {
                if (e) {
                    alert('Произошла ошибка');
                }
            })
        }
    };
    function handleChange(e) {
        const { name, value } = e.target;
        setState({
            ...state,
            [name]: value
        });
    };

    const Addcontact = <p>react</p>
    /*  <form onSubmit={() => handleSubmit()}>
         <label htmlFor="name">Name</label>
         <input onChange={() => handleChange()} id="name" name="name"></input>
         <label htmlFor="email">Email</label>
         <input onChange={() => handleChange()} id="email" name="email"></input>
         <label htmlFor="contact">Contact</label>
         <input onChange={() => handleChange()} id="contact" name="contact"></input>
         <button>Добавить контакт</button>
     </form> */

    return (
        <div>
            <button type="button" onClick={() => setShowAdd(!showAdd)}>{showAdd ? 'Отмена' : 'Добавить контакт'}</button>
            {showAdd && <Addcontact />}
        </div>
    )
}