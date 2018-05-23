import products from './db.json'
import express from 'express'
import bodyParser from 'body-parser'

const app = express()
app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json())

app.get('/',(req,res)=>res.send('Hello world!')) //รองข้อ ส่งกลับ
app.post('/',(req,res)=>{
    // console.log(req.body.name)
    res.send(`Hello world!${req.body.name}`)
})
app.get('/products',(req,res)=>res.json(products)) // การส่งproduct  ออกไป
app.get('/products/:id',(req,res)=>{
//    res.json(`Hello world!${req.body.name}`)
   const product = products.find(product=> product.id===req.params.id)
   console.log(product) 
    res.json(product)
}) 



app.post('/products',(req,res)=>{
    // console.log(req.body)
    // const product = products.find(product=> product.id===req.body.id)
    // res.json(req.body)
    products.push(req.body)
    console.log(products)
    res.status(201).json(products) 
})
app.put('/products/:id',(req,res)=>{
    const updateIndex = products.findIndex(product=> product.id===req.params.id)
    const productUpdate =Object.assign(products[updateIndex],req.body)
    console.log("productUpdate",productUpdate)
    res.json(productUpdate)
    // console.log(req.body)
    // console.log(req.params)
    // console.log("updateIndex",updateIndex)

})

app.delete('/products/:id',(req,res)=>{
    const deleteIndex = products.findIndex(product=> product.id===req.params.id)
    products.splice(deleteIndex,1)
    res.status(204).send()

})





app.listen(3013,()=> console.log('Example app listening on port 3013!'))
