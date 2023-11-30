const mongoose = require('mongoose');
const Schema = mongoose.Schema;
/* const expenseScema = new Schema({
    name: {type: String, required: true},
    amount: {type: Number, required: true},
    date: Date
});
const expense = mongoose.model('expense', expenseScema); */

const userSchema = new Schema({
    firstName: String,
    lastName: String,
    email: { type: String, unique: true },
    expenses: [{
        name: String,
        amount: Number,
        category: String,
        date: {type: Date, default: Date.now} }],
    income: [{
        name: String,
        amount: Number,
        category: String,
        date: {type: Date, default: Date.now} }],
    budget: [{
        name: String,
        amount: Number,
        category: String,
        date: {type: Date, default: Date.now} }]
});

const User = mongoose.model('user', userSchema);

//module.exports = Money;
module.exports = User;