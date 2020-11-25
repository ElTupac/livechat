import {Component} from "react";
import Message from "./Message";
import "./Chat.css";

class Chat extends Component{
    constructor(props){
        super(props);

    }

    componentDidMount(){
        const textArea = document.getElementById(`${this.props.info.chatOf}-textarea`);
        textArea.addEventListener('keydown', e => {
            if(e.key == "Enter"){
                e.preventDefault();
                if(textArea.value != '') {
                    this.props.enviarMsg(this.props.info.chatOf, textArea.value);
                    textArea.value = '';
                }
            }
        });
    }

    render(){
        const mensajes = this.props.info.chat;
        const chatDe = this.props.info.chatOf;
        let elementos = mensajes.map((m, i) => {
            return(
                <Message info={m} chatOf={chatDe} key={`${chatDe}-${i}`} />
            );
        });
        
        return(

            <section className="chat-section" >
                <h2 className="title">{chatDe}</h2>
                {elementos}
                <br/>
                <textarea id={`${chatDe}-textarea`} rows="3" className="chat-textarea"></textarea>
            </section>
        );
    }
}

export default Chat;