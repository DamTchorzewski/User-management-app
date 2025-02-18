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

   ## Zależności

5. **body-parser** (`^1.20.3`)

   - Używane do parsowania ciał zapytań HTTP. Dzięki temu aplikacja może przetwarzać dane przesyłane w żądaniach typu POST i PUT w formacie JSON.

6. **cors** (`^2.8.5`)

   - Zarządza dostępem między różnymi domenami (Cross-Origin Resource Sharing). Dzięki tej zależności aplikacja umożliwia wykonywanie zapytań z innych domen, co jest przydatne w przypadku aplikacji frontendowych uruchamianych na różnych serwerach.

7. **express** (`^4.21.2`)

   - Podstawowy framework do budowania aplikacji webowych w Node.js. Używany do zarządzania routingiem, middleware i zapytaniami HTTP. To serce aplikacji, które obsługuje wszystkie żądania i odpowiedzi.

8. **express-validator** (`^7.2.1`)

   - Biblioteka służąca do walidacji i sanitacji danych wejściowych w formularzach. Pomaga w zapewnieniu, że dane użytkownika są poprawne i spełniają określone wymagania przed zapisaniem ich w bazie danych.

9. **joi** (`^17.13.3`)

   - Używana do walidacji schematów danych. Jest to alternatywa dla `express-validator`, pozwala na bardziej zaawansowane reguły walidacji, takie jak sprawdzanie formatu emaila, wieku itp.

10. **morgan** (`^1.10.0`)

    - Logger HTTP, który rejestruje informacje o zapytaniach i odpowiedziach, co jest przydatne do monitorowania i debugowania aplikacji. Automatycznie generuje logi zapytań HTTP do konsoli.

11. **sqlite3** (`^5.1.7`)

    - Biblioteka do interakcji z bazą danych SQLite. Dzięki niej aplikacja może przechowywać dane użytkowników w lokalnej bazie danych w pliku `database.db`.

12. **winston** (`^3.17.0`)
    - Biblioteka do logowania aplikacji, umożliwia przechwytywanie, zapisywanie i formatowanie logów w różnych miejscach, takich jak pliki czy systemy zewnętrzne. Pomaga to w śledzeniu działania aplikacji oraz wychwytywaniu błędów.
