const Todo = require("../models/Todo");
const {verifyTokenAndAdmin} = require("./verifyToken")
const router = require("express").Router()
//[POST]/
router.post("/", verifyTokenAndAdmin, async (req,res) =>{
    const {userId, action}= req.body;
    try {
        const isExisted = await Todo.exists({userId: userId})
        if(!isExisted){
            const newTodo = new Todo({
                userId,
                todos: [action]
            })
            newTodo.save()
            res.status(200).json(newTodo)
        }
        else{
            const todoUpdate = await Todo.findOneAndUpdate({userId:userId},
                {$push:{
                    todos: action
                }},{new: true})
            res.status(200).json(todoUpdate)
        }
    } catch (error) {
        res.status(500).json(error)
    }
})
//[DELETE]/:id
router.delete("/:id", verifyTokenAndAdmin, async(req, res) =>{
    const{userId} = req.body;
    console.log(userId)
    try {
        const deleteTodo = await Todo.findOneAndUpdate({userId: userId},
            {$pull:{
                todos:{_id: req.params.id}
            }

            },
            {new:true}
        )
        res.status(200).json(deleteTodo)
        
    } catch (error) {
        res.status(500).json(error)
    }
})
//[DELETE]/
router.delete("/", verifyTokenAndAdmin, async(req,res) =>{
    const query = req.query?.isFinished;
    console.log(query)
    const {userId} = req.body
    if(!query){
        try {
            const deleteAll = await Todo.findOneAndUpdate({userId: userId},
                {
                     todos: []
                }
            )
            res.status(200).json(deleteAll)
            
        } catch (error) {
            res.status(500).json(error)
        }    
    }
    else{
        try {
            const deleteFinished = await Todo.findOneAndUpdate({userId: userId},{
                $pull:{
                    todos:{isFinished: true}
                }
            },{new: true})
            res.status(200).json(deleteFinished)
        } catch (error) {
            res.status(500).json(error)
        }
    }
})
//[PUT]/:id
router.put("/:id", verifyTokenAndAdmin, async(req,res)=>{
    const {userId, action} = req.body;
    console.log(userId)
    console.log(action)
    try{
        const updateTodo = await Todo.findOneAndUpdate({userId:userId,"todos._id": req.params.id },
            {$set:
                {
                    'todos.$.todo' : action.todo,
                    'todos.$.isFinished' : action.isFinished
                }
            },
            {new: true}
        )
        res.status(200).json(updateTodo)
    }
    catch(err){
        res.status(500).json(err)
    }
})
//[GET]/
router.get("/:id", verifyTokenAndAdmin, async(req,res) =>{
    const userId = req.params.id;
    let isFinished = req.query?.isFinished;
    console.log(userId)
    if(isFinished === undefined){
        try {
            const getTodo = await Todo.findOne({userId: userId})
            res.status(200).json(getTodo)
        } catch (error) {
            res.status(500).json(error)
            
        }
    }
    else {
        isFinished = isFinished === "false"?false: true;
        try {
            const getFinished = await Todo.aggregate([
                {
                    $match: {userId: userId}
                },
                {
                    $project:{
                        _id: "$_id",
                        userId: "$userId",
                        todos:{
                            $filter:{
                                input: "$todos",
                                as: "item",
                                cond: {$eq: ["$$item.isFinished",isFinished]}
                            }
                        }
                    }
                }
            ])
            res.status(200).json(getFinished)
        } catch (error) {
            res.status(500).json(error)
        }
    }

})
module.exports = router