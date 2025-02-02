import { db, collection, query, where, onSnapshot } from './firebase.js';
import { auth } from './firebase.js';

const totalIncome = document.getElementById('total-income');
const totalExpense = document.getElementById('total-expense');
const totalBalance = document.getElementById('total-balance');

onAuthStateChanged(auth, (user) => {
  if (user) {
    const q = query(collection(db, 'transactions'), where('userId', '==', user.uid));
    onSnapshot(q, (snapshot) => {
      let income = 0;
      let expense = 0;

      snapshot.forEach((doc) => {
        const transaction = doc.data();
        if (transaction.type === 'income') {
          income += transaction.amount;
        } else {
          expense += transaction.amount;
        }
      });

      totalIncome.textContent = `R$ ${income.toFixed(2)}`;
      totalExpense.textContent = `R$ ${expense.toFixed(2)}`;
      totalBalance.textContent = `R$ ${(income - expense).toFixed(2)}`;
    });
  }
});