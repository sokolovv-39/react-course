import { useSelector, useDispatch } from "react-redux/es/exports";
import { NavLink, Outlet } from "react-router-dom";
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import CommentIcon from '@mui/icons-material/Comment';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import { useState } from "react";
import { getChats } from "./redux/reducers/selectors";
import { useNavigate } from "react-router-dom";
import './styles/App.css';
import { Avatar } from "@mui/material";

export default function App() {
  const [showForm, setShowForm] = useState(false);
  const [showDelIcon, setShowDelIcon] = useState(false);
  const chats = useSelector(getChats);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  function addChat(e) {
    e.preventDefault();
    const form = new FormData(e.target);
    const newChat = {
      id: chats.length ? chats[chats.length - 1].id + 1 : 1,
      name: form.get('name')
    };
    const greetingMsg = {
      id: 1,
      chatID: newChat.id,
      message: 'Hello!',
      mine: false
    };
    dispatch({ type: 'ADD_CHAT', payload: newChat });
    dispatch({ type: 'SEND_MESSAGE', payload: greetingMsg });
  };
  const addChatForm = (
    <form method='post' onSubmit={(e) => addChat(e)}>
      <label htmlFor="name">Введите имя</label>
      <input id="name" name="name" type='text' />
      <button type='button' onClick={() => setShowForm(false)}>Cancel</button>
      <button type="submit">Create chat</button>
    </form>
  );
  function deleteChat(e, id) {
    e.stopPropagation();
    e.preventDefault();
    const newChatList = chats.filter(chat => chat.id !== id);
    dispatch({ type: 'DELETE_CHAT', payload: newChatList });
    navigate('/');
  }

  return (
    <>
      <div className="chatsBox">
        <header>
          <NavLink to='/myprofile'>
            <Avatar />
          </NavLink>
          <h2 className="header">My Chats</h2>
        </header>
        <List sx={{ bgcolor: 'background.paper' }}>
          {chats.map((chat) => (
            <NavLink to={`/${chat.id}`} key={chat.id}>
              <ListItem
                disableGutters
                secondaryAction={
                  <IconButton aria-label="comment">
                    <CommentIcon />
                  </IconButton>
                }
              >
                {showDelIcon &&
                  <IconButton onClick={(e) => deleteChat(e, chat.id)}>
                    <DeleteIcon />
                  </IconButton>}
                <ListItemText primary={`${chat.name}`} />
              </ListItem>
            </NavLink>
          ))}
        </List>
        <button type="button" onClick={() => setShowForm(true)}>Add chat</button>
        <button type="button" onClick={() => setShowDelIcon(!showDelIcon)}>{!showDelIcon ? 'Delete chat' : 'Cancel'}</button>
      </div>
      <Outlet />
      {showForm && addChatForm}
    </>
  )
}