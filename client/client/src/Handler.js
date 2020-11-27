import {Component} from "react";
import Chat from "./Chat";
import "./Handler.css";

class Handler extends Component{
    constructor(props){
        super(props);
        this.state = {
            socket: undefined,
            chats: []
        }

        this.enviarMensaje = this.enviarMensaje.bind(this);
    }

    //chats:[
    //  {
    //      chatOf: "nombre#id"
    //      chat:[
    //      {
    //        from: "nombre#id" de quien manda,
    //          to: "nombre#id" de quien recibe,
    //        mess: "cuerpo del mensaje" 
    //      }, {...}
    //      ]
    //  },{...}
    //]

    enviarMensaje(dest, text){
        const {name, id} = this.props.creds;
        const msg = {
            from: `${name}#${id}`,
            to: dest,
            mess: text
        }

        this.state.socket.send(JSON.stringify(msg));
        this.addMessage(JSON.stringify(msg), true);
    }

    componentDidMount(){
        const {name, id} = this.props.creds;
        if(name && id){
            let socket = new WebSocket(`wss://livechat-tupac.herokuapp.com/?id=${id}&name=${name}`);
            socket.onopen = e => {
                console.log("Conectado");
                this.setState({socket: socket});
                document.getElementById("enviar-btn").addEventListener('click', e => {
                    const destinatario = document.getElementById("para").value;
                    const texto = document.getElementById("texto").value;

                    if(destinatario && texto) this.enviarMensaje(destinatario, texto);
                });
            }
            socket.onmessage = e => {   //e.data mensaje
                this.addMessage(e.data, false);
            }

        }
    }

    addMessage(msg, me){
        let {from, to, mess} = JSON.parse(msg);
        let allChats = this.state.chats;
        let index;
        for(let i in allChats) if(allChats[i].chatOf == from || allChats[i].chatOf == to){
            index = i;
            break;
        }
        

        if(index){
            allChats[index].chat.push({from, to, mess});
        }else{
            
            allChats.push({
                chatOf: me ? to : from,
                chat: [
                    {
                        from,
                        to,
                        mess
                    }
                ]
            });
        }

        this.setState({chats: allChats});
    }

    render(){
        const chats = this.state.chats;
        let elements = chats.map(c => {
            return(
                <Chat info={c} key={c.chatOf} enviarMsg={this.enviarMensaje} />
            );
        })


        return(
            <div>
                <input type="text" id="para" placeholder="Destinatario"/>
                <br/>
                <textarea id="texto" cols="30" rows="5" placeholder="Mensaje"></textarea>
                <br/>
                <button id="enviar-btn">Enviar</button>
                <br/>
                <div className="chats-container">
                    {elements}
                </div>
            </div>
        )
    }
}

export default Handler;