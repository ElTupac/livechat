const express = require("express");
const cors = require("cors");
const socket = require("websocket").server;

const PORT = process.env.PORT || 4000;
const routes = require("./routes");

let app = express();
app.use(cors());
app.use(express.json());
app.use("/", routes);

let wss;
let conexionesActivas = [];

try{
    wss = new socket({
        httpServer: app.listen(PORT, () => {
            console.log(`Server en ${PORT}`);
        })
    });    
}catch (error){
    console.log(`Fallo en ${PORT}`, error);
}

wss.on('request', req => {
    const connection = req.accept(null, req.origin);
    const {name} = req.resourceURL.query;
    if(name) {
        conexionesActivas.push({
            name: name,
            conn: connection
        });
        console.log(`${name} conectado`);
    }
    

    connection.on('close', (reason, desc) => {
        const index = conexionesActivas.indexOf(u => u.name == name);
        conexionesActivas.splice(index, 1);
        console.log(`${name} desconectado`);

        if(!conexionesActivas.length) console.log("No hay usuarios");
    });

    connection.on('message', message => {
        //from, to, msg
        const {from, to, mess} = JSON.parse(message.utf8Data);
        for(let i in conexionesActivas){
            const name = to;
            if(conexionesActivas[i].name == name) conexionesActivas[i].conn.send(message.utf8Data); 
        }
    });
});