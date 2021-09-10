Desafio Zaply Frontend 08/2021

Principais tecnologias utilizadas: MongoDB, Express, React+Redux, Node.
API escrita em TypeScript, frontend em JavaScript.
Outras tecnologias auxiliares: react-bootstrap, glob e mongoose, MongoDB Atlas (para hospedagem do banco de dados remoto)

// Utilização:
Método simples: acesse o frontend (react-app) no meu servidor - http://alanspa.xyz:3000
O backend está localizado em http://alanspa.xyz:5000/api

Para teste local:
Após baixar o código, navegue até o diretório /backend e digite o comando 'yarn install' para instalar todas as dependências.
Faça a mesma coisa para o diretório /frontend, instalando as dependências do react.

Para rodar o backend, será necessário rodar também um banco de dados. Para sua conveniência, o backend está hospedado no meu servidor:
http://alanspa.xyz:5000/api/

Rotas:
GET /api/produtos/
GET /api/id/:id
GET /api/produtos/search/?&q=mercearia&q=nesfit
PUT /api/id/

Caso prefira testar tudo localmente, será necessário configurar um banco de dados MongoDB e editar a linha do arquivo .env para a direção do seu banco.
Em seguida, rode o script buildDB.ts para construir o banco, e o backend poderá então ser rodado localmente.

Para rodar o frontend, simplesmente digite yarn start e o aplicativo react será executado em seu navegador. As configurações padrão conectam no backend hospedado no meu servidor, mas podem ser facilmente alteradas editando a linha "proxy" dentro do arquivo package.json

(seria mais fácil simplesmente colocar tudo no docker? seria.)

// Explicação:
A primeira coisa a ser feita foi colocar todos os dados do produto em um banco de dados. Optei por utilizar o MongoDB pela simplicidade da tabela de produtos, que não possuia relações - se fosse o caso, utilizaria o Postgre.

Como os dados vieram em formato .csv, utilizei uma simples ferramenta online para converter para o formato json, e em seguida escrevi uma ferramenta (buildDB.ts) para fazer o upload desse arquivo json no meu banco de dados. Também achei interessante criar índices no MongoDB para agilizar a pesquisa. Ainda que o frontend não implemente essa funcionalidade, a API suporta busca por texto, utilizando qualquer quantidade de parâmetros, ex:
/api/produtos/search?&q=mercearia
ou
api/produtos/search?&q=mercearia&q=nesfit

A API em si é bastante simples. Utilizei o express, e o mongoose para conectar ao MongoDB. A linguagem escolhida foi o TypeScript.

O frontend, por sua vez, é o tradicional React + Redux para gerenciamento de estado. Para a interface, optei por usar o react-bootstrap, pois para uma rápida prototipação ele dá mais que conta do recado. Por sua vez, o front se comunica com o backend utilizando o axios para as requisições http.
