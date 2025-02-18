# User Management API

## Opis zadania

Projekt implementuje API do zarządzania użytkownikami, stworzone w technologii **Node.js** z wykorzystaniem **Express.js** i **SQLite**. Aplikacja pozwala na dodawanie, edytowanie, usuwanie oraz pobieranie użytkowników z bazy danych.

### Funkcjonalności:

1. **Dodawanie użytkowników** - Możliwość dodania użytkownika z danymi: imię, email, wiek, login.
2. **Pobieranie użytkowników** - Możliwość pobrania listy wszystkich użytkowników w formacie JSON.
3. **Edycja użytkownika** - Możliwość edytowania danych użytkownika na podstawie jego `id`.
4. **Usuwanie użytkownika** - Możliwość usunięcia użytkownika na podstawie jego `id`.

## Instalacja zależności

Aby uruchomić aplikację lokalnie, wykonaj poniższe kroki:

### 1. Zainstaluj zależności

W katalogu głównym projektu, uruchom polecenie, aby zainstalować wszystkie wymagane zależności:

```bash
npm install
```

### 2. Konfiguracja bazy danych

Baza danych **SQLite** jest już zintegrowana w projekcie. Podczas uruchamiania aplikacji, struktura bazy danych zostanie automatycznie utworzona w pliku `database.db`.

### 3. Uruchomienie serwera

Aby uruchomić serwer, w katalogu głównym projektu uruchom poniższe polecenie:

```bash
node backend/server.js
```

Domyślnie, aplikacja będzie nasłuchiwać na porcie **3000**. Możesz teraz rozpocząć testowanie API.

## API Endpoints

### 1. **POST /users** - Dodawanie użytkownika

Dodaj użytkownika do bazy danych.

**Body (JSON):**

```json
{
  "name": "Jan Kowalski",
  "email": "jan.kowalski@example.com",
  "age": 40,
  "username": "jankowalski"
}
```

### 2. **GET /users** - Pobieranie użytkowników

Pobierz listę wszystkich użytkowników w formacie JSON.

**Response (JSON):**

```json
[
  {
    "id": 1,
    "name": "Jan Kowalski",
    "email": "jan.kowalski@example.com",
    "age": 40,
    "username": "jankowalski"
  }
]
```

### 3. **PUT /users/:id** - Edytowanie użytkownika

Zaktualizuj dane użytkownika na podstawie jego `id`.

**Body (JSON):**

```json
{
  "name": "Jan Kowalski-Updated",
  "email": "jan.kowalski.updated@example.com",
  "age": 41,
  "username": "jankowalski_updated"
}
```

### 4. **DELETE /users/:id** - Usuwanie użytkownika

Usuń użytkownika na podstawie jego `id`.

**Response:**

```json
{
  "message": "Użytkownik został usunięty."
}
```

## Testowanie

Do testowania API możesz użyć narzędzi takich jak **Postman** lub **Insomnia**. Poniżej przedstawiam przykłady zapytań:

1. **POST /users** - Dodaj użytkownika:

   - Body (JSON):

   ```json
   {
     "name": "Anna Nowak",
     "email": "anna.nowak@example.com",
     "age": 28,
     "username": "annanowak"
   }
   ```

2. **GET /users** - Pobierz użytkowników:

   - Brak body.
   - Oczekiwana odpowiedź:

   ```json
   [
     {
       "id": 1,
       "name": "Anna Nowak",
       "email": "anna.nowak@example.com",
       "age": 28,
       "username": "annanowak"
     }
   ]
   ```

3. **PUT /users/1** - Edytuj użytkownika o `id=1`:

   - Body (JSON):

   ```json
   {
     "name": "Anna Nowak-Updated",
     "email": "anna.nowak.updated@example.com",
     "age": 29,
     "username": "annanowak_updated"
   }
   ```

4. **DELETE /users/1** - Usuń użytkownika o `id=1`:
   - Brak body.
   - Oczekiwana odpowiedź:
   ```json
   {
     "message": "Użytkownik został usunięty."
   }
   ```
