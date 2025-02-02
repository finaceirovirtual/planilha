import { auth, createUserWithEmailAndPassword } from './firebase.js';

const registerForm = document.getElementById('register-form');

registerForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  const email = registerForm.email.value;
  const password = registerForm.password.value;
  const confirmPassword = registerForm['confirm-password'].value;

  if (password !== confirmPassword) {
    alert('As senhas não coincidem!');
    return;
  }

  try {
    await createUserWithEmailAndPassword(auth, email, password);
    window.location.href = 'index.html'; // Redirecionar para a página principal
  } catch (error) {
    alert('Erro ao registrar: ' + error.message);
  }
});