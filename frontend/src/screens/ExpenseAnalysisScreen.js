import React, { Suspense, useEffect } from 'react';
import {useDispatch, useSelector} from 'react-redux';
import { listExpenses } from '../actions/expenseActions';
import Level from '../utils/LevelCustom'
import LevelLineItem from '../utils/LevelLineItem'
import TableCustom from '../utils/TableCustom'
import {expenseDetails,summaryExpense} from '../constants/commonConstants'
import {analyisOfExpense} from '../utils/commonFunctions'


function ExpenseAnalysisScreen(props) {

  const expenseList = useSelector(state=>state.expenseList);
  const {loading, expenses, error} = expenseList;
  const dispatch = useDispatch();


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
      <>
      <div style={{position: 'relative', marginTop: '1rem'}}> 
      {analyisOfExpense(expenses)}
        <Level data={summaryExpense}/>
        <LevelLineItem amount={summaryExpense.current}/>
      </div>
        <div className="Home1">
          <div className='home-left'>
              <Suspense fallback={<div />}>
              <TableCustom
                  {...{
                    data:expenseDetails,
                  }}
                />
              </Suspense>
        </div>
      </div>
      </>
  )}
    </>   
  )
}
export default ExpenseAnalysisScreen;