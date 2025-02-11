# EducaOnline

Projeto de blogging dinâmico - após a implementação utilizando a plataforma OutSystems, a implementação do back-end em Node.js, implementação do front-end feito em React com TypeScript com utilização do Vite, este repositório apresenta a implementação mobile do projeto. 

Repositório do projeto back-end: https://github.com/barbara-azevedo/techChallenge2

## Grupo de trabalho
- RM 357978 - Bárbara Azevedo de Sá
- RM 357524 - Murilo Greco Campos de Almeida
- RM 357736 - Victor Lima Fernandes
- RM 357330 - Wellington Raimundo da Silva

Nosso grupo adotou uma abordagem colaborativa, realizando reuniões frequentes para alinhar atividades, compartilhar conhecimento e resolver desafios encontrados ao longo do desenvolvimento. 

## Interface gráfica

Este projeto conta com as seguintes páginas:
* Página principal com a lista de postagens;
* Página de leitura de postagens;
* Página de administrativa para gerenciamento de conteúdo;
* Página de edição de postagens;
* Página de criação de postagens;
* Página de login.

## Requisitos técnicos

* Desenvolvimento em React Native;
* Utilização de técnicas de estilização;
* Integração com back end para realização de chamadas ao end-point REST para POST, GET, DELETE e PUT de postagens, alunos, professores e autenticação de usuários.


## Estrutura do projeto
A estrutura do projeto é organizada da seguinte forma:
```bash  
├── app/ 
│ └── # 
├── assets/ 
│ └── # Contém arquivos estáticos
├── components/ 
│ └── # Contém componentes reutilizáveis da aplicação: backbutton, header, lista de posts, entre outros.
├── routes/ 
│ └── # Contém a configuração das rotas da aplicação.
├── src/ 
│ └── # Contém serviços para comunicação com APIs e outras funcionalidades.
```

# Requisitos e setup
Tecnologias utilizadas:
* React Native
* Typescript


## Clone do repositório
1. Clone o repositório:
```bash
git clone https://github.com/barbara-azevedo/techChallenge4.git
````
2. Navegue até o diretório do respositório:
```bash
cd techChallenge4
````
3. Instale as dependências
````bah
npm install
````
4. Execute o projeto
````bash
npx expo start
````
É possível abrir o emulador do app com as seguintes opções:
- [development build](https://docs.expo.dev/develop/development-builds/introduction/)
- [Android emulator](https://docs.expo.dev/workflow/android-studio-emulator/)
- [iOS simulator](https://docs.expo.dev/workflow/ios-simulator/)
- [Expo Go](https://expo.dev/go), a limited sandbox for trying out app development with Expo


É necessário também o funcionamento em paralelo do projeto back-end, de acordo com os seguintes passos:
1. Clone o repositório:
```bash
git clone https://github.com/barbara-azevedo/techChallenge2.git
````

2. Navegue até o diretório do respositório:
```bash
cd techChallenge2
````
3. Acesse a branch /feature/nestjs

4. Instale as dependências
````bah
npm install
````
5. Execute o projeto
````bash
npm run start:dev
````
