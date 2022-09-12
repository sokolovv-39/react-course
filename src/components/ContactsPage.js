import { useEffect, useState } from "react";
import { db } from "../services/firebase";
import React from "react";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import EditContact from "./EditContact";
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const initialState = {
    name: null,
    email: null,
    contact: null,
    additionalInfo: null
}

export default function ContactsPage() {
    const navigate = useNavigate();
    const [showAdd, setShowAdd] = useState(false);
    const [showEdit, setShowEdit] = useState(false);
    const [state, setState] = useState(initialState);
    const { name, email, contact } = state;
    const [myContacts, setMyContacts] = useState({});
    const [editId, setEditId] = useState();
    const user = useSelector(state => state.currentUser);
    const [showInfo, setShowInfo] = useState(false);
    const [aboutInfo, setAboutInfo] = useState({
        name: null,
        email: null,
        contact: null,
        additionalInfo: null
    });
    let contactNum = 0;

    function handleSubmit(e) {
        e.preventDefault();
        if (!name || !email || !contact) {
            alert('Введите всю необходимую информацию')
        } else {
            db.child(`contacts/${user.displayName}`).push(state, (e) => {
                if (e) {
                    alert('Произошла ошибка');
                }
                if (!e) {
                    alert('Контакт успешно сохранен');
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
    function handleDeleteContact(id) {
        db.child(`contacts/${user.displayName}/${id}`).remove(e => {
            if (!e) alert('Контакт успешно удален')
            else alert('Произошла ошибка')
        })
    };
    function handleEditContact(id) {
        setShowEdit(!showEdit);
        setEditId(id);
    }
    function handleShowInfo(id) {
        setShowInfo(true);
        db.child(`contacts/${user.displayName}/${id}`).on('value', snap => {
            setAboutInfo({ ...snap.val() })
        })
    }

    const AddContact = (
        <form onSubmit={handleSubmit}>
            <label htmlFor="name">Name</label>
            <input onChange={handleChange} id="name" name="name"></input>
            <label htmlFor="email">Email</label>
            <input onChange={handleChange} id="email" name="email"></input>
            <label htmlFor="contact">Contact</label>
            <input onChange={handleChange} id="contact" name="contact"></input>
            <label htmlFor="additionalInfo">Additional Info</label>
            <input onChange={handleChange} id="additionalInfo" name="additionalInfo"></input>
            <button>Добавить контакт</button>
        </form>
    );
    const AboutContact = (
        <div>
            <h2>{aboutInfo.name}</h2>
            <h4>Name: <span className="aboutContactSpan">{aboutInfo.contact}</span></h4>
            <h4>Email: <span className="aboutContactSpan">{aboutInfo.email}</span></h4>
            <h4>Additional info: <span className="aboutContactSpan">{aboutInfo.additionalInfo}</span></h4>
        </div>
    )

    useEffect(() => {
        if (user) {
            db.child(`contacts/${user.displayName}`).on('value', snap => {
                if (snap.val() !== null) {
                    setMyContacts({ ...snap.val() });
                } else
                    setMyContacts({})
            })
            console.log(aboutInfo)
        }
        else navigate('/');
        return () => {
            setMyContacts({})
        }
    }, [user, navigate, aboutInfo]);

    return (
        <div>
            <div>
                <h2>My contacts</h2>
                <table>
                    <thead>
                        <tr>
                            <th>№</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Contact</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {Object.keys(myContacts).map(id => {
                            contactNum++;
                            return (
                                <tr key={id}>
                                    <td>{contactNum}</td>
                                    <td>{myContacts[id].name}</td>
                                    <td>{myContacts[id].email}</td>
                                    <td>{myContacts[id].contact}</td>
                                    <td>
                                        <RemoveRedEyeIcon onClick={handleShowInfo.bind(this, id)} style={{ cursor: 'pointer' }} />
                                        <EditIcon style={{ cursor: 'pointer' }} onClick={handleEditContact.bind(this, id)} />
                                        <DeleteIcon onClick={handleDeleteContact.bind(this, id)} style={{ cursor: 'pointer' }} />
                                    </td>
                                </tr>
                            )
                        }
                        )}
                    </tbody>
                </table>
            </div>
            <button type="button" onClick={() => setShowAdd(!showAdd)}>{showAdd ? 'Отмена' : 'Добавить контакт'}</button>
            {showAdd && AddContact}
            {showEdit && <EditContact id={editId} />}
            {showInfo && AboutContact}
            <Outlet />
            <NavLink to="/">Go home</NavLink>
        </div>
    )
}