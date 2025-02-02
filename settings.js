import { auth, db, doc, setDoc } from "./firebase.js";

const userSettingsForm = document.getElementById("user-settings-form");
const usernameInput = document.getElementById("username-input");

userSettingsForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const username = usernameInput.value;

  try {
    const user = auth.currentUser;
    if (user) {
      await setDoc(doc(db, "users", user.uid), {
        username: username,
      }, { merge: true }); // Atualiza apenas o campo username
      alert("Nome de usuário salvo com sucesso!");
    }
  } catch (error) {
    alert("Erro ao salvar nome de usuário: " + error.message);
  }
});