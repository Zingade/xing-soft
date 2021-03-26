import React, { useEffect, useState } from 'react';
import {useSelector, useDispatch} from 'react-redux';
import { deleteExpense, listExpenses, saveExpense } from '../actions/expenseActions';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import {format} from 'date-fns';

function ExpenseScreen(props) {
    const [modalVisible, setModalVisible] = useState(false);
    const [id, setId] = useState('');
    const [details, setDetails] = useState('');
    const [expenseDate, setExpenseDate] = useState(new Date());
    const [amount, setAmount] = useState('');
    const [card, setCardUsed] = useState(0);
    const [category, setCategory] = useState('');
    const [requiredType, setRequired] = useState('');
    const [occurance, setOccurance] = useState('');

    const expenseList = useSelector(state=>state.expenseList);
    const {loading, expenses, error} = expenseList;
    const expenseSave = useSelector(state=>state.expenseSave);
    const {loading:loadingSave, success: successSave, error:errorSave} = expenseSave;
    const expenseDelete = useSelector(state=>state.expenseDelete);
    const {loading:loadingDelete, success: successDelete, error:errorDelete} = expenseDelete;
    const dispatch = useDispatch();

    useEffect(()=>{
        if(successSave){
            setModalVisible(false);
        }
        dispatch(listExpenses());
        return () =>{
        };
    }, [successSave,successDelete]);

    const openModal = (expense) => {
        setModalVisible(true);
        setId(expense._id);
        setDetails(expense.details);
        setAmount(expense.amount);
        setCardUsed(expense.card);
        setExpenseDate(expense.expenseDate);
        setCategory(expense.category);
        setRequired(expense.requiredType);
        setOccurance(expense.occurance);
    }

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(saveExpense({_id:id, details, amount, expenseDate, card, category, requiredType,occurance}));
    }

    const deleteHandler = (expenseId) => {
        dispatch(deleteExpense(expenseId));
    }
    
    return  <div className="containt containt-margined"> 
    <div className="product-header">
        <h3>Expenses</h3>
        <button className="button primary" onClick ={()=>openModal({details:'',amount:'',card:'Zing Credit Card',expenseDate:new Date(),category:"Regular Expenses",requiredType:"Must",occurance:"Recursive"})}>New Expense</button>
    </div>
    {modalVisible && 
    <div className="form">
        <form onSubmit={submitHandler}>
            <ul className="form-container">
                <li>
                    <h2>New Expense</h2>
                </li>
                <li>
                    {(loadingSave||loading)&&<div>Loading...</div>}
                    {error&&<div>{error}</div>}
                    {errorSave&&<div>{errorSave}</div>}
                </li>
                <li>
                    <label htmlFor="details"> 
                    Expense Details:
                    </label>
                    <input type="text" value={details} name="details" id="details" onChange={(e)=>setDetails(e.target.value)}>
                    </input>
                </li>
                <li>
                    <label htmlFor="amount"> 
                    Amount:
                    </label>
                    <input type="text" value={amount} name="amount" id="amount" onChange={(e)=>setAmount(e.target.value)}>
                    </input>
                </li>
                <li>
                    <label htmlFor="expense_date"> 
                    Expense Date:
                    </label>
                    <DatePicker selected={new Date(expenseDate)} dateFormat="dd/MM/yyyy" onChange={date => setExpenseDate(date)} />
                </li>
                <li>
                    <label htmlFor="card-used"> 
                    Card Used:
                    </label>
                    <select value={card} name="card" id="card" onChange={(e)=>setCardUsed(e.target.value)}>
                        <option value="Zing Credit Card">Zing Credit Card</option>
                        <option value="Zing HDFC Dabit Card">Zing HDFC Dabit Card</option>
                        <option value="Zing Current Account">Zing Current Account</option>
                        <option  value="Zing IDFC Debit Card">Zing IDFC Debit Card</option>
                        <option  value="Pinky Debit Card">Pinky Debit Card</option>
                        <option value="Pinky Debit Card">Pinky Debit Card</option>
                        <option value="Saket Debit Card">Saket Debit Card</option>
                    </select>
                </li>
                <li>
                    <label htmlFor="category"> 
                    Expense Category:
                    </label>
                    <select value={category} name="cateogory" id="cateogory" onChange={(e)=>setCategory(e.target.value)}>
                        <option value="Regular Expenses">Regular Expenses</option>
                        <option value="Grocery">Grocery</option>
                        <option value="One Time">One Time</option>
                        <option  value="Clothing">Clothing</option>
                        <option  value="Hotel">Hotel</option>
                        <option value="Medical">Medical</option>
                        <option value="Local Transport">Local Transport</option>
                        <option value="Education">Education</option>
                        <option value="Donation">Donation</option>
                        <option value="Gift">Gift</option>
                        <option value="Travel">Travel</option>
                        <option value="Yearly">Yearly</option>
                    </select>
                </li>
                <li>
                    <label htmlFor="required"> 
                    Require Type:
                    </label>
                    <select value={requiredType} name="requiredType" id="requiredType" onChange={(e)=>setRequired(e.target.value)}>
                        <option value="Must">Must</option>
                        <option value="Nice">Nice</option>
                    </select>
                </li>
                <li>
                <label htmlFor="occurance"> 
                    Occurance Type:
                    </label>
                    <select value={occurance} name="occurance" id="occurance" onChange={(e)=>setOccurance(e.target.value)}>
                        <option value="Recursive">Recursive</option>
                        <option value="One Time">One Time</option>
                    </select>
                </li>
                <li>
                    <button type="submit" className="button primary">{id?"Update":"Create"}</button>
                </li>
                <li>
                    <button type="submit" onClick = {()=>setModalVisible(false)} className="button secondary">Back</button>
                </li>
            </ul>
        </form>
    </div>
    }
    <div className="expense-list">
        <table className="table">
            <thead>
                <tr>
                    <th>Sl no</th>
                    <th>Expense Details</th>
                    <th>Amount</th>
                    <th>Expense Date</th>
                    <th>Card Used</th>
                    <th>Cateogory</th>
                    <th>Required Type</th>
                    <th>Occurance Type</th>
                </tr>
            </thead>
            <tbody>
            {expenses.map((expense,count) => (
              <tr key={expense._id}>
                <td>{count+1}</td>
                <td>{expense.details}</td>
                <td>{expense.amount}</td>
                <td>{format(new Date(expense.expenseDate),"dd/MMM/yyyy")}</td>
                <td>{expense.card}</td>
                <td>{expense.category}</td>
                <td>{expense.requiredType}</td>
                <td>{expense.occurance}</td>
                <td>
                  <button onClick={()=>openModal(expense)} className="button">
                    Edit
                  </button>{' '}
                  <button onClick={()=>deleteHandler(expense._id)} className="button">
                    Delete
                  </button>
                </td>
              </tr>
            ))}
            </tbody>
        </table>
    </div>
    </div>
}

export default ExpenseScreen;