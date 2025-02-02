// script.js
import { auth, onAuthStateChanged } from './firebase.js';

// Atualizar o email do usuário no header
onAuthStateChanged(auth, (user) => {
  if (user) {
    document.getElementById('user-email').textContent = user.email;
  } else {
    window.location.href = 'login.html'; // Redirecionar para a página de login
  }
});

// Exemplo de cálculo de saldo
const totalBalance = document.getElementById('total-balance');
const totalIncome = document.getElementById('total-income');
const totalExpense = document.getElementById('total-expense');

// Simulação de dados
totalBalance.textContent = 'R$ 1.500,00';
totalIncome.textContent = 'R$ 2.000,00';
totalExpense.textContent = 'R$ 500,00';