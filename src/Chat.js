import { useParams } from "react-router-dom";
import { useSelector } from "react-redux/es/hooks/useSelector";
import { useDispatch } from "react-redux/es/hooks/useDispatch";
import { useEffect, useState } from "react";
import { getChat, getMessages } from "./redux/reducers/selectors";
import Avatar from '@mui/material/Avatar';
import TextField from '@mui/material/TextField';
import SendIcon from '@mui/icons-material/Send';
import { useTheme } from "@emotion/react";
import getElem from './styles/sendMsgButtonStyle';
import messageIdentifier from "./styles/messages";

export default function Chat() {
    const theme = useTheme();
    const params = useParams();
    const chat = useSelector(getChat.bind(this, Number(params.chatID)));
    const messages = useSelector(getMessages.bind(this, chat.id));
    const [inputValue, setInputValue] = useState('');
    const dispatch = useDispatch();
    function sendMessage() {
        const newMessage = {
            id: messages[messages.length - 1].id + 1,
            chatID: chat.id,
            message: inputValue,
            mine: true
        };
        dispatch({ type: 'SEND_MESSAGE', payload: newMessage });
        setInputValue('');
    }
    useEffect(() => {
        getElem();
        messageIdentifier();
        setTimeout(answerMessage, 500);
    });
    function answerMessage() {
        const isMine = messages[messages.length - 1].mine;
        if (isMine) {
            const newMessage = {
                id: messages[messages.length - 1].id + 1,
                chatID: chat.id,
                message: 'Okay',
                mine: false
            };
            dispatch({ type: 'SEND_MESSAGE', payload: newMessage });
        }
    }

    return (
        <div className="chatArea">
            <h2><Avatar className="avatar" alt={chat.name} src='./styles/images/empty_avatar.jpg' /> {chat.name}</h2>
            <ul className="messagesArea">
                {messages.map(msg => (
                    <li key={msg.id} data-ismine={msg.mine}>
                        {msg.message}
                    </li>
                ))}
            </ul>
            <div className="inputArea">
                <TextField className='msgInput' sx={{
                    '& .MuiOutlinedInput-root': {
                        borderRadius: '50px'
                    }
                }} variant="outlined" placeholder="Enter a message..." value={inputValue} onChange={(e) => setInputValue(e.target.value)} />
                <SendIcon className="sendMsgButton" type="button" onClick={() => sendMessage()} style={{
                    color: theme.palette.common.white
                }} />
            </div>
        </div>
    )
}