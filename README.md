# Conmentarium

Minimalistic notebooks app built with React + Material-UI, and served with Flask. Star, fork or contribute if you wish so. 

### [live Demo](https://conmentarium.herokuapp.com/ "Conmentarium")

#### What you need to run this code locally (build folder)
1. Python 3 installed
2. Postgres database installed and running
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
flask db init
flask db migrate
flask db upgrade
flask run
```

if you are on Windows, use 'set' instead of export.

#### What you need to develop this code locally

#### Client-side
1. Node (v14.7.0)
2. NPM (6.14.7) or Yarn (1.22.4)
3. Install client-side dependencies (see below)

#### Server-side
1. Python and PIP
2. install server-side dependencies (see below)

####  How to develop this code
2. Clone this repository
3. Open command line in the cloned folder,
   - To install client side dependencies, run ```  npm install  ``` or ``` yarn ```
   - To install server side dependencies, ```pip install -r requirements.txt```
   - To run the client side application in development, run ```  npm start  ``` or ``` yarn start ```
4. Open [localhost:3000](http://localhost:3000/) in the browser
---- 

### Server-side Configs

file config.py in the root directory of this app contains all the neccessary configs for our Flask app. It contains mainly three classes: Config, Development, and Testing. The latter two all inherit from Config. If you planning on running locally (development), please go to server/__init__.py and in the ```create_app()``` function's config_class parameter, pass in the class Development instead of Config. Leave as Config for deployment.
You may change the config variables in each class as you wish.

### Deploy to Heroku

Everything is already set up for your to deploy this app to Heroku. All you need is to create a new app 
at Heroku and push this repository to it. Learn more on doing so on [Flask PWA Chatterbot: Deployment on Heroku
](https://langcodex.herokuapp.com/posts/34) or check out the offcial Heroku docs.

### GitHub repository

[https://github.com/MurphyAdam/Conmentarium](https://github.com/MurphyAdam/ConmentariumConmentarium