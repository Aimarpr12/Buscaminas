
const login = document.getElementById('login');
const register = document.getElementById('register');
const loginForm = document.querySelector('.login');
const registerForm = document.querySelector('.register');
login.addEventListener('click', () => {
    loginForm.style.display = 'block';
    registerForm.style.display = 'none';
});
register.addEventListener('click', () => {
    loginForm.style.display = 'none';
    registerForm.style.display = 'block';
});

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

document.getElementById('loginForm').addEventListener('submit', handleLogin);
document.getElementById('registerForm').addEventListener('submit', handleRegister);

function handleLogin(event) {
    event.preventDefault(); // Evita el envío del formulario

    const username = document.getElementById('loginUsername').value;
    const password = document.getElementById('loginPassword').value;

    // Recupera los usuarios de localStorage
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const user = users.find(user => user.username === username && user.password === password);

    if (user) {
        alert('Inicio de sesión exitoso!');
        // Aquí puedes redirigir al usuario o realizar alguna acción adicional
    } else {
        alert('Nombre de usuario o contraseña incorrectos.');
    }
}

function handleRegister(event) {
    event.preventDefault(); // Evita el envío del formulario

    const username = document.getElementById('registerUsername').value;
    const password = document.getElementById('registerPassword').value;
    const imageInput = document.getElementById('registerImage');
    const imageFile = imageInput.files[0];

    // Verifica si el nombre de usuario ya existe en localStorage
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const userExists = users.some(user => user.username === username);

    if (userExists) {
        alert('El nombre de usuario ya está en uso. Por favor elige otro.');
    } else {
        const reader = new FileReader();
        reader.onload = function (e) {
            const user = {
                username,
                password,
                image: e.target.result // Almacena la imagen como base64
            };
            users.push(user); // Agrega el nuevo usuario al array
            localStorage.setItem('users', JSON.stringify(users));

            alert('Registro exitoso!');
            imageInput.value = '';
            document.getElementById('registerUsername').value = '';
            document.getElementById('registerPassword').value = '';
        };

        if (imageFile) {
            reader.readAsDataURL(imageFile);
        } else {
            const user = {
                username,
                password,
                image: 'Img/perfil.png' // Imagen por defecto
            };
            users.push(user);
            localStorage.setItem('users', JSON.stringify(users));
            alert('Registro exitoso!');
        }
    }
}
