var express = require('express');
var model = require("../DBmodel/model")
var mongoose = require("mongoose")
var xpath = require("xpath")
var xmldom = require("xmldom").DOMParser
var router = express.Router();

router.post("/:id",(req,res)=>{
    try{
        let {id} = req.params
        id = mongoose.Types.ObjectId(id)
        model.findById(id,(err,val)=>{
            if(err){
                res.end(err+"")
            }
            let data=""
            if(val){
                let doc = new xmldom().parseFromString(val.content)
                let result = xpath.select(req.body.xpath,doc)
                for(item of result){
                    data+=item.toString()
                }
                console.log(data)
            }
            res.end(JSON.stringify({code:200,data}))
        })
    }catch(e){
        res.end(e+"")
    }
    
})
module.exports = router