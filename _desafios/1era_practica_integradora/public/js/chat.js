const socket = io()

let chatBox = document.querySelector('#chatBox');
let user;

// guardo el usuario y lo envio al server
Swal.fire({
    title: 'Inicia sesión!',
    text: 'ingresa tu correo electronico',
    input: 'text',
    confirmButtonText: 'Log in',
    allowOutsideClick: false,
    inputValidator: (value) => {
        if (!value) {
            return 'Debe ingresar un correo electronico'
        }
    },
}).then((result) => {
    if (result.value) {
        user = result.value;
        socket.emit('new-user', { user: user, id: socket.id })
    }
});

chatBox.addEventListener('keyup', (e) => {
    if (e.key === 'Enter') {
        if (chatBox.value.trim().length > 0) {
            socket.emit('message', {
                user: user,
                message: chatBox.value
            });
            chatBox.value = '';
        }
    }
});


// cada vez que se origine un evento se ejecuta el siguiente codigo ↓
socket.on('messageLogs', (data) => {
    let log = document.querySelector('#messageLogs');
    let message = '';

    data.forEach((elem) => {
        message += `
        <div class='chat-message'>
            <div class='message-bubble'>

                <div class='message-sender'>${elem.user}</div>
                <p>${elem.message}</p>
            </div>
        </div>
        `;
    });

    log.innerHTML += message;
});

// Notificación de nuevo usuario conectado ↓
socket.on('new-user-connected', (data) => {
    // en esta opción NO USAMOS EL SOCKET.BROADCAST porque... en el siguiente if, hacemos que solo se notifique que se ha conectado un usuario si el ID no se repite
    if (data.id !== socket.id)
        Swal.fire({
            text: `${data.user} se ha conectado al chat`,
            toast: true,
            position: 'top-end'
        })
})

const firstLoad = () => {
    let log = document.querySelector('#messageLogs');

    fetch('/messages')
        .then((result) => {
            return result.json()
        })
        .then((data) => {
            let message = '';

            data.forEach((elem) => {
                message += `
        <div class='chat-message'>
            <div class='message-bubble'>

                <div class='message-sender'>${elem.user}</div>
                <p>${elem.message}</p>
            </div>
        </div>
        `;
            });

            log.innerHTML = message;
        })
}

firstLoad()