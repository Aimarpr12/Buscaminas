import { logout } from './metodosComunes.js';


document.addEventListener('DOMContentLoaded', () => {
    if (localStorage.getItem('justLoggedIn') === 'true') {
        debugger;
        ejecutaFuncionAlVolver();
    }else{
        const buttonLogin = document.getElementById('auth');
        buttonLogin.innerHTML = "Iniciar sesión / Registrarse";

    }
});

function ejecutaFuncionAlVolver() {
    debugger;
    const buttonLogin = document.getElementById('auth');
    const buttonLogout = document.getElementById('logout');
    const buttonEditProfile = document.getElementById('editProfile');
    const activeUser = JSON.parse(localStorage.getItem('activeUser')); // Obtén el usuario activo de localStorage

    if (activeUser) {
        // Reemplaza el botón de autenticación con el nombre del usuario
        buttonLogin.innerHTML = activeUser.username;
        buttonLogin.disabled = true;
        buttonLogin.style.display = 'inline-block';

        // Muestra los botones de cerrar sesión y editar perfil
        buttonLogout.style.display = 'inline-block';
        buttonEditProfile.style.display = 'inline-block';

        // Configurar el botón de cerrar sesión
        buttonLogout.addEventListener('click', () => {
            buttonLogin.innerHTML = "Iniciar sesión / Registrarse";
            buttonLogin.disabled = false;
            buttonLogin.style.display = 'inline-block';
            buttonLogout.style.display = 'none';
            buttonEditProfile.style.display = 'none';
            logout();
        });

        // Configurar el botón de editar perfil
        buttonEditProfile.addEventListener('click', () => {
            debugger;
            localStorage.setItem('editarPerfil', 'true');
            window.location.href = 'auth.html';
        });
    }
}
