const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    firstName: String,
    lastName: String,
    email: {type:String, unique: true},
    expenses: [{
        expenseName: String,
        expenseAmount: Number
    }],
    income: [{
        incomeName: String,
        incomeAmount: Number
    }],
    budget: [{
        budgetName: String,
        budgetAmount: Number
    }]
    });

const User = mongoose.model('user', userSchema);

module.exports = User;