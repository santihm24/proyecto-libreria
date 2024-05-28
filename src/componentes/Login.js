import React, { useEffect, useState } from 'react';
import AlternateEmailIcon from '@mui/icons-material/AlternateEmail';
import PasswordIcon from '@mui/icons-material/Password';
import GroupIcon from '@mui/icons-material/Group';
import Header from './header/Header';
import Footer from './footer/Footer';
import Cookies from 'universal-cookie';
import Swal from 'sweetalert2';
import GoogleOAuth  from './googleOAuthProvider/GoogleOAuthProvider';


const Login = () => {
    const cookies = new Cookies();
    const [errorEmail, setErrorEmail] = useState(false);
    const [errorPassword, setErrorPassword] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const [values, setValues] = useState({
        rol: "",
        email: "",
        password: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        const newValues = {
            ...values,
            [name]: value,
        };
        setValues(newValues);
    };

    const handleClickPassword = () => {
        setErrorPassword(false);
    };

    const handleClickEmail = () => {
        setErrorEmail(false);
    };

    const toggleShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const iniciarSesion = (e) => {
        e.preventDefault();
        let select = document.getElementById('exampleFormControlSelect1');
        values.rol = select.value;

        if (values.password.length === 0 && values.email.length === 0) {
            setErrorEmail(true);
            setErrorPassword(true);
            return;
        }
        if (values.password.length === 0) {
            setErrorPassword(true);
            return;
        }
        if (values.email.length === 0) {
            setErrorEmail(true);
            return;
        }

        fetch("http://localhost:3001/login", {
            method: 'POST',
            headers: { "Content-Type": "Application/json", "Accept": "aplication/json" },
            body: JSON.stringify(values)
        })
        .then(response => response.json())
        .then(res => {
            console.log("res-->>", res)

            if (res.title === "error") {
                Swal.fire({
                    title: "Las credenciales ingresadas no son correctas",
                    icon: "error"
                })
                window.location.hash = '/login'
                return
            } else {

                
                cookies.set('nombre', res.nombre, {
                    secure: true,
                    sameSite: 'None',
                    path: '/'
                });

                cookies.set('apellido', res.apellido, {
                    secure: true,
                    sameSite: 'None',
                    path: '/'
                });

                cookies.set('email', res.email, {
                    secure: true,
                    sameSite: 'None',
                    path: '/'
                });

                if (values.rol === "Usuario") {
                    window.location.hash = '/'
                    cookies.set('iniciado', true);
                } else {
                    Swal.fire({
                        title:"Las credenciales ingresadas son incorrectas",
                        icon:"error"
                    })
                    window.location.hash = '/inicioSesion'
                }
            }
        })
            .catch((e) => Swal.fire({
                title: "no se pudo conectar con el servidor",
                icon: 'error'
            }),
                window.location.hash = '/inicioSesion'
            );
    };

    useEffect(() => {
        if (cookies.get('email')) {
            window.location.hash = '/inicioSesion'
        }
    }, );

    return (
        <div>
            <Header />
            <form onSubmit={iniciarSesion}>
                <section className='vh-100 bg-primary'>
                    <div className='container py-5 h-100'>
                        <div className='row d-flex justify-content-center align-items-center h-100'>
                            <div className='col-12 col-md-8 col-lg-6 col-xl-5'>
                                <div className='card shadow-2-strong rounded'>
                                    <div className='card-body p-5 text-center'>
                                        <h3 className='mb-5'>Sign in</h3>
                                        <div className='form-group mb-4'>
                                            <div className='text-start'>
                                                <label htmlFor="exampleFormControlSelect1">rol</label>
                                            </div>
                                            <div className='input-group mb-3'>
                                                <select className="form-control" id="exampleFormControlSelect1" name="rol">
                                                    <option>Administrador</option>
                                                    <option>Usuario</option>
                                                </select>
                                                <div className="input-group-append">
                                                    <span className="input-group-text" id="basic-addon2"><GroupIcon /></span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className='form-outline mb-4'>
                                            <div className='text-start'>
                                                <label className='form-label' htmlFor="typeEmailX">Email</label>
                                            </div>
                                            <div className="input-group mb-3">
                                                <input type="text" className="form-control" aria-label="Recipient's username" aria-describedby='basic-addon2' name='email' onChange={handleChange} onClick={handleClickEmail} />
                                                <div className="input-group-append">
                                                    <span className="input-group-text" id="basic-addon2"><AlternateEmailIcon /></span>
                                                </div>
                                            </div>
                                            <span className='text-start'>{errorEmail ? <p style={{ color: 'red' }}>Debe ingresar un email</p> : ""}</span>
                                        </div>
                                        <div className='form-outline mb-4'>
                                            <div className='text-start'>
                                                <label className="form-label" htmlFor="typeEmailX-2">Password</label>
                                            </div>
                                            <div className="input-group mb-3">
                                                <input type={showPassword ? 'text' : 'password'} className="form-control" aria-label="Recipient's username" aria-describedby='basic-addon2' name='password' onChange={handleChange} onClick={handleClickPassword} />
                                                <div className="input-group-append">
                                                    <span className="input-group-text" id='basic-addon2'><PasswordIcon onClick={toggleShowPassword} /></span>
                                                </div>
                                            </div>
                                            <span className='text-start'>{errorPassword ? <p style={{ color: 'red' }}>Debe ingresar una contraseña</p> : ""}</span>
                                        </div>
                                        <div className="d-grid gap-2 col-15 mx-auto">
                                            <button className="btn btn-primary btn-lg btn-block" type="submit">Login</button>
                                        </div>
                                        <div>
                                            <h5></h5>
                                            <h5>Acceso con Google</h5>
                                            <center><GoogleOAuth/></center>
                                        </div>
                                        <hr className='my-20' />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </form>
            <Footer />
        </div >
    );
}

export default Login;