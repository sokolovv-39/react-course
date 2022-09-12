import { useSelector } from "react-redux";
import { db } from "../services/firebase";

export default function EditContact({ id }) {
    const user = useSelector(state => state.currentUser);
    function handleSubmit(e) {
        e.preventDefault();
        const form = new FormData(e.target);
        const editedContact = {
            name: form.get('name'),
            email: form.get('email'),
            contact: form.get('contact'),
            additionalInfo: form.get('additionalInfo')
        };
        db.child(`contacts/${user.displayName}/${id}`).set(editedContact, (e) => {
            if (!e) alert('Сохранено')
            else alert('Произошла ошибка');
        });
    }

    return (
        <div>
            <h2>Editing contact</h2>
            <form onSubmit={handleSubmit}>
                <label htmlFor="name">Name</label>
                <input id="name" name="name"></input>
                <label htmlFor="email">Email</label>
                <input id="email" name="email"></input>
                <label htmlFor="contact">Contact</label>
                <input id="contact" name="contact"></input>
                <label htmlFor="additionalInfo">Additional Info</label>
                <input id="additionalInfo" name="additionalInfo"></input>
                <button>Сохранить изменения</button>
            </form>
        </div>
    )
}