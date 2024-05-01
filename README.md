# CourseMentor

CourseMentor é uma plataforma de gestão de conteúdo para cursos online, desenvolvida para facilitar a administração de usuários, artigos e categorias. Combinando tecnologias modernas como Vue.js, Node.js, MongoDB, PostgreSQL e Docker, o CourseMentor oferece uma solução robusta e escalável para criar e gerenciar conteúdo educacional online.

---

## Recursos Principais:

- Cadastro e gerenciamento de usuários.
- Criação e edição de artigos sobre diversos tópicos.
- Organização de artigos em categorias para fácil navegação.
- Interface amigável e responsiva para uma experiência de usuário agradável.

## Tecnologias Utilizadas:

- **Vue.js**: Framework JavaScript para construção de interfaces de usuário interativas.
- **Node.js**: Plataforma de tempo de execução JavaScript para construir aplicativos de rede escaláveis.
- **MongoDB**: Banco de dados NoSQL orientado a documentos para armazenamento de dados flexível.
- **PostgreSQL**: Sistema de gerenciamento de banco de dados relacional para armazenamento de dados estruturados.
- **Docker**: Plataforma de código aberto para automação de implantação de aplicativos em contêineres.
- **Licor-tree**: Biblioteca Vue.js para manipulação de estruturas de árvore.
- **Bootstrap**: Framework front-end para desenvolvimento web responsivo.
- **Vue-toastification**: Biblioteca Vue.js para exibição de notificações na interface do usuário.

## Como Executar o Projeto:

1. Tenha o docker instalado na sua máquina.
2. Clone este repositório em sua máquina local.
```bash
git clone  https://github.com/Coimbra777/Course-Mentor.git
```
3. Entre no diretorio de /Course-Mentor/backend e execute:
```bash
npm i
```
4. Entre no diretório de /Course-Mentor/frontend e execute:
```bash
npm i
```
## Com as dependências instaladas execute:
```bash
docker compose up --build
```

## Você pode verificar as conexões com os bancos de dados dando log no conteiner backend do projeto:
```bash
docker logs <id_do_conteiner_backend>
```

## Frontend estará rodando na porta:
```bash
http://localhost:8080
```
## Comando para parar os contêineres docker:
```bash
docker compose down
```

