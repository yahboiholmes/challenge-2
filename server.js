const express = require('express')
let data = require('./model/data.json')
var bodyParser = require('body-parser');
const { name } = require('ejs');
var app = express()
var port = 6969;


//middleware
app.use(express.json())
app.use(bodyParser.urlencoded())


app.get('/api/', (req,res)=>{
    res.send({message: 'This is HomePage'})
})

app.get('/api/home', (req,res)=> {
    res.status(200)
    res.end(JSON.stringify(data,null,3))
})


app.post('/api/home', (req,res)=>{
    var newData = req.body;
    data.push(newData)
    res.status(201).send({message: ' data is added ', data})

})

app.put('/api/home/:name', (req,res)=>{
    const name = req.params.name
    update = req.body
    index = data.findIndex(data => data.name == name )
    if (index != -1) {
        data[index] = update
        res.status(200).send({message: `the value ${name} is updated`})
    }else {
        res.status(404).send({message: `the value ${name}`})
    }



})

app.delete('/api/home/:name', (req,res)=>{
    let name = req.params.name
    originalLength = req.body
    originalLength = data.length
    data = data.filter(data => data.name != name) 
    if (data.length < originalLength) {
        res.status(200).send({message: `the value ${name} is deleted successfully`})
    }
    else {
        res.status(404).send({message: `the value you are looking ${name} is do not exist`})
    }
})


app.listen(port, () =>{
    console.log('Server is Available at http://localhost:6969');
})