require('dotenv').config();
const express = require('express');
const app = express();
const path = require('path');
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
app.get("/", (req, res) => {
	res.sendFile(path.join(__dirname + "/Pages/assets.html"));
	console.log("Express loads on main page!");
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
app.post('/api/v1/expenses', async (req, res) => {
	try {
		console.log(req.body);
		const update = { name: req.body.expenses.name, amount: req.body.expenses.amount, category: req.body.expenses.category, date: req.body.expenses.date };
		console.log(update);
		await connection.collection('users').updateOne({ "email": req.body.email }, { $push: { "expenses": update } });
		res.send("User updated");
	}
	catch (err) {
		console.log("error: " + err);
	}
});
app.delete('/api/v1/expenses', async (req, res) => {
	try {
		//console.log(req.body);
		await connection.collection('users').updateMany({ "email": req.body.email }, { $pull: { "expenses": { "name": req.body.expenses.name } } });
		res.send("User updated: Expense deleted");
	}
	catch (err) {
		console.log("error: " + err);
	}
});
app.get('/api/v1/expenses', async (req, res) => {
	try {
		const users = await connection.collection('users').findOne({ "email": req.body.email });
		res.send(users.expenses);
	}
	catch (err) {
		console.log("error" + err);
	}
});
app.get('/api/v1/subscriptions', async (req, res) => {
	try {
		const users = await connection.collection('users').aggregate([
			{
				$match: { email: req.body.email, "expenses.category": "subscriptions" }
			},
			{
				$project: {
					_id: 0,
					expenses: {
						$filter: {
							input: "$expenses",
							as: "expense",
							cond: { $eq: ["$$expense.category", "subscriptions"] }
						}
					}
				}
			}
		]);
		try {
			const arr = await users.toArray();
			res.send(arr);
		}
		catch (err) {
			console.log("error" + err);
		}
	}
	catch (err) {
		console.log("error" + err);
	}
});
app.post('/api/v1/income', async (req, res) => {
	try {
		console.log(req.body);
		const update = { name: req.body.income.name, amount: req.body.income.amount, category: req.body.income.category, date: req.body.income.date };
		console.log(update);
		await connection.collection('users').updateOne({ "email": req.body.email }, { $push: { "income": update } });
		res.send("User updated");
	}
	catch (err) {
		console.log("error: " + err);
	}
});
app.delete('/api/v1/income', async (req, res) => {
	try {
		//console.log(req.body);
		await connection.collection('users').updateMany({ "email": req.body.email }, { $pull: { "income": { "name": req.body.income.name } } });
		res.send("User updated: Income deleted");
	}
	catch (err) {
		console.log("error: " + err);
	}
});
app.get('/api/v1/income', async (req, res) => {
	try {
		const users = await connection.collection('users').findOne({ "email": req.body.email });
		res.send(users.income);
	}
	catch (err) {
		console.log("error" + err);
	}
});
app.get('/api/v1/assets', async (req, res) => {
	try {
		const users = await connection.collection('users').aggregate([
			{
				$match: { email: req.body.email, "income.category": "asset" }
			},
			{
				$project: {
					_id: 0,
					expenses: {
						$filter: {
							input: "$assets",
							as: "asset",
							cond: { $eq: ["$$income.category", "asset"] }
						}
					}
				}
			}
		]);
		try {
			const arr = await users.toArray();
			res.send(arr);
		}
		catch (err) {
			console.log("error" + err);
		}
	}
	catch (err) {
		console.log("error" + err);
	}
});
app.post('/api/v1/budget', async (req, res) => {
	try {
		console.log(req.body);
		const update = { name: req.body.budget.name, amount: req.body.budget.amount, category: req.body.budget.category, date: req.body.budget.date };
		console.log(update);
		await connection.collection('users').updateOne({ "email": req.body.email }, { $push: { "budget": update } });
		res.send("User updated");
	}
	catch (err) {
		console.log("error: " + err);
	}
});
app.delete('/api/v1/budget', async (req, res) => {
	try {
		//console.log(req.body);
		await connection.collection('users').updateMany({ "email": req.body.email }, { $pull: { "budget": { "name": req.body.income.name } } });
		res.send("User updated: budget deleted");
	}
	catch (err) {
		console.log("error: " + err);
	}
});
app.get('/api/v1/budget', async (req, res) => {
	try {
		const users = await connection.collection('users').findOne({ "email": req.body.email });
		res.send(users.budget);
	}
	catch (err) {
		console.log("error" + err);
	}
});
app.get('/api/v1/login', async (req, res) => {
	try {
		const users = await connection.collection('users').findOne({ "email": req.body.email , "password": req.body.password});
		res.send(users._id);
	}
	catch (err) {
		console.log("error" + err);
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

app.listen(port, () => {
	console.log(`server started on ${port}`);
});
