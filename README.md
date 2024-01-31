# Projeto Trybe Futebol Clube 
[![NPM](https://img.shields.io/npm/l/react)](https://github.com/FabricioAnastacio/projeto-TrybeFutebolClube/blob/main/LICENSE) 

# Sobre o projeto

Esse é um projeto FullStack desenvolvido utilizando a linguagem TypeScript em conjunto com JavaScript.

- Em `BackEnd` foi utilizado `TypeScript`. Minha participação esta composta 100% na pasta _app/backend/src_, os demais arquivos foram desenvovidos pela Trybe.
- Em `FrontEnd` foi utilizado `JavaScript` e todo o seu desenvolvimento foi feito pela Trybe.
- Apenas o arquivo `Dockerfile` em ambas foram de autoria minha.

O aplicativo TFC é um site informativo sobre partidas e classificações de futebol! ⚽️

## Layout web
![Web 1]()

![Web 2]()

## Modelo conceitual
![Modelo Conceitual]()

# Tecnologias utilizadas
## Back end
* Arquitetura em camadas
* Teste em camadas
* ORM - `Sequelize`
* Banco de dados realacional - `MySQL`
* Conteinerização - `Docker`
* Atenticação - `JWT`

## Front end
- Interamente desenvolvido pela Trybe

# Como executar o projeto

## Back end
Pré-requisitos: Node

```bash
# clonar repositório
git clone git@github.com:FabricioAnastacio/projeto-TrybeFutebolClube.git

# entrar na pasta do projeto back end
cd app

# executar o projeto
dokcer compose up -d --build && cd backend && npm run db:reset && cd ..
```

## Front end web
Pré-requisitos: npm

```bash
# entrar na pasta do projeto front end web
cd frontend

# executar o projeto
npm start
```

# Autor

Fabricio Anastacio Rodrigues

[![Linkedin](https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/far-dev/)
