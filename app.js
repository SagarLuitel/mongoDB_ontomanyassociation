const express = require ("express")
const app = express()
const mongoose = require("mongoose")
const Blog = require("./models/blog")
const Category = require("./models/category")

mongoose.connect("mongodb+srv://db-user:Lp8CatEFy7mw2e64@cluster0.p0lde.mongodb.net/onetomany?retryWrites=true&w=majority",{ useNewUrlParser: true, useUnifiedTopology: true })
.then(result=>app.listen(4040))
.catch(err=>console.log("connection failed"))
app.use(express.json());

app.use(express.urlencoded({ extended: true }));




// route to create new blogs and then pouplate category as well
app.post("/blogs",(req,res)=>{
// works
const {name,description} = req.body;

Category.find({category:req.body.category}).then(data=>{
    if(data.length>0){
        Blog.create({name,description})
            .then(result=>{
                Blog.findByIdAndUpdate(result._id,{$push:{categories:(data[0]._id).toString()}},{ new: true})
                    .then(value=>{
                        res.json(value)
                    }).catch(err=>{
                        console.log(err)
                    })
            })
            .catch(err=>{
                res.json(err)
            })
    }
        
    else{
        Category.create({category:req.body.category})
            .then(data=>{
                const categories=data._id
                Blog.create({name,description,categories})
                    .then(result=>{
                        res.json(result)
                    }).catch(err=>{
                        res.json(err)
                    })
            }).catch(err=>{
                console.log(err)
            })
    }
        
}).catch(err=>
    console.log(err))



})

// route to create categories>>
// app.post("/cateory",(req,res)=>{
//     Category.create(req.body)
//     .then(result=>{
//         res.status(200).json("category saved")
//     }).catch(err=>{
//         res.status(400).json("failed")
//     })
// })

// route to all blogs
app.get("/blogs", function(req,res) {
    Blog.find().all()
    .then(result=>{
        res.status(200).json(result)
    }).catch(err=>{
        res.status(400).json("failed")
    })
  });

// route to all categories

app.get("/category", function(req,res) {
    Category.find().all()
    .then(result=>{
        res.status(200).json(result)
    }).catch(err=>{
        res.status(400).json("failed")
    })
  });

//route to get all blogs assocaited with specific category
  app.get("/blogs/:id", function(req,res) {
      console.log(req.params.id)
    Blog.findById({_id:req.params.id})
    .populate("categories")
    .then(result=>{
        res.status(200).json(result)
    }).catch(err=>{
        res.json(err)
    })
  });



