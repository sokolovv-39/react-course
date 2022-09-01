const initialChats = [
    {
        id: 1,
        name: 'Maks'
    },
    {
        id: 2,
        name: 'Nastya'
    },
    {
        id: 3,
        name: 'Andrey'
    }
];
const greetingMsg = chat => {
    return ({
        id: 1,
        chatID: chat.id,
        message: `Hello`,
        mine: false
    })
}
const initialMessages = () => {
    const initialMessages = [];
    initialChats.forEach(chat => initialMessages.push(greetingMsg(chat)));
    return initialMessages;
};

export const chatsReducer = (state = initialChats, action) => {
    switch (action.type) {
        case 'ADD_CHAT':
            return ([
                ...state, action.payload
            ]);
        case 'DELETE_CHAT':
            return action.payload;
        default:
            return state;
    }
}

export const messagesReducer = (state = initialMessages(), action) => {
    switch (action.type) {
        case 'SEND_MESSAGE':
            return ([
                ...state, action.payload
            ])
        default:
            return state
    }
}
