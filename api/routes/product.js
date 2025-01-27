const router = require("express").Router();
const Product = require("../models/Product");
const {verifyToken, verifyTokenAndAuthorization, verifyTokenAndAdmin} = require("./verifyToken")


//[POST]/
router.post("/", verifyTokenAndAdmin, async (req, res) => {
    const newProduct = new Product(req.body);
  
    try {
      const savedProduct = await newProduct.save();
      res.status(200).json(savedProduct);
    } catch (err) {
      res.status(500).json(err);
    }
  });
//[PUT]/:id
router.put("/:id", verifyTokenAndAdmin, async (req, res) => {
    try {
      const updatedProduct = await Product.findByIdAndUpdate(req.params.id,
        {$set: req.body,},{ new: true });
      res.status(200).json(updatedProduct);
    } catch (err) {
      res.status(500).json(err);
    }
  });
//[DELETE]/:id
router.delete("/:id",verifyTokenAndAdmin,async (req,res)=>{
    try{
        await Product.findByIdAndDelete(req.params.id)
        res.status(200).json("Delete success")
    }
    catch(err){
        res.status(500).json(err);
    }
})

//[GET]/find/:id
router.get("/find/:id", async (req, res) => {
    try {
      const product = await Product.findById(req.params.id);
      res.status(200).json(product);
    } catch (err) {
      res.status(500).json(err);
    }
  });

//[GET]/ or [GET]?new=true
router.get("/",async (req,res)=>{
    const qNew = req.query.new;
    const qCategory=req.query.category;
    try{
        let products;
        // [GET]?new=true
        if(qNew){
            products = await Product.find().sort({createdAt: -1}).limit(1)
        }
        // [GET]?category=woman,tshirt,woman...
        else if(qCategory){
            products = await Product.find({categories:{
                $in:[qCategory]//qCategory exists in categories field
            }})
        }
        else{
            products = await Product.find();
        }
        res.status(200).json(products)
    }
    catch(err){
        res.status(500).json(err);
    }
})


module.exports = router