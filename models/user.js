const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const moneyScema = new Schema({
    name: String,
    amount: Number
});
const Money = mongoose.model('money', moneyScema);

const userSchema = new Schema({
    firstName: String,
    lastName: String,
    email: {type:String, unique: true},
    expenses: [moneyScema],
    income: [moneyScema],
    budget: [moneyScema]
    });

const User = mongoose.model('user', userSchema);

module.exports = Money;
module.exports = User;