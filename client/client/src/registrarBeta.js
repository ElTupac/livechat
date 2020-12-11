export function RegistroCliente(reg_id, creator_id){
    const URL = `https://localhost:5001/Clientes/RegistroCliente?reg_id=${reg_id}&creator_id=${creator_id}`;
    let childRef = window.open(URL, 'Registro - Registrar', 'width=360,height=640,scrollbars=NO,resizable=NO');
    let parent  = window.location.href;
    const interval = setInterval(() => {
        childRef.postMessage(parent, URL);
        if(childRef.closed) clearInterval(interval);
    }, 500);
    window.addEventListener("message", e => {
        clearInterval(interval);
        localStorage.setItem("LoginInfo", e.data);
        childRef.close();
    });
}

export function LoginCliente(reg_id, creator_id){
    const URL = `https://localhost:5001/Clientes/LoginCliente?reg_id=${reg_id}&creator_id=${creator_id}`;
    let childRef = window.open(URL, 'Login - Registrar', 'width=360,height=640,scrollbars=NO,resizable=NO');
    let parent = window.location.href;
    const interval = setInterval(() => {
        childRef.postMessage(parent, URL);
        if(childRef.closed) clearInterval(interval);
    }, 500);
    window.addEventListener("message", e => {
        clearInterval(interval);
        localStorage.setItem("LoginInfo", e.data);
        childRef.close();
    }, false);
}

let creds = {
    user: "",
    token: ""
};
function setCreds({user, token}) { creds = {user, token}; }
export function getCreds() {return creds;}
export function checkCreds() {
    let creds = localStorage.getItem("LoginInfo");
    if(creds){
        creds = JSON.parse(creds);
        setCreds(creds);
        return getCreds();
    }else{
        return null;
    }
}