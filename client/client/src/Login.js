import {Component} from "react";
import {RegistroCliente, LoginCliente, checkCreds} from "./registrarBeta";

class Login extends Component{
    constructor(props){
        super(props);

    }

    componentDidMount(){
        const interval = setInterval(() => {
            let creds = checkCreds();
            if(creds){
                fetch(`https://livechat-tupac.herokuapp.com/newid/${creds.user}`).then(res => res.json())
                .then(res => {
                    if(res.error) console.log(res.error);
                    else this.props.creds(res.creds.name, res.creds._id);
                });
                clearInterval(interval);
            }
        }, 500);
        /* document.getElementById("crear-btn").addEventListener('click', e => {
            const name = document.getElementById("name").value;
            if(name){
                fetch(`https://livechat-tupac.herokuapp.com/newid/${name}`).then(res => res.json())
                .then(res => {
                    if(res.error) console.log(res.error);
                    else this.props.creds(res.creds.name, res.creds._id);
                });
            }
        }); */
    }

    render(){
        return(
            <div>
                <button onClick={() => {LoginCliente(3, 1)}} className="login">Loguear</button>
                <br/>
                <button onClick={() => {RegistroCliente(3, 1)}} className="register">Registrarse</button>
            </div>
        );
    }
}

export default Login;