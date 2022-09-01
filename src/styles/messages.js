export default function messageIdentifier() {
    const messages = document.querySelectorAll('.messagesArea>li');
    messages.forEach(msg => {
        if (msg.dataset.ismine === 'true') {
            msg.style.alignSelf = 'flex-end';
            msg.classList.add('myColor');
        }
        else {
            msg.style.alignSelf = 'flex-start';
            msg.classList.add('collocColor');
        }
    })
}