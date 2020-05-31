var express = require('express');
var xml2js = require("xml2js")
var model = require("../DBmodel/model")
var mongoose = require("mongoose")
var parser = new xml2js.Parser();
var router = express.Router();

router.get('/:limit/:page', function(req, res) {
    try{
        let {limit, page} = req.params
        limit = parseInt(limit);
        page = parseInt(page)-1;
        model.find({},{__v:0})
        .limit(limit).skip(page*limit)
        .then(val=>{
            res.send((JSON.stringify({code:200,data:val})));
        })
    }catch(e){
        res.send(e+"");
    }

});

router.post('/', function(req, res) {
//   console.log(req.body)
  try{
    if(req.body.name&&req.body.content){
      parser.parseStringPromise(req.body.content)
      .then((val,err)=>{
        model.insertMany([{name:req.body.name,content:req.body.content}]).then(val=>{
          // console.log(val)
          res.end(JSON.stringify({code:200,msg:"ok"}))
        })
      }).catch(e=>{
        res.end(JSON.stringify({code:400,msg:"content should be xml"}))
      })
          
    }else{
      res.end(JSON.stringify({code:400,msg:"no name"}))
    }
    
  }catch(e){
    res.end(e+"")
  }
});

router.put('/:id', function(req, res) {
//   console.log(req.body)
  try{
    let {id} = req.params
    id = mongoose.Types.ObjectId(id)
    if(req.body.name&&req.body.content){
      parser.parseStringPromise(req.body.content)
      .then((val,err)=>{
        model.findByIdAndUpdate(id,{name:req.body.name,content:req.body.content}).then(val=>{
          // console.log(val)
          res.end(JSON.stringify({code:200,msg:"ok"}))
        })
      }).catch(e=>{
        res.end(JSON.stringify({code:400,msg:"content should be xml"}))
      })
          
    }else{
      res.end(JSON.stringify({code:400,msg:"no name"}))
    }
    
  }catch(e){
    res.end(e+"")
  }
});

router.delete('/:id', function(req, res) {
//   console.log(req.body)
  try{
    let {id} = req.params
    id = mongoose.Types.ObjectId(id)
    if(req.body.name&&req.body.content){
      parser.parseStringPromise(req.body.content)
      .then((val,err)=>{
        model.findByIdAndRemove(id).then(val=>{
          // console.log(val)
          res.end(JSON.stringify({code:200,msg:"ok"}))
        })
      }).catch(e=>{
        res.end(JSON.stringify({code:400,msg:"content should be xml"}))
      })
          
    }else{
      res.end(JSON.stringify({code:400,msg:"no name"}))
    }
    
  }catch(e){
    res.end(e+"")
  }
});

module.exports = router;
