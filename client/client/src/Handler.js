import {Component} from "react";
import Chat from "./Chat";

class Handler extends Component{
    constructor(props){
        super(props);
        this.state = {
            socket: undefined,
            chats: []
        }
    }

    enviarMensaje(dest, text){
        const {name, id} = this.props.creds;
        const msg = {
            from: `${name}#${id}`,
            to: dest,
            mess: text
        }

        this.state.socket.send(JSON.stringify(msg));
    }

    componentDidMount(){
        const {name, id} = this.props.creds;
        if(name && id){
            let socket = new WebSocket(`ws://186.13.4.194:4000/?id=${id}&name=${name}`);
            socket.onopen = e => {
                console.log("Conectado");
                this.setState({socket: socket});
                document.getElementById("enviar-btn").addEventListener('click', e => {
                    const destinatario = document.getElementById("para").value;
                    const texto = document.getElementById("texto").value;
                    this.enviarMensaje(destinatario, texto);
                });
            }
            socket.onmessage = e => {
              console.log(e.data);
            }

        }
    }

    render(){
        return(
            <div>
                <input type="text" id="para" placeholder="Destinatario"/>
                <br/>
                <textarea id="texto" cols="30" rows="5" placeholder="Mensaje"></textarea>
                <br/>
                <button id="enviar-btn">Enviar</button>
            </div>
        )
    }
}

export default Handler;