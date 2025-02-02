// script.js
import { auth, signOut } from "./firebase.js";

const logoutButton = document.getElementById("logout");

logoutButton.addEventListener("click", async () => {
  try {
    await signOut(auth);
    window.location.href = "login.html"; // Redirecionar para a página de login
  } catch (error) {
    alert("Erro ao sair: " + error.message);
  }
});

// Atualizar o email do usuário no header
onAuthStateChanged(auth, (user) => {
  if (user) {
    document.getElementById('user-email').textContent = user.email;
  } else {
    window.location.href = 'login.html'; // Redirecionar para a página de login
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

// Exemplo de cálculo de saldo
const totalBalance = document.getElementById('total-balance');
const totalIncome = document.getElementById('total-income');
const totalExpense = document.getElementById('total-expense');

// Simulação de dados
totalBalance.textContent = 'R$ 1.500,00';
totalIncome.textContent = 'R$ 2.000,00';
totalExpense.textContent = 'R$ 500,00';