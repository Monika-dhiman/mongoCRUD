//May 18, 2023, Thursday

import express from 'express';
import bodyParser from 'body-parser';
import colors from 'colors';
//rest object
const app = express();
const password = "12345";

//rest apis
app.get('/', (req, res) => {
    res.send('<h1> welcome to e-commerce</h1>');
})
// get api
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
//post api
app.post('/login', bodyParser.json(), (req, res) => {
    let userInfo = req.body;
    let response = JSON.stringify(userInfo); 
    res.json(userInfo);
})
//status codes
app.get('/statuscodes', (req, res) => {

    res.status(404).send('Page not found...');
})




const PORT = 8080;

app.listen(PORT, '127.0.0.1', () => {
    console.log('server activated'.blue.red);
})