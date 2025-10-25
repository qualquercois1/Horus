# Projeto Horus 👁️

Um projeto full-stack para fins de estudo, focado inicialmente na implementação de um sistema completo de autenticação de usuários.

## Objetivo Atual

O foco principal no momento é construir uma tela de login funcional, onde o frontend se comunica com uma API no backend para validar e autenticar um usuário.

---

## Tecnologias Principais

* **Frontend:** React (utilizando Vite)
* **Backend:** Node.js (utilizando Express)

---

## Como Rodar o Projeto

1.  **Clone o repositório:**
    ```sh
    git clone <url-do-seu-repositorio>
    cd ProjetoHorus
    ```

2.  **Instale as dependências (backend e frontend):**
    ```sh
    # Instalar dependências do backend
    cd backend
    npm install

    # Instalar dependências do frontend
    cd ../frontend
    npm install
    ```

3.  **Inicie os servidores:**
    * Para rodar o **backend** (a partir da pasta `backend`):
        ```sh
        npm start
        # O servidor estará rodando em http://localhost:3001
        ```
    * Para rodar o **frontend** (a partir da pasta `frontend`):
        ```sh
        npm run dev
        # O app estará disponível em http://localhost:5173
        ```