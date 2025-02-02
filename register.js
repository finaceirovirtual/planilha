import {
  auth,
  createUserWithEmailAndPassword,
  db,
  collection,
  addDoc,
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
    const user = userCredential.user;

    // Criar um documento no Firestore para o usuário
    await addDoc(collection(db, "users"), {
      uid: user.uid,
      email: user.email,
      username: "", // Nome de usuário será definido nas configurações
      createdAt: new Date(),
    });

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