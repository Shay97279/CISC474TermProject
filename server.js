require('dotenv').config();
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const port = 8080;
const User = require('./models/user');
const uri = process.env.MONGO_URL;
app.use(express.json());

mongoose.connect(uri, {
});
const connection = mongoose.connection;
connection.once('open', () => {
	console.log("MongoDB database connection established successfully");
});

app.post('/user', async (req, res) => {
	try {
		console.log(req.body);
		const newUser = new User({
			firstName: req.body.firstName,
			lastName: req.body.lastName,
			email: req.body.email,
			expenses: req.body.expenses,
			income: req.body.income,
			budget: req.body.budget
		});
		await User.create(newUser);
		res.send("User created");
	}
	catch (err) {
		console.log("error" + err);
	}
});
app.post('/api/v1/addExpense', async (req, res) => {
	try {
		console.log(req.body);
		const update = {name: req.body.expenses.name, amount: req.body.expenses.amount, category: req.body.expenses.category, date: req.body.expenses.date};
		console.log(update);
		await connection.collection('users').updateOne({ "email": req.body.email }, { $push: { "expenses": update } });
		res.send("User updated");
	}
	catch (err) {
		console.log("error: " + err);
	}
});
app.delete('/api/v1/removeExpense', async (req, res) => {
	try {
		console.log(req.body);
		await connection.collection('users').updateMany({ "email": req.body.email }, { $pull: { "expenses": { "name": req.body.expenses.name} } });
		res.send("User updated: Expense deleted");
	}
	catch (err) {
		console.log("error: " + err);
	}
});
app.get('/user', async (req, res) => {
	try {
		const users = await User.find();
		res.send(users);
	}
	catch (err) {
		console.log("error" + err);
	}
});
app.get('/api/v1/subscriptions', async (req, res) => {
	try {
		const users = await User.find();
		res.send(users);
	}
	catch (err) {
		console.log("error" + err);
	}
});

app.listen(port, () => {
	console.log(`server started on ${port}`);
});
