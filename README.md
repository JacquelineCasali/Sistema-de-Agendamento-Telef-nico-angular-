## Projeto  Full-Stack (Spring Boot + Angular)

Sistema Full Stack desenvolvido para cadastro, consulta, edição, inativação e marcação de contatos como favoritos. 
Utiliza Java com Spring Boot no backend, Angular no frontend, e PostgreSQL como banco de dados relacional.

## 🎥Vídeo do projeto


## 🚀 Tecnologias Utilizadas

## Backend:
- **[Java 17]**
- **[Spring Boot(Spring Web, Spring Data JPA, Validation)]**
- **[Hibernate (ORM para interação com banco de dados) ]**
- **[Maven]**
- **[PostgreSQL (Banco de dados relacional)]**
- **[Lombok (Redução de código boilerplate)]**
- **[Postman]**
- **[springdoc (Documentação da API)]**
- **[cors]**
- **[JUnit / Mockito (para testes)]**

## Frontend:

- Angular (Framework front-end)
- TypeScript
- Bootstrap (Para estilização)
- Angular Guards (para proteção de rotas)
- Jasmine / Karma (para testes)

## ⚙️ Funcionalidades

✅Cadastro de Contatos (validação de duplicidade por número de celular, nome do contato, email)

✅Consulta de contatos (ativos)

✅Validações:

✅Atualização de contatos

✅Inativação de contatos

✅Marcar e desmarcar como favorito


## 🚀 Como Rodar o Projeto

📌 1. Configuração do Banco de Dados

Certifique-se de que você tem o PostgreSQL instalado e crie um banco de dados:
CREATE DATABASE desafio_fullstack;

📌 2. Configurar o application.properties

No diretório src/main/resources/application.properties, configure a conexão com o banco:

- spring.datasource.url=jdbc:postgresql://localhost:5432/desafio_fullstack
- spring.datasource.username=seu_usuario
- spring.datasource.password=sua_senha
- spring.jpa.hibernate.ddl-auto=update

📌 3. Rodar o Backend (Spring Boot)
- ./mvnw spring-boot:run


Execute o seguinte comando na raiz do projeto backend:

Pré-requisitos: Java 17

# clonar repositório
git clone https://github.com/JacquelineCasali/Sistema-de-Agendamento-Telefonico-java.git

# executar o projeto
./mvnw spring-boot:run

A API estará disponível em: http://localhost:8080


📌 4. Rodar o Frontend (Angular)
Entre na pasta do frontend e execute:

- npm install  # Instalar dependências
- ng serve     # Rodar o projeto
  O frontend estará acessível em: http://localhost:4200
-
# clonar repositório
git clone https://github.com/JacquelineCasali/Sistema-de-Agendamento-Telef-nico-angular-.git

📖 Documentação da API

Após iniciar o backend, acesse a documentação da API no Swagger:
http://localhost:8080/swagger-ui/index.html

## 📝 Projeto Desenvolvido por
Jacqueline Casali
https://www.linkedin.com/in/jaquelinecasali/



