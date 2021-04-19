const express = require('express');
require('dotenv').config()
const Expense = require('../models/expenseModel')
const {isAuth, isAdmin} = require('../util');

const router = express.Router();

router.get('/', async (req, res) => {
    const expenses = await Expense.find({}).sort({"_id":-1});
    res.send(expenses);
  });
  
router.get('/:id', async (req, res) => {
    const expenseId = req.params.id;

    const expense = await Expense.findOne({_id:expenseId});
    if (expense) {
        res.send(expense);
    }
    else {
        res.status(404).send({msg:"Expense Not Found!"});
    }
});

router.post("/", isAuth, isAdmin, async (req, res)=>{
    const expense = new Expense({
        details: req.body.details,
        amount:req.body.amount,
        expenseDate:req.body.expenseDate,
        card:req.body.card,
        category:req.body.category,
        requiredType: req.body.requiredType,
        occurance: req.body.occurance,
    })
    const newExpense = await expense.save(); 
    if(newExpense){
        return res.status(200).send({message: 'New Expense is stored', data: newExpense});
    }
    return res.status(500).send({message:'Error storing expense in database!'});
})

router.put("/:id", isAuth, isAdmin, async (req, res)=>{
    const expenseId = req.params.id;
    const expense = await Expense.findOne({_id:expenseId});
    if(expense){
        expense.details = req.body.details;
        expense.amount = req.body.amount;
        expense.expenseDate = req.body.expenseDate;
        expense.card = req.body.card;
        expense.category = req.body.category;
        expense.requiredType = req.body.requiredType;
        expense.occurance = req.body.occurance;
        const updatedExpense = await expense.save();
        if(updatedExpense){
            return res.status(201).send({message:'Expense updated!', data:updatedExpense})
        }
        return res.status(500).send({message:'Error in updating Expense!'})
    }
})

router.delete("/:id", isAuth, isAdmin, async (req, res)=>{
    const expenseId = req.params.id;
    const expennse = await Expense.findOne({_id:expenseId});
    if(expennse){
        expennse.remove();
        res.send({message:"Expense Deleted!"});
    }
    else{
        res.send({message:"Error in Expense Deletion!"});
    }
})


module.exports = router;