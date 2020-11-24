window.onload = () => {
    let socket = new WebSocket('ws://186.13.4.194:4000/?perro=jorge');

    socket.onopen = e => {
        console.log("conexion exitosa");
    };
    socket.onmessage = e => {
        console.log(e.data);
    };

    const inputText = document.getElementById("input");
    document.getElementById("boton").addEventListener('click', e => {
        socket.send(inputText.value);
    });
}