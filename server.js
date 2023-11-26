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

app.listen(port, () => {
	console.log(`server started on ${port}`);
});















/* const {MongoClient} = require('mongodb');
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({extended: true}));

mongoose.connect("mongodb+srv://jjoc0205:Jmwins00@cluster474.ogg29o3.mongodb.net/474", {useNewUrlParser: true, useUnifiedTopology: true});

const expenseSchema = {
  expenseName: String,
  expenseAmount: Number
};
const userSchema = {
  expenses: [expenseSchema],
};

const User = mongoose.model("User", userSchema);

app.get("/", function(req, res){
  res.sendFile(__dirname + "/index.html");
  console.log(req.body);
});

app.post("/", function(req, res){
  console.log("new expense added");
  const user = new User({
	expenses: [{
	  expenseName: req.body.expenseName,
	  expenseAmount: req.body.expenseAmount
	}]
  });
  user.save();
  console.log("saved to database");
});

app.listen(3000, function(){
  console.log("Server started on port 3000");
}); */
/*
const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://jjoc0205:Jmwins00@cluster474.ogg29o3.mongodb.net/?retryWrites=true&w=majority";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
	version: ServerApiVersion.v1,
	strict: true,
	deprecationErrors: true,
  }
});

async function run() {
  try {
	// Connect the client to the server	(optional starting in v4.7)
	await client.connect();
	// Send a ping to confirm a successful connection
	await client.db("admin").command({ ping: 1 });
	console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
	// Ensures that the client will close when you finish/error
	await client.close();
  }
}
run().catch(console.dir); */

/* async function main(){
  /**
   * Connection URI. Update <username>, <password>, and <your-cluster-url> to reflect your cluster.
   * See https://docs.mongodb.com/ecosystem/drivers/node/ for more details
	*
  const uri = "mongodb+srv://jjoc0205:Jmwins00@cluster474.ogg29o3.mongodb.net/?retryWrites=true&w=majority";


  const client = new MongoClient(uri);

  try {
	  // Connect to the MongoDB cluster
	  await client.connect();

	  // Make the appropriate DB calls
	  await  listDatabases(client);

  } catch (e) {
	  console.error(e);
  } finally {
	  await client.close();
  }
} */

// main().catch(console.error);
