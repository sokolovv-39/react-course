export default function sendMsgButtonStyle() {
    const input = document.querySelector('.inputArea');
    const button = document.querySelector('.sendMsgButton');
    const buttonHeight = input.offsetHeight;
    button.style.height = `${buttonHeight - 4}px`;
    button.style.width = `${buttonHeight - 4}px`;
    button.style.left = `${input.offsetLeft + input.offsetWidth - buttonHeight}px`;
    button.style.top = `${input.offsetTop + 2}px`
}