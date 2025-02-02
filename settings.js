import { auth } from './firebase.js';

const userEmailSettings = document.getElementById('user-email-settings');
const toggleDarkMode = document.getElementById('toggle-dark-mode');

// Mostrar email do usuário
onAuthStateChanged(auth, (user) => {
  if (user) {
    userEmailSettings.textContent = user.email;
  }
});

// Alternar modo escuro
toggleDarkMode.addEventListener('click', () => {
  document.documentElement.classList.toggle('dark');
  localStorage.setItem('theme', document.documentElement.classList.contains('dark') ? 'dark' : 'light');
});

// Verificar tema salvo
if (localStorage.getItem('theme') === 'dark') {
  document.documentElement.classList.add('dark');
}