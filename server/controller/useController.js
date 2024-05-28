/*const fs = require('fs').promises;
const path = require('path');

const userFilepath = path.join(__dirname, "../../src/componentes/usuariosRegistrados.json");

const controller = {
    register: async function (req, res) {
        try {
            const userData = await fs.readFile(userFilepath, "utf-8");
            const users = JSON.parse(userData);

            const ultimo = users.length;
            const usuarioNuevo = {
                id: ultimo + 1,
                identificacion: req.body.identificacion,
                nombre: req.body.nombres,
                apellido: req.body.apellidos,
                email: req.body.email,
                direccion: req.body.direccion,
                telefono: req.body.telefono,
                fechaNacimiento: req.body.fechaNacimiento,
                password: req.body.password,
                estado: "activo",
                rol: "Usuario",
                fecha_creacion: new Date(),
            };

            for (x of users) {
                if (x.email === req.body.email || x.identificacion === req.body.identificacion) {
                    res.status(400).send("El email ya existe");
                    return;
                }
            }

            users.push(usuarioNuevo);

            await fs.writeFile(userFilepath, JSON.stringify(users, null, 4));
            res.status(200).send("Usuario Registrado");
        } catch (error) {
            console.error("Error al procesar el registro", error);
            res.status(500).send("Error interno del servidor");
        }
    },




        login: async function (req, res) {
            try {
                const usersData = await fs.readFile(userFilepath, "utf-8");
                const users = JSON.parse(usersData);

                console.log(users[0].email)
                console.log(users[0].password)
                console.log(users[0].rol)

                console.log(req.body.email)
                console.log(req.body.password)
                console.log(req.body.rol)

                for (let index = 0; index < users.length; index++) {
                    if( users[index].email === req.body.email && users[index].password === req.body.password && users[index].rol === req.body.rol) {
                        return res.json({
                            nombre: users[index].nombre,
                            apellido: users[index].apellido,
                            email: users[index].email,
                            

                        })
                    }
                }

/*
                for (x of users) {
                    if (
                        x.email === req.body.email &&
                        x.password === req.body.password &&
                        x.rol === req.body.rol
                    ) {
                        res.status(200).send("0k");
                        return;
                    }
                }
                res.status(400).send("Error");

            } catch (error) {
                console.error("Error al procesar el registro:", error);
                res.status(500).send("Error interno del servidor");
            }
        },
    };

    module.exports = controller;*/

    const express = require("express");
    const app = express();
    const axios = require("axios");
    const cors = require("cors");
    app.use(cors());
    
    const controller = {
        register: function(req, res){
    
            let config = {
                method: "GET",
                maxBodyLength: Infinity,
                url: 'https://api.jsonbin.io/v3/b/66562943acd3cb34a84f2304',
                headers: {
                  'Content-Type': 'application/json',
                  "X-Master-Key": "$2a$10$cTG13zEGs74GNxHDzCQhYueh0LC5TmWftLNzyE9yrTC.xzWULC8sK"
                }
              };
    
              axios(config)
              .then(result => {
                const usuarioNuevo = {
                  id: result.data.record.length + 1,
                  departamento: req.body.departamento,
                  ciudad: req.body.ciudad,
                  identificacion: req.body.identificacion,
                  nombres: req.body.nombres,
                  apellidos: req.body.apellidos,
                  email: req.body.email,
                  direccion: req.body.direccion,
                  telefono: req.body.telefono,
                  fechaNacimiento: req.body.fechaNacimiento,
                  password: req.body.password,
                  estado: 'activo',
                  rol: 'usuario',
                  fecha_Creacion: new Date(),
                };
    
                const existingUser = result.data.record.find(user => user.email === req.body.email);
                if (existingUser) {
                  res.status(400).send("Usuario ya existe en la Base de Datos");
                  return;
                }
    
                result.data.record.push(usuarioNuevo);
    
                axios.put("https://api.jsonbin.io/v3/b/66562943acd3cb34a84f2304", result.data.record, {
                  headers: {
                    "Content-Type": "Application/json",
                    "X-Master-Key": "$2a$10$cTG13zEGs74GNxHDzCQhYueh0LC5TmWftLNzyE9yrTC.xzWULC8sK"
                  }
                })
                .then(response => {
                  if (response.status === 200) {
                    res.status(200).send('ok');
                  } else {
                    res.status(400).send("No Ok");
                  }
                })
                .catch(error => {
                  console.error("Error al guardar en la base de datos:", error);
                  res.status(500).send("Error interno del servidor");
                });
              })
              .catch(error => {
                console.error("Error al obtener datos de la base de datos:", error);
                res.status(500).send("Error interno del servidor");
              });
          }
        }
    
    module.exports = controller;