import { db, collection, query, where, onSnapshot } from './firebase.js';
import { auth } from './firebase.js';

const transactionsList = document.getElementById('transactions-list');

// Carregar transações do Firebase
onAuthStateChanged(auth, (user) => {
  if (user) {
    const q = query(collection(db, 'transactions'), where('userId', '==', user.uid));
    onSnapshot(q, (snapshot) => {
      transactionsList.innerHTML = ''; // Limpar lista
      snapshot.forEach((doc) => {
        const transaction = doc.data();
        const row = `
          <tr>
            <td>${new Date(transaction.date).toLocaleDateString()}</td>
            <td>${transaction.description}</td>
            <td>${transaction.category}</td>
            <td class="${transaction.type === 'income' ? 'income' : 'expense'}">
              ${transaction.type === 'income' ? '+' : '-'} R$ ${transaction.amount.toFixed(2)}
            </td>
          </tr>
        `;
        transactionsList.insertAdjacentHTML('beforeend', row);
      });
    });
  }
});