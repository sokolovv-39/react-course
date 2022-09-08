export const getChats = state => state.chats;
export const getMessages = (id, state) => state.messages.filter(msg => id === msg.chatID);
export const getChat = (id, state) => state.chats.find(chat => id === chat.id);
