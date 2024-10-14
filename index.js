import express from 'express'

const app=express()
const port=5173

app.use(express.json())
let teaData=[]
let nextId=1

app.post('/teas',(req,res)=>{
    const{name,price}=req.body
    const newTea={id:nextId++,name,price}
    teaData.push(newTea)
    res.status(201).send(newTea)
})

app.get('/teas',(req,res)=>{
    res.status(200).send(teaData)
})

app.get('/teas/:id',(req,res)=>{
    const found=teaData.find(val=>val.id===parseInt(req.params.id))
    if(!found)
    {
        return res.status(404).send('Tea not found')
    }
    res.status(200).send(found)
    
})

//update Tea
app.put('/teas/:id',(req,res)=>{
    const found=teaData.find(val=>val.id===parseInt(req.params.id))
    if(!found)
        {
            return res.status(404).send('Tea not found')
        }
        const {name,price}=req.body
        found.name=name
        found.price=price
        res.status(200).send(found)
})

//delete tea
app.delete('/teas/:id',(req,res)=>{
    const index=teaData.findIndex(val=>val.id===parseInt(req.params.id))
    if(index===-1)
    {
        return res.status(404).send('Tea not found')
    }
    teaData.splice(index,1)
    return res.status(204).send('Deleted')
})

app.listen(port,()=>{
    console.log(`Server is running at port ${port}...`)
})