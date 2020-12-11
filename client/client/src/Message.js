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
        const timeNow = new Date();
        
        return(
            <div className={`message-container ${from}`}>
                <p>{info.mess}</p>
                <p className="time">{timeNow.getHours()}:{timeNow.getMinutes()}</p>
            </div>
        )
    }
}

export default Message;