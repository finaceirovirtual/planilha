import {
  auth,
  db,
  collection,
  addDoc,
  query,
  where,
  onSnapshot,
  onAuthStateChanged,
} from "./firebase.js";

const newTransactionButton = document.getElementById("new-transaction");
const transactionModal = document.getElementById("transaction-modal");
const closeModalButton = document.getElementById("close-modal");
const transactionForm = document.getElementById("transaction-form");
const categorySelect = document.getElementById("category");
const typeSelect = document.getElementById("type");

const categories = {
  expense: ["Alimentação", "Transporte", "Lazer", "Moradia", "Compras"],
  income: ["Salário", "Freelancer", "Doação"],
};

// Abrir modal
newTransactionButton.addEventListener("click", () => {
  transactionModal.style.display = "flex";
});

// Fechar modal
closeModalButton.addEventListener("click", () => {
  transactionModal.style.display = "none";
});

// Atualizar categorias ao mudar o tipo
typeSelect.addEventListener("change", () => {
  const type = typeSelect.value;
  categorySelect.innerHTML = `
    <option value="">Selecione uma categoria</option>
    ${categories[type].map((cat) => `<option value="${cat}">${cat}</option>`).join("")}
  `;
});

// Adicionar transação
transactionForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const description = transactionForm.description.value;
  const amount = parseFloat(transactionForm.amount.value);
  const type = transactionForm.type.value;
  const category = transactionForm.category.value;
  const date = transactionForm.date.value;
  const recurring = transactionForm.recurring.checked;

  try {
    const user = auth.currentUser;
    if (user) {
      await addDoc(collection(db, "transactions"), {
        userId: user.uid,
        description,
        amount,
        type,
        category,
        date,
        recurring,
        createdAt: new Date(),
      });
      alert("Transação adicionada com sucesso!");
      transactionModal.style.display = "none";
      transactionForm.reset();
    }
  } catch (error) {
    alert("Erro ao adicionar transação: " + error.message);
  }
});

// Carregar transações
onAuthStateChanged(auth, (user) => {
  if (user) {
    const q = query(collection(db, "transactions"), where("userId", "==", user.uid));
    onSnapshot(q, (snapshot) => {
      const transactionsList = document.getElementById("transactions-list");
      transactionsList.innerHTML = "";
      snapshot.forEach((doc) => {
        const transaction = doc.data();
        const row = `
          <tr>
            <td>${new Date(transaction.date).toLocaleDateString()}</td>
            <td>${transaction.description}</td>
            <td>${transaction.category}</td>
            <td class="${transaction.type === "income" ? "income" : "expense"}">
              ${transaction.type === "income" ? "+" : "-"} R$ ${transaction.amount.toFixed(2)}
            </td>
          </tr>
        `;
        transactionsList.insertAdjacentHTML("beforeend", row);
      });
    });
  }
});