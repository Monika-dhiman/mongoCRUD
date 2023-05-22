//MAY 19, 2023, Friday

import express from 'express';
import bodyParser from 'body-parser';
import colors from 'colors';
import {MongoClient} from 'mongodb';
const app = express();
const pass = "admin";
//MongoDB Connection

const url = 'mongodb://localhost:27017/';
const client = new MongoClient(url);
try{
  client.connect();
  console.log("connected to database");
}
catch{
  console.log("error in database");
}
const database = client.db('employees'); 
async function insertDocument(document) {
  try {
    const collection = database.collection('manager');
    const result = await collection.insertOne(document);
    console.log('Document inserted successfully:', result.insertedId);
  } catch (error) {
    console.error('Error inserting document:', error);
  } finally {
    await client.close(); // Close the MongoDB connection
  }
}

const collection= database.collection('manager');
// GET API
app.get('/get-detail', (req, res) => {
    let userInfo = req.query;
    console.log(userInfo);
    if(userInfo.pass === password){
        res.send('Correct Password');
    }
    else{
        res.send('Incorrect Password');
    }
    // console.log(" ==== REQ =====> ",req.query)
    // res.send('<h1> welcome to get detail</h1>');
})

app.get('/data', bodyParser.json() ,async (req, res) => {
  let user = req.query;
  // console.log(user);

  try{
    const result = await  collection.find({'username': user.username}).toArray(function(err, documents) {
      if (err) {
        console.log('Error occurred while retrieving data from MongoDB', err);
        return;
      }
      client.close();
    });
    // console.log(" === result ====> ",result);
    if(result.length < 1){
      res.json("user doesn't exist");
      return;
    }
    if(user.password === result[0].password){
      res.json("Logged In...");
    }
    else
      res.json("Incorrect Password");
  }
  catch (error){
    console.log(" ===== Error ====> ",error);
  }
})
//POST API

app.post('/signup', bodyParser.json(), (req, res) => {
  let userInfo = req.body;
  try
  {
     console.log(userInfo);
     insertDocument(userInfo);
     res.json("Successfully Signed Up");
  }
  catch (error){
      console.log("Error occured: " + error);
      res.json(error);
    }
})




app.get('/', (req, res) => {
    res.send('<h1> welcome to e-commerce</h1>');
})

const PORT = 8000;
app.listen(PORT, '127.0.0.1', () => {
    console.log('server activated'.blue.red);
})

