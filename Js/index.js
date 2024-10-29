import { logout } from './metodosComunes.js';


document.addEventListener('DOMContentLoaded', () => {
    if (sessionStorage.getItem('justLoggedIn') === 'true') {
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
    const activeUser = JSON.parse(localStorage.getItem('activeUser')); // Obtén el usuario activo de localStorage

    if (activeUser) {
        // Reemplaza el botón de autenticación con el nombre del usuario
        buttonLogin.innerHTML = activeUser.username;
        buttonLogin.disabled = true;

        // Crea un botón de cerrar sesión
        const buttonLogout = document.createElement('button');
        buttonLogout.innerHTML = 'Cerrar sesión';
        buttonLogout.addEventListener('click', () => {
            buttonLogin.innerHTML = "Iniciar sesión / Registrarse";
            buttonLogin.disabled = false;
            logout();
        });
        document.body.appendChild(buttonLogout);

        //Crea un boton para editar perfil 
        const buttonEdit = document.createElement('button');
        buttonEdit.innerHTML = 'Editar perfil';
        localStorage.setItem('editarPerfil', 'true');
        buttonEdit.addEventListener('click', () => {
            debugger;
            window.location.href='auth.html';
        });
        document.body.appendChild(buttonEdit);
    }
}
