const login = document.getElementById('login');
const register = document.getElementById('register');
const loginForm = document.querySelector('.login');
const registerForm = document.querySelector('.register');
debugger;
// Muestra u oculta los formularios de inicio de sesión y registro
login.addEventListener('click', () => {
    loginForm.style.display = 'block';
    registerForm.style.display = 'none';
});
register.addEventListener('click', () => {
    loginForm.style.display = 'none';
    registerForm.style.display = 'block';
});

// Vista previa de la imagen y validación de dimensiones cuadradas
document.querySelectorAll('input[type="file"]').forEach(input => {
    input.addEventListener('change', function (event) {
        const file = event.target.files[0];
        const previewDiv = event.target.nextElementSibling;

        let warningMessage = previewDiv.nextElementSibling;
        if (warningMessage && warningMessage.classList.contains('warning')) {
            warningMessage.remove();
        }

        if (file && file.type.startsWith('image/')) {
            const img = new Image();
            img.src = URL.createObjectURL(file);

            img.onload = function () {
                if (img.width === img.height) {
                    const reader = new FileReader();
                    reader.onload = function (e) {
                        previewDiv.innerHTML = `<img src="${e.target.result}" alt="Vista previa">`;
                    };
                    reader.readAsDataURL(file);
                } else {
                    previewDiv.innerHTML = `<img src="img/perfil.png" alt="Foto de perfil por defecto">`;

                    const warning = document.createElement('div');
                    warning.classList.add('warning');
                    warning.textContent = "Solo se permiten imágenes cuadradas.";
                    previewDiv.parentNode.insertBefore(warning, previewDiv.nextSibling);
                }
            };
        } else {
            previewDiv.innerHTML = `<img src="img/perfil.png" alt="Foto de perfil por defecto">`;
        }
    });
});

// Guardar la URL de origen
document.addEventListener('DOMContentLoaded', () => {
    const referrer = document.referrer;
    if (referrer && !referrer.includes(window.location.hostname)) {
        localStorage.setItem('redirectAfterAuth', referrer);
    }
debugger;
    if(localStorage.getItem('editarPerfil')){
        const radio = document.querySelector('.radioAuth');
        loginForm.style.display = 'none';
        registerForm.style.display = 'block';
        radio.style.display = 'none';
        const buttonRegister = document.getElementById('register');
        buttonRegister.innerHTML = "Editar perfil";
        const username = document.getElementById('registerUsername');
        username.disabled = true;
        username.value = JSON.parse(localStorage.getItem('activeUser')).username;
        const imageContainer = document.querySelector('.image');
        const activeUser = JSON.parse(localStorage.getItem('activeUser'));

        if (activeUser.image) {
            imageContainer.innerHTML = `<img src="${activeUser.image}" alt="Foto de perfil actual">`;
        } else {
            imageContainer.innerHTML = `<img src="img/perfil.png" alt="Foto de perfil por defecto">`;
        }

        const buttonEdit = document.getElementById('register');
        buttonEdit.innerHTML = 'Editar perfil';
    }

});

// Escucha los eventos de los formularios de inicio de sesión y registro
document.getElementById('loginForm').addEventListener('submit', handleLogin);
document.getElementById('registerForm').addEventListener('submit', handleRegister);

function handleLogin(event) {
    event.preventDefault();
    debugger;
    const username = document.getElementById('loginUsername').value;
    const password = document.getElementById('loginPassword').value;

    const users = JSON.parse(localStorage.getItem('users')) || [];
    const user = users.find(user => user.username === username && user.password === password);

    if (user) {
        localStorage.setItem('activeUser', JSON.stringify(user));
        alert('Inicio de sesión exitoso!');
        sessionStorage.setItem('justLoggedIn', 'true');
        // Redirige a la página anterior o a index.html si no hay referrer
        if (document.referrer) {
            window.location.href = document.referrer;
        } else {
            window.location.href = 'index.html';
        }
    } else {
        alert('Nombre de usuario o contraseña incorrectos.');
    }
}
function handleRegister(event) {
    debugger;
    event.preventDefault();

    const username = document.getElementById('registerUsername').value;
    const password = document.getElementById('registerPassword').value;
    const imageInput = document.getElementById('registerImage');
    const imageFile = imageInput.files[0];

    const users = JSON.parse(localStorage.getItem('users')) || [];
    const isEditingProfile = JSON.parse(localStorage.getItem('activeUser'));

    if (isEditingProfile) {
        // Actualización de perfil de usuario

        const activeUser = JSON.parse(localStorage.getItem('activeUser'));

        // Actualiza la imagen del usuario en base64 si se sube una nueva
        const reader = new FileReader();
        reader.onload = function (e) {
            const updatedUser = {
                username: activeUser.username, // El nombre de usuario permanece igual
                password, // Nueva contraseña ingresada
                image: e.target.result || activeUser.image // Nueva imagen o mantiene la existente
            };

            // Actualiza el usuario en el array `users`
            const updatedUsers = users.map(user =>
                user.username === activeUser.username ? updatedUser : user
            );

            // Guarda los datos actualizados
            localStorage.setItem('users', JSON.stringify(updatedUsers));
            localStorage.setItem('activeUser', JSON.stringify(updatedUser));
            sessionStorage.setItem('justLoggedIn', 'true');
            alert('Perfil actualizado exitosamente!');
            
            // Redirige a la página anterior o a index.html
            if (document.referrer) {
                window.location.href = document.referrer;
            } else {
                window.location.href = 'index.html';
            }
        };

        if (imageFile) {
            reader.readAsDataURL(imageFile);
        } else {
            // Si no se selecciona nueva imagen, solo actualiza la contraseña
            const updatedUser = {
                username: activeUser.username,
                password,
                image: activeUser.image // Usa la imagen existente
            };

            const updatedUsers = users.map(user =>
                user.username === activeUser.username ? updatedUser : user
            );

            localStorage.setItem('users', JSON.stringify(updatedUsers));
            localStorage.setItem('activeUser', JSON.stringify(updatedUser));
            alert('Perfil actualizado exitosamente!');
            
            // Redirige a la página anterior o a index.html
            if (document.referrer) {
                window.location.href = document.referrer;
            } else {
                window.location.href = 'index.html';
            }
        }
    } else {
        // Registro de un nuevo usuario
        const userExists = users.some(user => user.username === username);

        if (userExists) {
            alert('El nombre de usuario ya está en uso. Por favor elige otro.');
        } else {
            const reader = new FileReader();
            reader.onload = function (e) {
                const newUser = {
                    username,
                    password,
                    image: e.target.result
                };
                users.push(newUser);
                localStorage.setItem('users', JSON.stringify(users));
                localStorage.setItem('activeUser', JSON.stringify(newUser)); // Guarda el usuario recién creado como activo
                alert('Registro exitoso!');

                // Redirige a la página anterior o a index.html
                if (document.referrer) {
                    window.location.href = document.referrer;
                } else {
                    window.location.href = 'index.html';
                }
            };

            if (imageFile) {
                reader.readAsDataURL(imageFile);
            } else {
                const newUser = {
                    username,
                    password,
                    image: 'Img/perfil.png' // Imagen por defecto si no se selecciona una
                };
                users.push(newUser);
                localStorage.setItem('users', JSON.stringify(users));
                localStorage.setItem('activeUser', JSON.stringify(newUser)); // Guarda el usuario recién creado como activo
                alert('Registro exitoso!');

                // Redirige a la página anterior o a index.html
                if (document.referrer) {
                    window.location.href = document.referrer;
                } else {
                    window.location.href = 'index.html';
                }
            }
        }
    }
}
