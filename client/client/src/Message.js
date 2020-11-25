import {Component} from "react";
import "./Message.css";

class Message extends Component{
    constructor(props){
        super(props);

    }



    render(){
        const chatDe = this.props.chatOf;
        const info = this.props.info;
        let from;
        if(chatDe == info.from) from = "not-me";
        else from = "me"
        
        return(
            <div>
                <p className={`message ${from}`} >{info.mess}</p>
            </div>
        )
    }
}

export default Message;