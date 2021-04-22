import React, { useEffect } from 'react';
import {useDispatch, useSelector} from 'react-redux';
import { listExpenses } from '../actions/expenseActions';
import Level from '../utils/LevelCustom'

var startYear2021 = "2021-01-01T11:00:00.000+00:00";
var endYear2021 = "2021-12-31T11:00:00.000+00:00";
var startYear2020 = "2020-01-01T11:00:00.000+00:00";
var endYear2020 = "2020-12-31T11:00:00.000+00:00";
var startDate = "2021-04-01T11:00:00.000+00:00";
var endDate  = "2021-04-30T11:00:00.000+00:00";

var data1  = {
    delta: {monthly_2021:0, overall_2021:0, monthly_2020:0, overall_2020:0},
    total: {monthly_2021:0, overall_2021:0, monthly_2020:0, overall_2020:0},
}


function ExpenseAnalysisScreen(props) {

  const expenseList = useSelector(state=>state.expenseList);
  const {loading, expenses, error} = expenseList;
  const dispatch = useDispatch();

  const analyisOfExpense = () => {
    data1.delta.monthly_2021 = expenses
                            .filter((expense) => {return expense.expenseDate >= startDate && expense.expenseDate <= endDate && expense.frequency === "Monthly";})
                            .reduce((a,c) => a + 1 * c.amount, 0)
    data1.total.monthly_2021 = expenses
                            .filter((expense) => {return expense.expenseDate >= startYear2021 && expense.expenseDate <= endYear2021 && expense.frequency === "Monthly";})
                            .reduce((a,c) => a + 1 * c.amount, 0)
    data1.delta.overall_2021 = expenses
                            .filter((expense) => {return expense.expenseDate >= startDate && expense.expenseDate <= endDate;})
                            .reduce((a,c) => a + 1 * c.amount, 0)
    data1.total.overall_2021 = expenses
                            .filter((expense) => {return expense.expenseDate >= startYear2021 && expense.expenseDate <= endYear2021;})
                            .reduce((a,c) => a + 1 * c.amount, 0)
    data1.total.monthly_2020 = expenses
                            .filter((expense) => {return expense.expenseDate >= startYear2020 && expense.expenseDate <= endYear2020 && expense.frequency === "Monthly";})
                            .reduce((a,c) => a + 1 * c.amount, 0)
    data1.delta.monthly_2020 = data1.total.monthly_2020 / 12;
    data1.total.overall_2020 = expenses
                            .filter((expense) => {return expense.expenseDate >= startYear2020 && expense.expenseDate <= endYear2020;})
                            .reduce((a,c) => a + 1 * c.amount, 0)
    data1.delta.overall_2020 = data1.total.overall_2020 / 12;
}

  useEffect(()=>{
    dispatch(listExpenses());
    return () =>{
    };
  }, []);
  
      return ( 
      <>   
      {(loading) ? (
      <div>Loading...</div>
    ) : (error) ? (
      <div>{(error)}</div>
    ) : (
      <div style={{position: 'relative', marginTop: '1rem'}}> 
      {analyisOfExpense()}
        <Level data={data1}/>
      </div>
    )}
    </>   
  )
}
export default ExpenseAnalysisScreen;