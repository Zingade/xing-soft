import React from 'react';
import Level from '../utils/LevelCustom'

const data1  = {
    delta: {monthly_2021:54698, overall_2021:68426, monthly_2020:2, overall_2020:3},
    total: {monthly_2021:197792, overall_2021:247432, monthly_2020:10, overall_2020:10},
}


function ExpenseAnalysisScreen(props) {

    return  <div style={{position: 'relative', marginTop: '1rem'}}> 
      <Level data={data1}/>
    </div>
}

export default ExpenseAnalysisScreen;