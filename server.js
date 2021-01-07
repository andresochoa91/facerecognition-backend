const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex');

const signUp = require('./controllers/signUp');
const signIn = require('./controllers/signIn');
const profile = require('./controllers/profile');
const image = require('./controllers/image');

const db = knex({
	client: 'pg',
	connection: {
	  host : 'postgresql-contoured-44110',
		connectionString : process.env.DATABASE_URL,
		ssl: true,
	}
});

const app = express();

app.use(bodyParser.json());
app.use(cors())

app.get('/', (req, res) => { res.send("It is working") })
app.post('/signin', (req, res) => { signIn.handleSignIn(req, res, db, bcrypt) })
app.post('/signup', (req, res) => { signUp.handleSignUp(req, res, db, bcrypt) })
app.get('/profile/:id', (req, res) => { profile.handleProfile(req, res, db) })
app.put('/image', (req, res) => { image.handleImage(req, res, db) })
app.post('/imageurl', (req, res) => { image.handleApiCall(req, res) })

app.listen(process.env.PORT || 3000, () => {
	console.log(`app is running on port  ${process.env.PORT}`)
})

