const express = require('express')
const router = express.Router();
const ToDo = require('../model/todo')

router.get('/',async(req, res, next)=>{
    ToDo.find().exec().then(doc=>{
        if(doc.length>0) return res.status(200).json({success:true, message:doc, msg: "List of ToDO"})
        else return res.status(404).json({success:true, message: "ToDO Not Found", msg: doc})
    }).catch(err=>{
        return res.status(200).json({success:false, message:"Something went wrong", msg: err})
    })
})

router.get('/addTodo',async(req, res, next)=>{
    const todo = new ToDo({
        title:req.query.title,
        desc:req.query.desc,
    })
    await todo.save().then(result => {
        return res.status(200).json({success:true, message: "Todo Saved", msg: result})
    }).catch(err => {
        return res.status(400).json({success:false, message: "Couldn't save" ,msg: err})
    })
})

module.exports = router;