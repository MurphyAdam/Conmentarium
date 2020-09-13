# Conmentarium

Minimalistic notebooks app built with React + Material-UI, and served with Flask. Star, fork or contribute if you wish so. 

### [live Demo](https://conmentarium.herokuapp.com/ "Conmentarium")

#### What you need to run this code locally (build folder)
1. Python 3 installed
2. Install Dependecies in requirement.txt
3. In the root of this directory: 

#### Client /conmentarium
```bash
cd client
yarn (or npm install)
yarn build (or npm run build)
```

#### Server /conmentarium
```bash
export FLASK_ENV=development
flask run
```

if you are on Windows, use 'set' instead of export.

#### What you need to develop this code locally

1. Node (v14.7.0)
2. NPM (6.14.7) or Yarn (1.22.4)

####  How to develop this code
2. Clone this repository
3. Open command line in the cloned folder,
   - To install dependencies, run ```  npm install  ``` or ``` yarn ```
   - To run the application for development, run ```  npm start  ``` or ``` yarn start ```
4. Open [localhost:3000](http://localhost:3000/) in the browser
---- 

### Deploy to Heroku

Everything is already set up for your to deploy this app to Heroku. All you need is to create a new app 
at Heroku and push this repository to it. Learn more on doing so on [Flask PWA Chatterbot: Deployment on Heroku
](https://langcodex.herokuapp.com/posts/34) or check out the offcial Heroku docs.

### GitHub repository

[https://github.com/MurphyAdam/Concentio](https://github.com/MurphyAdam/Concentio")