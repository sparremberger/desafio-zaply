Desafio Zaply Frontend 08/2021

Principais tecnologias utilizadas: MongoDB, Express, React+Redux, Node.
API escrita em TypeScript, frontend em JavaScript.
Outras tecnologias auxiliares: react-bootstrap, glob e mongoose, MongoDB Atlas (para hospedagem do banco de dados remoto)

http://alanspa.xyz:5000/api/

Rotas:
GET /api/produtos/
GET /api/id/:id
GET /api/produtos/search/?&q=mercearia&q=nesfit
PUT /api/id/

Caso prefira testar tudo localmente, será necessário configurar um banco de dados MongoDB e editar a linha do arquivo .env para a direção do seu banco.
Em seguida, rode o script buildDB.ts para construir o banco, e o backend poderá então ser rodado localmente.

API suporta busca por texto, utilizando qualquer quantidade de parâmetros, ex:
/api/produtos/search?&q=mercearia
ou
api/produtos/search?&q=mercearia&q=nesfit
