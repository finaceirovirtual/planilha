import { auth, db, doc, getDoc, signOut } from "./firebase.js";

const usernameHeader = document.getElementById("username");

onAuthStateChanged(auth, async (user) => {
  if (user) {
    const userDoc = await getDoc(doc(db, "users", user.uid));
    if (userDoc.exists()) {
      const username = userDoc.data().username;
      usernameHeader.textContent = username || user.email;
    } else {
      usernameHeader.textContent = user.email;
    }
  }
});

const logoutButton = document.getElementById("logout");

logoutButton.addEventListener("click", async () => {
  try {
    await signOut(auth);
    window.location.href = "login.html"; // Redirecionar para a página de login
  } catch (error) {
    alert("Erro ao sair: " + error.message);
  }
});

const sidebar = document.querySelector(".sidebar");
const menuToggle = document.createElement("button");
menuToggle.classList.add("menu-toggle");
menuToggle.innerHTML = "&#9776;"; // Ícone de menu
document.body.appendChild(menuToggle);

// Abrir/fechar ao passar o mouse
sidebar.addEventListener("mouseenter", () => {
  sidebar.classList.remove("collapsed");
});

sidebar.addEventListener("mouseleave", () => {
  sidebar.classList.add("collapsed");
});

// Abrir/fechar ao clicar no botão de menu (celular)
menuToggle.addEventListener("click", () => {
  sidebar.classList.toggle("collapsed");
});