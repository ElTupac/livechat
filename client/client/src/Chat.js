import {Component} from "react";
import Message from "./Message";

class Chat extends Component{
    constructor(props){
        super(props);

    }

    render(){
        return(

            <div>
                <h2>Un chat :v</h2>
                <Message/>
            </div>
            
        )
    }
}

export default Chat;