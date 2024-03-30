const Order = require("../models/Order");
const dateSolving = require("../external_function/dateSolving")
const {
  verifyToken,
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin,
} = require("./verifyToken");
const dataSolving = require("../external_function/dateSolving");

const router = require("express").Router();

//[POST]/

router.post("/", verifyToken, async (req, res) => {
  console.log("Hello")
  const newOrder = new Order(req.body);

  try {
    const savedOrder = await newOrder.save();
    res.status(200).json(savedOrder);
  } catch (err) {
    res.status(500).json(err);
  }
});

//[PUT]/:id
router.put("/:id", verifyTokenAndAdmin, async (req, res) => {
  try {
    const updatedOrder = await Order.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json(updatedOrder);
  } catch (err) {
    res.status(500).json(err);
  }
});

//[DELETE]/:id
router.delete("/:id", verifyTokenAndAdmin, async (req, res) => {
  try {
    await Order.findByIdAndDelete(req.params.id);
    res.status(200).json("Order has been deleted...");
  } catch (err) {
    res.status(500).json(err);
  }
});

//[GET]/find/:userId
router.get("/find/:userId", verifyTokenAndAuthorization, async (req, res) => {
  try {
    const orders = await Order.find({ userId: req.params.userId });
    res.status(200).json(orders);
  } catch (err) {
    res.status(500).json(err);
  }
});

//[GET]/

router.get("/", verifyTokenAndAdmin, async (req, res) => {
  const isJoinUser = req.query?.joinUser;
  if(isJoinUser){
    try {
      const data = await Order.aggregate([
        {
            $lookup:
            {
                from: "users",
                let: {pid: "$userId"},
                pipeline:[
                    {
                        $match: {
                            $expr: {
                                $eq: ["$_id",{$toObjectId: "$$pid"}]
                            }
                        }
                    }
                ],
                as: "user_info"
            }
        },
        {
          "$unwind" :"$products"
      },
      {
          $lookup:
          {
              from: "products",
              let: {pid: "$products.productId"},
              pipeline:[
                  {
                      $match: {
                          $expr: {
                              $eq: ["$_id",{$toObjectId: "$$pid"}]
                          }
                      }
                  }
              ],
              as: "products_info"
          }
      },
      {
          "$group":{
              "_id" : "$_id",
              "products": {"$push" : "$products"},
              "createdAt" : {$first : "$createdAt"},
              "img_arr" : {"$push": "$products_info.img"},
              "quantity": {"$push" : "$products.quantity" },
              "amount" : {$first: "$amount"},
              "status": {$first: "$status"},
              "address" :{$first: "$address"},
              "user_info": {$first: "$user_info"}
          }
      }
    ])
    res.status(200).json(data)
    } catch (err) {
      res.status(500).json(err);
    }
    
  }
  else{
  try {
    const orders = await Order.find();
    res.status(200).json(orders);
  } catch (err) {
    res.status(500).json(err);
  }
}
});

//[GET]/income

router.get("/income", verifyTokenAndAdmin, async (req, res) => {
  const productId = req.query.pid
  const date = new Date();// vd: 1/4
  const lastMonth = dateSolving(date);
  const previousMonth=dateSolving(lastMonth);
    console.log(lastMonth," ",previousMonth,"  ",date)
  try {
    const income = await Order.aggregate([
      { $match: { createdAt: { $gte: previousMonth },...(productId &&{
        products: {$elemMatch:{productId: productId}}
      }) } },
      {
        $project: {
          month: { $month: "$createdAt" },
          sales: "$amount",
        },
      },
      {
        $group: {
          _id: "$month",
          total: { $sum: "$sales" },
        },
      },
    ]);
    console.log(income)
    res.status(200).json(income);
  } catch (err) {
    res.status(500).json(err);
  }
});

//[GET]/stats
router.get("/stats",verifyTokenAndAdmin, async (req, res) =>{
  const queryWeek = req.query?.isWeekday;
  console.log(queryWeek)
  if(queryWeek){
    function getMonday(d) {
      var day = d.getDay(),
          diff = d.getDate() - day + (day == 0 ? -6:1); // adjust when day is sunday
          d.setMinutes(0)
          d.setHours(0)
          d.setSeconds(1)
      return new Date(d.setDate(diff));
    }          
  const firstDay = getMonday(new Date())
  try {
    const data = await Order.aggregate([
      {$match: {createdAt :{$gt: firstDay} }},
      {$group: {
          _id :{$dateToString: {format: "%Y-%m-%d", date: "$createdAt"}},
          total_amount: {$sum:"$amount"}
      }},       
  ])
  console.log(data)
  res.status(200).json(data)
  } catch (err) {
  res.status(500).json(err)
  }
  }
})
module.exports = router;