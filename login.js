import {
  auth,
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  OAuthProvider,
} from "./firebase.js";

const loginForm = document.getElementById("login-form");
const googleLoginButton = document.getElementById("google-login");
const appleLoginButton = document.getElementById("apple-login");

// Login com e-mail e senha
loginForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const email = loginForm.email.value;
  const password = loginForm.password.value;

  try {
    await signInWithEmailAndPassword(auth, email, password);
    window.location.href = "index.html"; // Redirecionar para a página principal
  } catch (error) {
    alert("Erro ao fazer login: " + error.message);
  }
});

// Login com Google
googleLoginButton.addEventListener("click", async () => {
  const provider = new GoogleAuthProvider();
  try {
    await signInWithPopup(auth, provider);
    window.location.href = "index.html";
  } catch (error) {
    alert("Erro ao fazer login com Google: " + error.message);
  }
});

// Login com Apple
appleLoginButton.addEventListener("click", async () => {
  const provider = new OAuthProvider("apple.com");
  try {
    await signInWithPopup(auth, provider);
    window.location.href = "index.html";
  } catch (error) {
    alert("Erro ao fazer login com Apple: " + error.message);
  }
});