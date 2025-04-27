# Fast Double-Click

O Fast Double-Click é uma aplicação web que mede o tempo entre dois cliques consecutivos em um botão. Após o segundo clique, o tempo é enviado ao backend e registrado em um arquivo registros.json. Os registros podem ser visualizados, filtrados e ordenados em uma segunda página.

## 🧩 Funcionalidades

* Medição do intervalo entre dois cliques.

* Registro de data, hora e tempo em registros.json.

* Visualização dos registros em uma lista.

* Filtragem por intervalo de datas.

* Ordenação por horário e tempo (ascendente/descendente).

* Navegação entre páginas com mudança de URL.

## 🛠️ Tecnologias Utilizadas
* Frontend: React (Next.js)

* Backend: Node.js (Express)

* Armazenamento: Arquivo JSON

## ⚙️ Como Rodar o Projeto

1. Clone o repositório:

```
git clone https://github.com/IvanBelshoff/Fast-Double-Click.git
cd Fast-Double-Click
```

2. Instale as dependências:

    * Backend:
    ```
    cd backend
    npm install
    ```
     * Frontend:
    ```
    cd ../frontend
    npm install
    ```

3. Configure os arquivos .env:​

    * Exemplo no Backend:
    ```
    PORT=5010
    HOST=192.168.1.0
    NODE_ENV=development
    ```
    * Exemplo no Frontend:
    ```
    NEXT_BASE_URL=http://localhost:5010
    ```
4. Inicie os servidores:

    * Backend:
    ```
    cd backend
    npm run start
    ```

     * Frontend:
    ```
    cd ../frontend
    npm run dev
    ```

##  🙌 Agradecimentos
Este projeto foi desenvolvido como parte do desafio Fast Double-Click.
