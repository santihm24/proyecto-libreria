import React from 'react'
import './header.css'
import LoginIcon from '@mui/icons-material/Login';
import HomeIcon from '@mui/icons-material/Home';
import ArticleIcon from '@mui/icons-material/Article';
import ClearAllIcon from '@mui/icons-material/ClearAll';
import FilePresentIcon from '@mui/icons-material/FilePresent';
import ContactsIcon from '@mui/icons-material/Contacts';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import { Link } from 'react-router-dom'
import Cookies from 'universal-cookie';
import SesionExpired from '../sesionExpired/SesionExpired';

export default function Header() {

    const cookies = new Cookies();
    const iniciado = cookies.get('iniciado');
    const email = cookies.get('email');
    const nombre = cookies.get('nombreUsuario');
    const apellido = cookies.get('apellidoUsuario');

    const handleLogout = () => {
        cookies.remove('iniciado');
        cookies.remove('email');
        cookies.remove('nombreUsuario');
        window.location.href = '/';
    }

    return (
        <div className='contenedor'>
            <nav className="navbar navbar-expand-lg bg-body-tertiary">
                <div className="container-fluid">
                    <img src='logo.jpg' className='logo' alt='logo'/>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <HomeIcon/>
                                <a className="nav-link active" aria-current="page" href="#">Inicio</a>
                            </li>
                            <li className="nav-item">
                                <ArticleIcon/>
                                <a className="nav-link" href="#">Tutoriales</a>
                            </li>

                            <li className="nav-item">
                                <ClearAllIcon/>
                                <a className="nav-link disabled" aria-disabled="true">Referencias</a>
                            </li>

                            <li className="nav-item">
                                <FilePresentIcon/>
                                <a className="nav-link disabled" aria-disabled="true">Recursos</a>
                            </li>

                            <li className="nav-item">
                                <ContactsIcon/>
                                <a className="nav-link disabled" aria-disabled="true">Contacto</a>
                            </li>
                            <Link to='/registro'>
                            <li className="nav-item">
                                <PersonAddIcon/>
                                <a className="nav-link disabled" aria-disabled="true">Registrarse</a>
                            </li>
                            </Link>
                            {iniciado ? (
                                <>
                                <li className='nav-item'>
                                    <span className='nav-link'>¡Bienvenido! {nombre} {apellido}</span>
                                    <span className='nav-link'>{email}</span>
                                </li>
                                <li className='nav-item'>
                                <a href="#" className='nav-link' onClick={handleLogout}>Cerrar sesion</a>
                                </li>
                                <SesionExpired/>
                                </>

                            ) : (
                                <Link to='/inicioSesion'>
                                    <li className="nav-item">
                                    <LoginIcon/>
                                    <a className="nav-link disabled" aria-disabled="true">Iniciar Sesion</a>
                                    </li>
                                </Link>
                            )}
                            
                        </ul>
                        <form className="d-flex" role="search">
                            <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
                            <button className="btn btn-outline-success" type="submit">Search</button>
                        </form>
                    </div>
                </div>
            </nav>
        </div>
    )
}
