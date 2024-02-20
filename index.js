const express = require('express')
const app = express()
const port = process.env.PORT || 5000;
require('dotenv').config();

app.use(cors());
app.use(express.json());

const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.ufduuil.mongodb.net/?retryWrites=true&w=majority`;

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


    const usersCollection = client.db("taskDB").collection("users");


    
    app.get('/users', async (request, response) => {
        const result = await usersCollection.find().toArray();
        response.status(200).send(result);
      });

      app.get('/users/per/:email', async (request, response) => {
        const email = request.params.email;
        const query = { email: email };
        const result = await usersCollection.findOne(query);
        response.status(200).send(result);
      });

      
    app.post('/users', async (request, response) => {
        const users = request.body;
        const result = await usersCollection.insertOne(users);
        response.status(200).send(result);
      });


    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}
run().catch(console.dir);




app.get('/', (req, res) => {
  res.send('successfully connected shoponline server')
})

app.listen(port, () => {
  console.log(`successfully connected shoponline server on port ${port}`)
})