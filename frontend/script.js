function displayValidationErrors(errors) {
  // Resetowanie wcześniejszych komunikatów o błędach
  const errorElements = document.querySelectorAll(".error-message");
  errorElements.forEach((el) => el.remove());

  // Dodawanie nowych komunikatów o błędach przy odpowiednich polach
  errors.forEach((error) => {
    const field = document.getElementById(error.path);
    if (field) {
      const errorElement = document.createElement("div");
      errorElement.classList.add("error-message");
      errorElement.style.color = "red";
      errorElement.textContent = error.message;
      field.insertAdjacentElement("afterend", errorElement);
    }
  });
}

function validateForm() {
  // Pobranie wartości pól formularza
  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const age = document.getElementById("age").value.trim();
  const username = document.getElementById("username").value.trim();

  let errors = [];

  // Walidacja pola Imię
  if (!name) {
    errors.push({ path: "name", message: "Imię jest wymagane!" });
  } else if (name.length < 3) {
    errors.push({
      path: "name",
      message: "Imię musi mieć co najmniej 3 znaki!",
    });
  }

  // Walidacja pola Email
  if (!email) {
    errors.push({ path: "email", message: "Email jest wymagany!" });
  } else if (!email.includes("@")) {
    errors.push({ path: "email", message: "Podaj poprawny adres e-mail!" });
  }

  // Walidacja pola Wiek
  if (!age || isNaN(age) || age < 1 || age > 120) {
    errors.push({ path: "age", message: "Podaj poprawny wiek!" });
  }

  // Walidacja pola Login
  if (!username) {
    errors.push({ path: "username", message: "Login jest wymagany!" });
  }

  // Wyświetlanie błędów walidacji
  displayValidationErrors(errors);

  return errors.length === 0;
}

// Obsługa przesyłania formularza
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

    let response;
    try {
      response = await fetch(
        userId
          ? `http://localhost:3000/api/users/${userId}`
          : "http://localhost:3000/api/users",
        {
          method: userId ? "PUT" : "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(user),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        if (data.errors) {
          displayValidationErrors(data.errors);
        } else {
          alert(`Błąd: ${response.statusText}`);
        }
        return;
      }

      // Resetowanie formularza po udanej operacji
      document.getElementById("userForm").reset();
      document.getElementById("userId").value = "";
      loadUsers();
    } catch (error) {
      alert(`Wystąpił błąd sieci: ${error.message}`);
      console.error(error);
    }
  });

// Funkcja obsługująca błędy podczas zapytań do API
async function fetchWithErrorHandling(url, options = {}) {
  try {
    const response = await fetch(url, options);
    const data = await response.json();

    if (!response.ok) {
      if (data.errors) {
        displayValidationErrors(data.errors);
      } else {
        alert(`Błąd: ${response.statusText}`);
      }
      return null;
    }

    return data;
  } catch (error) {
    alert(`Wystąpił błąd: ${error.message}`);
    console.error(error);
    return null;
  }
}

// Funkcja pobierająca i wyświetlająca użytkowników w tabeli
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

// Funkcja do edycji użytkownika
async function editUser(id) {
  const users = await fetchWithErrorHandling("http://localhost:3000/api/users");
  if (!users) return;

  const user = users.find((u) => u.id === id);
  if (user) {
    document.getElementById("userId").value = user.id;
    document.getElementById("name").value = user.name;
    document.getElementById("email").value = user.email;
    document.getElementById("age").value = user.age;
    document.getElementById("username").value = user.username;
  }
}

// Funkcja do usuwania użytkownika
async function deleteUser(id) {
  if (!confirm("Czy na pewno chcesz usunąć użytkownika?")) return;

  await fetchWithErrorHandling(`http://localhost:3000/api/users/${id}`, {
    method: "DELETE",
  });

  loadUsers();
}

// Wczytanie użytkowników po załadowaniu strony
window.onload = loadUsers;
