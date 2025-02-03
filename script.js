import { auth, db, doc, getDoc, onAuthStateChanged } from "./firebase.js";

const usernameHeader = document.getElementById("username");
const totalBalance = document.getElementById("total-balance");
const totalIncome = document.getElementById("total-income");
const totalExpense = document.getElementById("total-expense");

// Carregar nome de usuário
onAuthStateChanged(auth, async (user) => {
  if (user) {
    const userDoc = await getDoc(doc(db, "users", user.uid));
    if (userDoc.exists()) {
      const username = userDoc.data().username;
      usernameHeader.textContent = username || user.email;
    } else {
      usernameHeader.textContent = user.email;
    }

    // Carregar transações para calcular saldo
    const q = query(collection(db, "transactions"), where("userId", "==", user.uid));
    onSnapshot(q, (snapshot) => {
      let income = 0;
      let expense = 0;

      snapshot.forEach((doc) => {
        const transaction = doc.data();
        if (transaction.type === "income") {
          income += transaction.amount;
        } else {
          expense += transaction.amount;
        }
      });

      totalIncome.textContent = `R$ ${income.toFixed(2)}`;
      totalExpense.textContent = `R$ ${expense.toFixed(2)}`;
      totalBalance.textContent = `R$ ${(income - expense).toFixed(2)}`;
    });
  } else {
    window.location.href = "login.html"; // Redirecionar para a página de login
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