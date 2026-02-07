# Objetivo:

Implementar um sistema de controle de gastos residenciais. Deixar claro qual foi a lógica/função do que foi desenvolvido, através de comentários e documentação no próprio código.

## Tecnologias Utilizadas:

## **Backend**

_C# / .NET 8 (Web API)_
_Entity Framework Core_
_SQLite_
_Swagger (Testes da API)_

## **Frontend**

_React + TypeScript_
_Vite_
_Tailwind CSS_
_Axios (Consumo de API)_
_React Router Dom_

O uso de SQLite com EF Core nessa aplicação é para facilitar a portabilidade e a execução
imediata do projeto. Pois, o SQLite permite rodar o projeto sem precisar instalar um servidor
pesado de banco de dados (como SQL Server ou Oracle).

Como sabemos, existe uma arquitetura modular, porém, como essa aplicação é pequena, a nivel de teste
e não temos o interesse em faze-la crescer para outras funcionalidades e serviços, escolhi esse formato
para facilitar. Porém, conformefor necessário, é possível aprimorar essa arquitetura e deixa-la na melhor forma.

# Estrutura de Pastas:

```text
/MAXIPROD FULLSTACK
│
├── /frontend
│ ├── /src
│ │ ├── /components
│ │ ├── /pages
│ │ └── /services
│
├── /backend
│ ├── /Models
│ ├── /Data
│ ├── /Controllers
│ └── app.db

Partindo do presuposto de que o ambiente de desenvolvimento já está pronto para trabalhar,
començando o desenvolvimento do codigo pelo backend, no terminal, criando um novo webAPI com o comando
"dotnet new webapi -n backend". Em seguido acesso a pasta backend e adiciono as ferramentas
que vão permitir comunicar com SQLite e usar as migrations, com os seguintes codigos
"dotnet add package Microsoft.EntityFrameworkCore.Sqlite" e o "dotnet add package Microsoft.EntityFrameworkCore.Design".

# Regras de Negócio Implementadas

O sistema não é apenas um CRUD simples, ele coleta e processa as informações retornando dados estruturados para auxiliar em decisões.
**Validação de Categoria:** Uma categoria definida como "Receita" não aceita lançamentos do tipo "Despesa" e vice-versa.
**Cálculo em Tempo Real:** O Dashboard processa somas de receitas, despesas e saldo líquido por pessoa via consultas otimizadas no banco de dados.
**Tratamento de Ciclos:** Configuração de JSON para ignorar referências circulares entre Pessoas e Transações.

O Coração do Backend é DashboardController.cs. Este arquivo manipula dados e entregar performance. Usei async/await para garantir a escalabilidade da API e tratei valores nulos no Sum para evitar erros de runtime. Foram criados outros controllers e outras models, tambem foi configurado os arquivos de Program.cs e AppDbContext.cs.

Apos toda definição do backend chegou a hora de fazer as migrations. É o que garante que tudo suba para o banco de dados usando os seguintes comandos: dotnet ef migrations add CriandoEstruturaCompleta e o dotnet ef database update.

No frontend iniciei usando o comando de criação com o Vite: npm create vite@latest frontend -- --template react-ts, a escolha foi React com TyoeScript. Em seguida entro no repositório e dou os seguintes comandos: npm install, npm install axios react-router-dom, npm install -D tailwindcss postcss autoprefixer. Apos instalação das ferramentas que vão nos ajudar no desenvolvimento do frontend vamos começar a construção das telas.

Fiz o uso de classes utilitárias do Tailwind CSS prezando por agilidade e design responsivo. Na construção do design tentei ser o mais simples possível sem perder de vista as diretrizes de UI.

Na pasta services fica localizado o arquivo api.ts responsavel por fazer a ponte que conecta webAPI ao frontend permitindo tudo acontecer.

# Como Executar o Projeto

**1. Backend**
Certifique-se de ter o SDK do .NET instalado.

Bash
cd backend
dotnet ef database update
dotnet run
A API estará disponível em: http://localhost:5232/swagger/index.html.

**2. Frontend**
Certifique-se de ter o Node.js instalado.

Bash
cd frontend
npm install
npm run dev
Acesse: http://localhost:5173

Se tiver problema em rodar na sua maquina, farei deploy dessa aplicação em uma ferramenta chamada Railway,
o link para acesso vai estar vinculado ao repositorio dentro do Github:

Entretanto, no Railway

# Detalhes Técnicos

**- Padronização REST:** Endpoints bem definidos seguindo os verbos HTTP (GET, POST).
**- Responsividade:** Interface adaptável para dispositivos móveis usando as classes utilitárias do Tailwind.
**OBS:** No desenvolvimento visual da aplicação não levei em consideração um tema ou um design pre definido,
sendo assim, não dediquei na construção de um visual muito elaborado.
**- Tipagem Forte:** Uso de TypeScript e Interfaces no Frontend para evitar bugs de dados inconsistentes.
**- Arquitetura Organizada:** Separação clara entre a lógica de apresentação (React) e a lógica de persistência (C#).

# Considerações finais

O projeto foi desenvolvido com foco em simplicidade pragmática. Decisões como o uso de classes utilitárias no CSS e arquitetura modular simplificada foram tomadas para maximizar a agilidade sem comprometer a manutenibilidade.
```
