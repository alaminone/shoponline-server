const express = require('express');
const cors = require('cors'); // Import CORS middleware
require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());



const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const uri = "mongodb+srv://shoponline:JY7OTxnuF6gjQFaS@cluster0.ufduuil.mongodb.net/?retryWrites=true&w=majority";

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
    // await client.connect();
    const usersCollection = client.db("shoponline").collection("users");
    const productsCollection = client.db("shoponline").collection("products");
    app.get('/users', async (req, res) => {
        const cursor = usersCollection.find();
        const result = await cursor.toArray();
        res.send(result);
      });
      app.get('/users/:id', async (req, res) => {
        const id = req.params.id;
        const query = { _id: new ObjectId(id) };
        const result = await usersCollection.findOne(query);
        res.send(result);
      });


      app.post('/users', async (req, res) => {
        try {
            const userData = req.body;
            const result = await usersCollection.insertOne(userData);
            console.log("User data inserted:", result.insertedId);
            res.status(201).json({ message: "User created successfully", insertedId: result.insertedId });
        } catch (error) {
            console.error("Error creating user:", error);
            res.status(500).json({ error: "Internal server error" });
        }
    });
    


// Product
app.post('/products', async (req, res) => {
  try {
    const productData = req.body;
    const result = await productsCollection.insertOne(productData);
    console.log("Product data inserted:", result.insertedId);
    res.status(201).json({ message: "Product created successfully", insertedId: result.insertedId });
  } catch (error) {
    console.error("Error creating product:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});


app.get('/products', async (req, res) => {
  try {
    const products = await productsCollection.find().toArray();
    res.json(products);
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});




  
  
  
  

  
  



 


    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);




app.get('/', (req, res) => {
  res.send('Successfully connected to shoponline server');
});

app.listen(port, () => {
  console.log(`Successfully connected to shoponline server on port ${port}`);
});
