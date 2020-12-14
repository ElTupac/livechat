import {Component} from "react";
import {RegistroCliente, LoginCliente, checkCreds} from "./registrarBeta";
import "./Login.css";

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
                    else this.props.creds(res.creds.name);
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
            <div className="login-container">
                <h1>Tupac Livechat</h1>
                <div className="btn-container">
                    <button onClick={() => {LoginCliente(1, 1)}} className="login">Loguear</button>
                    <button onClick={() => {RegistroCliente(1, 1)}} className="register">Registrarse</button>
                </div>
            </div>
        );
    }
}

export default Login;