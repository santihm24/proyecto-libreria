
const express = require('express');

const app = express();
const cors = require('cors');
const bodyParse = require('body-parser');

app.use(bodyParse.urlencoded({extended: true}));
app.use(express.json());
app.use(bodyParse.json());
app.use(cors());

app.get('/', (req, res) =>{
    res.send("Saludando desde el backend")
 

 });

 const user = require("./controller/useController");
 app.use("/registro-usuario",user.register);
 //app.use("/login",user.login);

 const PORT = 3001

app.listen(PORT, ()=>{
console.log("Servidor corriendo en el puerto ", PORT)
 })