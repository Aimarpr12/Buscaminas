const login = document.getElementById('login');
const register = document.getElementById('register');
const loginForm = document.querySelector('.login');
const registerForm = document.querySelector('.register');
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
    /*
    const referrer = document.referrer;
    if (referrer && !referrer.includes(window.location.hostname)) {
        localStorage.setItem('redirectAfterAuth', referrer);
    }
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
    }*/

});

export function auth(){
    const menu = document.getElementById('menuNav');
    menu.classList.remove('mostrar');
    menu.classList.add('hidden');
    const referrer = document.referrer;
    if (referrer && !referrer.includes(window.location.hostname)) {
        localStorage.setItem('redirectAfterAuth', referrer);
    }
    if(localStorage.getItem('editarPerfil')){
     
        const radio = document.querySelector('.radioAuth');
        loginForm.style.display = 'none';
        registerForm.style.display = 'block';
        radio.style.display = 'none';
        const buttonRegister = document.getElementById('registerButton');
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
    }else{
        const register = document.getElementsByClassName('register');
    }

    const cerrarLogin = document.getElementById('cerrarLogin');
    cerrarLogin.addEventListener('click',cerrarAuth);
    const cerrarRegister = document.getElementById('cerrarRegister');
    cerrarRegister.addEventListener('click',cerrarAuth);
}

// Escucha los eventos de los formularios de inicio de sesión y registro
document.getElementById('loginForm').addEventListener('submit', handleLogin);
document.getElementById('registerForm').addEventListener('submit', handleRegister);

function handleLogin(event) {
    event.preventDefault();
    const username = document.getElementById('loginUsername').value;
    const password = document.getElementById('loginPassword').value;

    const users = JSON.parse(localStorage.getItem('users')) || [];
    const user = users.find(user => user.username === username && user.password === password);


    if (user) {
        debugger;
        localStorage.setItem('activeUser', JSON.stringify(user));
        alert('Inicio de sesión exitoso!');
        localStorage.setItem('justLoggedIn', 'true');
        cerrarAuth();
        window.location.reload();
    } else {
        alert('Nombre de usuario o contraseña incorrectos.');
    }
}
function handleRegister(event) {
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
        //Lo hemos comentado para usar un swicht case 
        /*
        if (imageFile) {
            resizeImage(imageFile, (resizedImage) => {
                const updatedUser = {
                    username: activeUser.username,
                    password,
                    image: resizedImage || activeUser.image
                };
                updateUserInLocalStorage(updatedUser, users, activeUser.username);
            });
        } else {
            const updatedUser = {
                username: activeUser.username,
                password,
                image: activeUser.image
            };
            updateUserInLocalStorage(updatedUser, users, activeUser.username);
        }*/
        switch (Boolean(imageFile)) {
            case true:
                resizeImage(imageFile, (resizedImage) => {
                    const updatedUser = {
                        username: activeUser.username,
                        password,
                        image: resizedImage || activeUser.image
                    };
                    updateUserInLocalStorage(updatedUser, users, activeUser.username);
                });
                break;
            case false:
                const updatedUser = {
                    username: activeUser.username,
                    password,
                    image: activeUser.image
                };
                updateUserInLocalStorage(updatedUser, users, activeUser.username);
                break;
        }    
    } else {
        // Registro de un nuevo usuario
        const userExists = users.some(user => user.username === username);

        if (userExists) {
            alert('El nombre de usuario ya está en uso. Por favor elige otro.');
        } else {
            if (imageFile) {
                resizeImage(imageFile, (resizedImage) => {
                    const newUser = {
                        username,
                        password,
                        image: resizedImage
                    };
                    saveNewUser(newUser, users);
                });
            } else {
                const newUser = {
                    username,
                    password,
                    image: 'Img/perfil.png'
                };
                saveNewUser(newUser, users);
            }
        }
    }
}

// Función para redimensionar la imagen antes de guardarla
function resizeImage(file, callback) {
    const img = new Image();
    img.src = URL.createObjectURL(file);

    img.onload = () => {
        const canvas = document.createElement('canvas');
        const MAX_WIDTH = 100;
        const MAX_HEIGHT = 100;
        let width = img.width;
        let height = img.height;

        if (width > height) {
            if (width > MAX_WIDTH) {
                height *= MAX_WIDTH / width;
                width = MAX_WIDTH;
            }
        } else {
            if (height > MAX_HEIGHT) {
                width *= MAX_HEIGHT / height;
                height = MAX_HEIGHT;
            }
        }
        canvas.width = width;
        canvas.height = height;

        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0, width, height);
        callback(canvas.toDataURL('image/png'));
    };
}

// Función para guardar un nuevo usuario en localStorage
function saveNewUser(newUser, users) {
    try {
        users.push(newUser);
        localStorage.setItem('users', JSON.stringify(users));
        localStorage.setItem('activeUser', JSON.stringify(newUser));
        alert('Registro exitoso!');
        cerrarAuth();
        window.location.reload();
    } catch (e) {
        if (e.name === 'QuotaExceededError') {
            alert('Espacio insuficiente en localStorage. Intenta eliminar algunos datos.');
        }
    }
}

// Función para actualizar un usuario existente en localStorage
function updateUserInLocalStorage(updatedUser, users, username) {
    try {
        const updatedUsers = users.map(user =>
            user.username === username ? updatedUser : user
        );
        localStorage.setItem('users', JSON.stringify(updatedUsers));
        localStorage.setItem('activeUser', JSON.stringify(updatedUser));
        alert('Perfil actualizado exitosamente!');
        cerrarAuth();
        window.location.reload();
    } catch (e) {
        if (e.name === 'QuotaExceededError') {
            alert('Espacio insuficiente en localStorage. Intenta eliminar algunos datos.');
        }
    }
}

function cerrarAuth() {
    const credencialesDialog = document.getElementById('credenciales');
    credencialesDialog.close(); // Cierra el diálogo
}

