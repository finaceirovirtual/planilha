import {
  auth,
  createUserWithEmailAndPassword,
} from "./firebase.js";

const registerForm = document.getElementById("register-form");

registerForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const email = registerForm.email.value;
  const password = registerForm.password.value;
  const confirmPassword = registerForm["confirm-password"].value;

  if (password !== confirmPassword) {
    alert("As senhas não coincidem!");
    return;
  }

  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    alert("Usuário registrado com sucesso!");
    window.location.href = "index.html"; // Redirecionar para a página principal
  } catch (error) {
    if (error.code === "auth/email-already-in-use") {
      alert("Este e-mail já está em uso. Tente outro e-mail.");
    } else {
      alert("Erro ao registrar: " + error.message);
    }
  }
});