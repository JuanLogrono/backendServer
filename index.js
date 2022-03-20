const express = require('express');
const Contenedor = require('./controllers/products')
const random = require('random')

const app = express()

const products = new Contenedor("./productos.txt")
const PORT = 8080


const server = app.listen(PORT, () => {
    console.log(`puerto ${server.address().port}`)
})
server.on("error", error => console.log(error))


let arrayProductos = []
const verArray = products.getAll()
verArray.then((R) => { arrayProductos = JSON.parse(R) })

app.get('/', (req, res) => {
    res.send("Desafío 3")
})

app.get('/productos', (req, res) => {
    res.send(arrayProductos)
})
app.get('/productoRandom', (req, res) => {
    let arrayNum = []
    arrayProductos.forEach(element => { arrayNum = [...arrayNum, element.id] });
    let nroRandom = random.integer(0, arrayNum.length - 1)
    const randomProd = products.getById(arrayNum[nroRandom])
    randomProd.then((response) => res.send(response))
    
});

