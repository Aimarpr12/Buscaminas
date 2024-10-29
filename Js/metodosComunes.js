// Función de cierre de sesión
export function logout() {
    localStorage.removeItem('activeUser');
    localStorage.removeItem('justLoggedIn');
    localStorage.removeItem('editarPerfil');
    window.location.href = 'index.html'; // Redirige al usuario a la página de inicio
}