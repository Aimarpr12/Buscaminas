import { logout } from './metodosComunes.js';

document.addEventListener('DOMContentLoaded', () => {
    anadirSeccion('menu.html', 'menu');
    anadirSeccion('footer.html', 'footer');
});

function botonJugar() {
    const buttonJugar = document.getElementById('play');
    buttonJugar.addEventListener('click', (event) => {
        event.preventDefault();
        if (localStorage.getItem('justLoggedIn')) {
            window.location.href = 'game.html';
        } else {
            alert('Debes iniciar sesión para jugar al buscaminas');
            const credencialesDialog = document.getElementById('credenciales');
            credencialesDialog.showModal(); // Abre el diálogo en modo modal
        }
    });
}

function anadirSeccion(url, elementId) {
    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error('Error al cargar el archivo HTML.');
            }
            return response.text();
        })
        .then(htmlContent => {
            document.getElementById(elementId).innerHTML = htmlContent;
            if (elementId === 'menu') {
                inicarJs();
                botonJugar();
                botonAuth();
                botonMenuMovil();
            }
        })
        .catch(error => {
            console.error('Error:', error);
        });
}

function inicarJs() {

    const currentPage = window.location.pathname.split('/').pop(); // Obtiene el nombre del archivo actual
    const menuItems = document.querySelectorAll('.menu li a');

    const buttonLogout = document.getElementById('logout');
    const buttonEditProfile = document.getElementById('editProfile');
    menuItems.forEach(item => {
        // Resalta el enlace si coincide con la página actual
        if (item.getAttribute('href') === currentPage) {
            item.classList.add('active');
        }
    });
    if (localStorage.getItem('justLoggedIn') === 'true') {
        ejecutaFuncionAlVolver();
        buttonEditProfile.style.display = 'block';
        buttonLogout.style.display = 'block';
    } else {
        const buttonLogin = document.getElementById('auth');
        buttonLogin.innerHTML = "Iniciar sesión / Registrarse";
        buttonEditProfile.style.display = 'none';
        buttonLogout.style.display = 'none';


    }
}

function ejecutaFuncionAlVolver() {
    const buttonLogin = document.getElementById('auth');
    const buttonLogout = document.getElementById('logout');
    const buttonEditProfile = document.getElementById('editProfile');
    const activeUser = JSON.parse(localStorage.getItem('activeUser')); // Obtén el usuario activo de localStorage

    if (activeUser) {
        // Reemplaza el botón de autenticación con el nombre del usuario
        buttonLogin.innerHTML = `User: <b>${activeUser.username}</b>`;
        buttonLogin.classList.add('disabled');
        buttonLogin.removeAttribute('href');

        // Muestra los botones de cerrar sesión y editar perfil

        // Configurar el botón de cerrar sesión
        buttonLogout.addEventListener('click', () => {
            buttonLogin.innerHTML = "Iniciar sesión / Registrarse";
            buttonLogin.disabled = false;
            buttonLogout.style.display = 'none';
            buttonEditProfile.style.display = 'none';
            logout();
        });

        const credencialesDialog = document.getElementById('credenciales');
        // Configurar el botón de editar perfil
        buttonEditProfile.addEventListener('click', async () => {
            localStorage.setItem('editarPerfil', 'true');
            credencialesDialog.showModal(); // Abre el diálogo en modo modal
            try {
                // Importa dinámicamente el módulo auth.js
                const { auth } = await import('./auth.js');
                auth(); // Llama a la función `auth` del módulo importado
            } catch (error) {
                console.error("Error al cargar el módulo auth.js:", error);
            }
        });
    }
}

function botonAuth() {
    const authBoton = document.getElementById('auth');
    const credencialesDialog = document.getElementById('credenciales');
    authBoton.addEventListener('click', async () => {
        credencialesDialog.showModal(); // Abre el diálogo en modo modal
        try {
            // Importa dinámicamente el módulo auth.js
            const { auth } = await import('./auth.js');
            auth(); // Llama a la función `auth` del módulo importado
        } catch (error) {
            console.error("Error al cargar el módulo auth.js:", error);
        }
    });

}

function cerrarAuth() {
    const credencialesDialog = document.getElementById('credenciales');
    credencialesDialog.close(); // Cierra el diálogo
}

function botonMenuMovil() {
    const menuMovil = document.getElementById('menu-icon');
    const menu = document.getElementById('menuNav');
    menuMovil.addEventListener('click', () => {
        if (menu.classList.contains('mostrar')) {
            menu.classList.remove('mostrar');
            menu.classList.add('hidden');
        } else {
            menu.classList.add('mostrar');
            menu.classList.remove('hidden');
        }

    });
}