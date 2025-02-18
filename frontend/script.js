function validateForm() {
  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const age = document.getElementById("age").value.trim();
  const username = document.getElementById("username").value.trim();

  if (!name || !email || !age || !username) {
    alert("Wszystkie pola są wymagane!");
    return false;
  }
  if (!email.includes("@")) {
    alert("Podaj poprawny adres e-mail!");
    return false;
  }
  if (isNaN(age) || age < 1 || age > 120) {
    alert("Podaj poprawny wiek!");
    return false;
  }
  return true;
}

document
  .getElementById("userForm")
  .addEventListener("submit", async function (event) {
    event.preventDefault();

    if (!validateForm()) return;

    const userId = document.getElementById("userId").value;
    const user = {
      name: document.getElementById("name").value,
      email: document.getElementById("email").value,
      age: document.getElementById("age").value,
      username: document.getElementById("username").value,
    };

    if (userId) {
      // Aktualizacja użytkownika
      await fetch(`http://localhost:3000/api/users/${userId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(user),
      });
    } else {
      // Dodanie nowego użytkownika
      await fetch("http://localhost:3000/api/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(user),
      });
    }

    // Resetowanie formularza
    document.getElementById("userForm").reset();
    document.getElementById("userId").value = "";

    loadUsers();
  });

async function fetchWithErrorHandling(url, options = {}) {
  try {
    const response = await fetch(url, options);
    if (!response.ok) throw new Error(`Błąd: ${response.statusText}`);
    return await response.json();
  } catch (error) {
    alert(`Wystąpił błąd: ${error.message}`);
    console.error(error);
  }
}

async function loadUsers() {
  const users = await fetchWithErrorHandling("http://localhost:3000/api/users");
  if (!users) return;

  const tableBody = document.querySelector("#userTable tbody");
  tableBody.innerHTML = "";

  users.forEach((user) => {
    const row = `<tr>
          <td>${user.id}</td>
          <td>${user.name}</td>
          <td>${user.email}</td>
          <td>${user.age}</td>
          <td>${user.username}</td>
          <td>
              <button onclick="editUser(${user.id})">Edytuj</button>
              <button onclick="deleteUser(${user.id})" style="background-color:red;">Usuń</button>
          </td>
      </tr>`;
    tableBody.innerHTML += row;
  });
}

async function editUser(id) {
  const response = await fetch(`http://localhost:3000/api/users`);
  const users = await response.json();
  const user = users.find((u) => u.id === id);

  if (user) {
    document.getElementById("userId").value = user.id;
    document.getElementById("name").value = user.name;
    document.getElementById("email").value = user.email;
    document.getElementById("age").value = user.age;
    document.getElementById("username").value = user.username;
  }
}

async function deleteUser(id) {
  if (!confirm("Czy na pewno chcesz usunąć użytkownika?")) return;

  await fetchWithErrorHandling(`http://localhost:3000/api/users/${id}`, {
    method: "DELETE",
  });

  loadUsers();
}

window.onload = loadUsers;
