import React from 'react'
import { GoogleOAuthProvider } from '@react-oauth/google';
import { GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from "jwt-decode";
import Cookies from 'universal-cookie';

function GoogleOAuth (){
    const cookies = new Cookies()
    return(
        <div>
            <GoogleOAuthProvider clientId='880468763726-9me4ojmq7ik84j7tnkcior0tgvh97o9m.apps.googleusercontent.com'>
                <GoogleLogin
                onSuccess={credentialResponse => {
                    const credentialResponseDecode = jwtDecode(credentialResponse.credential)
                    cookies.set('email', credentialResponseDecode.email, {
                        secure: true,
                        sameSite: 'None',
                        path: '/'
                    })
                    cookies.set('nombreUsuario', credentialResponseDecode.name, {
                        secure: true,
                        sameSite: 'None',
                        path: '/'
                    })
                    cookies.set('iniciado', true);

                    window.location.href = '/';
                }}
                onError={() => {
                    console.log('Login Failed');
                }}
                />
            </GoogleOAuthProvider>
        </div>
    )
}

export default GoogleOAuth;
