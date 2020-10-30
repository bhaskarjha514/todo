const express = require('express')
const connectDB = require('./config/db')

const app = express()
const PORT = process.env.PORT || 5000

app.use(express.json({ extended : true }))
app.use((req,res,next)=>{
    res.header("Access-Control-Allow-Origin","*");
    res.header("Access-Control-Allow-Headers","*")

    if(req.method === 'OPTIONS'){
        res.header('Access-Control-Allow-Methods','PUT, POST, PATCH, DELETE')
        return res.status(200).json({})
    }
    next();
})

// connect to database
connectDB()

// routes

app.use('/api/todo/',require('./routes/todo'))

app.listen(PORT , () => console.log(`Server running at ${PORT}`))