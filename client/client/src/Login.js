import {Component} from "react";

class Login extends Component{
    constructor(props){
        super(props);

    }

    componentDidMount(){
        
        document.getElementById("crear-btn").addEventListener('click', e => {
            const name = document.getElementById("name").value;
            if(name){
                fetch(`http://186.13.4.194:4000/newid/${name}`).then(res => res.json())
                .then(res => {
                    if(res.error) console.log(res.error);
                    else this.props.creds(res.creds.name, res.creds._id);
                });
            }
        });
    }

    render(){
        return(
            <div>
                <input type="text" id="name"/>
                <button id="crear-btn">Crear</button>
            </div>
        );
    }
}

export default Login;