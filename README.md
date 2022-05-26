# topicos-sys-alunos

Projeto principal de exemplo da disciplina de Tópicos Especiais (Sistemas WEB) do Prof. Lucas Ferreira.

São dois projetos distintos dentro deste repositório. O projeto *sys-api* é a parte de back-end feita em Node.js.

O projeto *sys-web* é o front-end feito em React (projeto baseado em Vite).

Após baixar este repositório, para testar este projeto você deverá entrar em cada uma das pastas primárias e dar o comando `npm install`.


A API que deve ser estabelecida primeiro depende de um banco de dados MySQL para funcionar. Basta acertar a conexão com o banco em `sys-api/config/config.json` e depois rodar o comando `npx sequelize-cli db:migrate` para criar as tabelas em seu banco.
Nas sequencia será possível ligar a API em seu ambiente com o comando `npm start`. A API irá rodar inicialmente em http://localhost:5000


Depois da API ligada, podemos ligar o front-end e testar a integração, com o comando `npm run dev` dentro da pasta *sys-web*. 

Nosso projeto estará rodando em http://localhost:3000.
