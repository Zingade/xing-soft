import {expenseDetails,summaryExpense} from '../constants/commonConstants'

export const capitalizeCustom = (s) => {
    if (typeof s !== 'string') return '';
    return s.charAt(0).toUpperCase() + s.slice(1);
  };
  
  const numberFormatter = new Intl.NumberFormat('en-IN', {
    maximumFractionDigits: 1,
  });
  
  
  export const formatNumberCustom = (value, option, statistic) => {
    value = Math.floor(value);
    return numberFormatter.format(value) + (option === '%' ? '%' : '');
  };
  
  export const analyisOfExpense = (expenses) => {

  var todaysDate = new Date();
  var todaysDateString = todaysDate.toISOString();
  var startOfCurrentYearString = `${todaysDate.getFullYear()}-01-01T11:00:00.000+00:00`;
  var endOfCurrentYearString = `${todaysDate.getFullYear()}-12-31T11:23:59.000+00:00`;
  var startOfPreviousYearString = `${todaysDate.getFullYear()-1}-01-01T11:00:00.000+00:00`;
  var endOfPreviousYearString = `${todaysDate.getFullYear()-1}-12-31T11:23:59.000+00:00`;

  var startOfCurrentYearForTime = new Date("01/01/2021");
  var startOFcurrentMonth =  new Date(`${todaysDate.getMonth()+1}/1/${todaysDate.getFullYear()}`)
  var startOFcurrentMonthString = startOFcurrentMonth.toISOString(); 

    // To calculate the time difference of two dates
  var Difference_In_Time = todaysDate.getTime() - startOfCurrentYearForTime.getTime();
  
  // To calculate the no. of days between two dates
  var Difference_In_Months = ((Difference_In_Time / (1000 * 3600 * 24))*12)/365;
  
  summaryExpense.total.monthly_2021 = expenses
                          .filter((expense) => {return expense.expenseDate >= startOfCurrentYearString && expense.expenseDate <= endOfCurrentYearString && expense.frequency === "Monthly";})
                          .reduce((a,c) => a + 1 * c.amount, 0)
  summaryExpense.delta.monthly_2021 = summaryExpense.total.monthly_2021 / Difference_In_Months;  
  summaryExpense.total.overall_2021 = expenses
                          .filter((expense) => {return expense.expenseDate >= startOfCurrentYearString && expense.expenseDate <= endOfCurrentYearString;})
                          .reduce((a,c) => a + 1 * c.amount, 0)
  summaryExpense.availableBalance = ((4267 * Difference_In_Time)/(1000 * 3600 * 24)) - summaryExpense.total.overall_2021; 
  summaryExpense.delta.overall_2021 = summaryExpense.total.overall_2021 / Difference_In_Months;  
  summaryExpense.total.monthly_2020 = expenses
                          .filter((expense) => {return expense.expenseDate >= startOfPreviousYearString && expense.expenseDate <= endOfPreviousYearString && expense.frequency === "Monthly";})
                          .reduce((a,c) => a + 1 * c.amount, 0)
  summaryExpense.delta.monthly_2020 = summaryExpense.total.monthly_2020 / 12;
  summaryExpense.total.overall_2020 = expenses
                          .filter((expense) => {return expense.expenseDate >= startOfPreviousYearString && expense.expenseDate <= endOfPreviousYearString;})
                          .reduce((a,c) => a + 1 * c.amount, 0)
  summaryExpense.delta.overall_2020 = summaryExpense.total.overall_2020 / 12;
  summaryExpense.current = expenses
  .filter((expense) => {return expense.expenseDate >= startOFcurrentMonthString && expense.expenseDate <= todaysDateString && expense.frequency === "Monthly";})
  .reduce((a,c) => a + 1 * c.amount, 0)

  expenseDetails.RM.total.monthly_2021 = expenses
  .filter((expense) => {return expense.expenseDate >= startOfCurrentYearString && expense.expenseDate <= todaysDateString && expense.frequency === "Monthly" && expense.category === "Regular Expenses";})
  .reduce((a,c) => a + 1 * c.amount, 0) 

  expenseDetails.RM.delta.monthly_2021 = expenses
  .filter((expense) => {return expense.expenseDate >= startOFcurrentMonthString && expense.expenseDate <= todaysDateString && expense.frequency === "Monthly" && expense.category === "Regular Expenses";})
  .reduce((a,c) => a + 1 * c.amount, 0) 

  expenseDetails.TT.total.monthly_2021 = expenseDetails.RM.total.monthly_2021;  
  expenseDetails.TT.delta.monthly_2021 = expenseDetails.RM.delta.monthly_2021;

  expenseDetails.GR.total.monthly_2021 = expenses
  .filter((expense) => {return expense.expenseDate >= startOfCurrentYearString && expense.expenseDate <= todaysDateString && expense.frequency === "Monthly" && expense.category === "Grocery";})
  .reduce((a,c) => a + 1 * c.amount, 0) 

  expenseDetails.GR.delta.monthly_2021 = expenses
  .filter((expense) => {return expense.expenseDate >= startOFcurrentMonthString && expense.expenseDate <= todaysDateString && expense.frequency === "Monthly" && expense.category === "Grocery";})
  .reduce((a,c) => a + 1 * c.amount, 0) 

  expenseDetails.TT.total.monthly_2021 += expenseDetails.GR.total.monthly_2021;  
  expenseDetails.TT.delta.monthly_2021 += expenseDetails.GR.delta.monthly_2021;

  expenseDetails.OT.total.monthly_2021 = expenses
  .filter((expense) => {return expense.expenseDate >= startOfCurrentYearString && expense.expenseDate <= todaysDateString && expense.frequency === "Monthly" && expense.category === "One Time";})
  .reduce((a,c) => a + 1 * c.amount, 0) 

  expenseDetails.OT.delta.monthly_2021 = expenses
  .filter((expense) => {return expense.expenseDate >= startOFcurrentMonthString && expense.expenseDate <= todaysDateString && expense.frequency === "Monthly" && expense.category === "One Time";})
  .reduce((a,c) => a + 1 * c.amount, 0) 

  expenseDetails.TT.total.monthly_2021 += expenseDetails.OT.total.monthly_2021;  
  expenseDetails.TT.delta.monthly_2021 += expenseDetails.OT.delta.monthly_2021;

  expenseDetails.CL.total.monthly_2021 = expenses
  .filter((expense) => {return expense.expenseDate >= startOfCurrentYearString && expense.expenseDate <= todaysDateString && expense.frequency === "Monthly" && expense.category === "Clothing";})
  .reduce((a,c) => a + 1 * c.amount, 0) 

  expenseDetails.CL.delta.monthly_2021 = expenses
  .filter((expense) => {return expense.expenseDate >= startOFcurrentMonthString && expense.expenseDate <= todaysDateString && expense.frequency === "Monthly" && expense.category === "Clothing";})
  .reduce((a,c) => a + 1 * c.amount, 0) 

  expenseDetails.TT.total.monthly_2021 += expenseDetails.CL.total.monthly_2021;  
  expenseDetails.TT.delta.monthly_2021 += expenseDetails.CL.delta.monthly_2021;

  expenseDetails.HO.total.monthly_2021 = expenses
  .filter((expense) => {return expense.expenseDate >= startOfCurrentYearString && expense.expenseDate <= todaysDateString && expense.frequency === "Monthly" && expense.category === "Hotel";})
  .reduce((a,c) => a + 1 * c.amount, 0) 

  expenseDetails.HO.delta.monthly_2021 = expenses
  .filter((expense) => {return expense.expenseDate >= startOFcurrentMonthString && expense.expenseDate <= todaysDateString && expense.frequency === "Monthly" && expense.category === "Hotel";})
  .reduce((a,c) => a + 1 * c.amount, 0) 

  expenseDetails.TT.total.monthly_2021 += expenseDetails.HO.total.monthly_2021;  
  expenseDetails.TT.delta.monthly_2021 += expenseDetails.HO.delta.monthly_2021;

  expenseDetails.ME.total.monthly_2021 = expenses
  .filter((expense) => {return expense.expenseDate >= startOfCurrentYearString && expense.expenseDate <= todaysDateString && expense.frequency === "Monthly" && expense.category === "Medical";})
  .reduce((a,c) => a + 1 * c.amount, 0) 

  expenseDetails.ME.delta.monthly_2021 = expenses
  .filter((expense) => {return expense.expenseDate >= startOFcurrentMonthString && expense.expenseDate <= todaysDateString && expense.frequency === "Monthly" && expense.category === "Medical";})
  .reduce((a,c) => a + 1 * c.amount, 0) 

  expenseDetails.TT.total.monthly_2021 += expenseDetails.ME.total.monthly_2021;  
  expenseDetails.TT.delta.monthly_2021 += expenseDetails.ME.delta.monthly_2021;

  expenseDetails.LT.total.monthly_2021 = expenses
  .filter((expense) => {return expense.expenseDate >= startOfCurrentYearString && expense.expenseDate <= todaysDateString && expense.frequency === "Monthly" && expense.category === "Local Transport";})
  .reduce((a,c) => a + 1 * c.amount, 0) 

  expenseDetails.LT.delta.monthly_2021 = expenses
  .filter((expense) => {return expense.expenseDate >= startOFcurrentMonthString && expense.expenseDate <= todaysDateString && expense.frequency === "Monthly" && expense.category === "Local Transport";})
  .reduce((a,c) => a + 1 * c.amount, 0) 

  expenseDetails.TT.total.monthly_2021 += expenseDetails.LT.total.monthly_2021;  
  expenseDetails.TT.delta.monthly_2021 += expenseDetails.LT.delta.monthly_2021;

  expenseDetails.ED.total.monthly_2021 = expenses
  .filter((expense) => {return expense.expenseDate >= startOfCurrentYearString && expense.expenseDate <= todaysDateString && expense.frequency === "Monthly" && expense.category === "Education";})
  .reduce((a,c) => a + 1 * c.amount, 0) 

  expenseDetails.ED.delta.monthly_2021 = expenses
  .filter((expense) => {return expense.expenseDate >= startOFcurrentMonthString && expense.expenseDate <= todaysDateString && expense.frequency === "Monthly" && expense.category === "Education";})
  .reduce((a,c) => a + 1 * c.amount, 0) 

  expenseDetails.TT.total.monthly_2021 += expenseDetails.ED.total.monthly_2021;  
  expenseDetails.TT.delta.monthly_2021 += expenseDetails.ED.delta.monthly_2021;

  expenseDetails.DO.total.monthly_2021 = expenses
  .filter((expense) => {return expense.expenseDate >= startOfCurrentYearString && expense.expenseDate <= todaysDateString && expense.frequency === "Monthly" && expense.category === "Donation";})
  .reduce((a,c) => a + 1 * c.amount, 0) 

  expenseDetails.DO.delta.monthly_2021 = expenses
  .filter((expense) => {return expense.expenseDate >= startOFcurrentMonthString && expense.expenseDate <= todaysDateString && expense.frequency === "Monthly" && expense.category === "Donation";})
  .reduce((a,c) => a + 1 * c.amount, 0) 

  expenseDetails.TT.total.monthly_2021 += expenseDetails.DO.total.monthly_2021;  
  expenseDetails.TT.delta.monthly_2021 += expenseDetails.DO.delta.monthly_2021;

  expenseDetails.GF.total.monthly_2021 = expenses
  .filter((expense) => {return expense.expenseDate >= startOfCurrentYearString && expense.expenseDate <= todaysDateString && expense.frequency === "Monthly" && expense.category === "Gift";})
  .reduce((a,c) => a + 1 * c.amount, 0) 

  expenseDetails.GF.delta.monthly_2021 = expenses
  .filter((expense) => {return expense.expenseDate >= startOFcurrentMonthString && expense.expenseDate <= todaysDateString && expense.frequency === "Monthly" && expense.category === "Gift";})
  .reduce((a,c) => a + 1 * c.amount, 0) 

  expenseDetails.TT.total.monthly_2021 += expenseDetails.GF.total.monthly_2021;  
  expenseDetails.TT.delta.monthly_2021 += expenseDetails.GF.delta.monthly_2021;

  expenseDetails.YR.total.monthly_2021 = expenses
  .filter((expense) => {return expense.expenseDate >= startOfCurrentYearString && expense.expenseDate <= todaysDateString && expense.frequency === "Monthly" && expense.category === "Yearly";})
  .reduce((a,c) => a + 1 * c.amount, 0) 

  expenseDetails.YR.delta.monthly_2021 = expenses
  .filter((expense) => {return expense.expenseDate >= startOFcurrentMonthString && expense.expenseDate <= todaysDateString && expense.frequency === "Monthly" && expense.category === "Yearly";})
  .reduce((a,c) => a + 1 * c.amount, 0) 

  expenseDetails.TT.total.monthly_2021 += expenseDetails.YR.total.monthly_2021;  
  expenseDetails.TT.delta.monthly_2021 += expenseDetails.YR.delta.monthly_2021;

  expenseDetails.TR.total.monthly_2021 = expenses
  .filter((expense) => {return expense.expenseDate >= startOfCurrentYearString && expense.expenseDate <= todaysDateString && expense.frequency === "Monthly" && expense.category === "Travel";})
  .reduce((a,c) => a + 1 * c.amount, 0) 

  expenseDetails.TR.delta.monthly_2021 = expenses
  .filter((expense) => {return expense.expenseDate >= startOFcurrentMonthString && expense.expenseDate <= todaysDateString && expense.frequency === "Monthly" && expense.category === "Travel";})
  .reduce((a,c) => a + 1 * c.amount, 0) 

  expenseDetails.TT.total.monthly_2021 += expenseDetails.TR.total.monthly_2021;  
  expenseDetails.TT.delta.monthly_2021 += expenseDetails.TR.delta.monthly_2021;

  expenseDetails.RM.total.monthly_2020 = expenses
  .filter((expense) => {return expense.expenseDate >= startOfPreviousYearString && expense.expenseDate <= endOfPreviousYearString && expense.frequency === "Monthly" && expense.category === "Regular Expenses";})
  .reduce((a,c) => a + 1 * c.amount, 0) 
  
  expenseDetails.TT.total.monthly_2020 = expenseDetails.RM.total.monthly_2020;  
  
  expenseDetails.GR.total.monthly_2020 = expenses
  .filter((expense) => {return expense.expenseDate >= startOfPreviousYearString && expense.expenseDate <= endOfPreviousYearString && expense.frequency === "Monthly" && expense.category === "Grocery";})
  .reduce((a,c) => a + 1 * c.amount, 0) 
  
  expenseDetails.TT.total.monthly_2020 += expenseDetails.GR.total.monthly_2020;  
  
  expenseDetails.OT.total.monthly_2020 = expenses
  .filter((expense) => {return expense.expenseDate >= startOfPreviousYearString && expense.expenseDate <= endOfPreviousYearString && expense.frequency === "Monthly" && expense.category === "One Time";})
  .reduce((a,c) => a + 1 * c.amount, 0) 
  
  expenseDetails.TT.total.monthly_2020 += expenseDetails.OT.total.monthly_2020;  
  
  expenseDetails.CL.total.monthly_2020 = expenses
  .filter((expense) => {return expense.expenseDate >= startOfPreviousYearString && expense.expenseDate <= endOfPreviousYearString && expense.frequency === "Monthly" && expense.category === "Clothing";})
  .reduce((a,c) => a + 1 * c.amount, 0) 
  
  expenseDetails.TT.total.monthly_2020 += expenseDetails.CL.total.monthly_2020;  
  
  expenseDetails.HO.total.monthly_2020 = expenses
  .filter((expense) => {return expense.expenseDate >= startOfPreviousYearString && expense.expenseDate <= endOfPreviousYearString && expense.frequency === "Monthly" && expense.category === "Hotel";})
  .reduce((a,c) => a + 1 * c.amount, 0) 
  
  expenseDetails.TT.total.monthly_2020 += expenseDetails.HO.total.monthly_2020;  
  
  expenseDetails.ME.total.monthly_2020 = expenses
  .filter((expense) => {return expense.expenseDate >= startOfPreviousYearString && expense.expenseDate <= endOfPreviousYearString && expense.frequency === "Monthly" && expense.category === "Medical";})
  .reduce((a,c) => a + 1 * c.amount, 0) 
  
  expenseDetails.TT.total.monthly_2020 += expenseDetails.ME.total.monthly_2020;  
  
  expenseDetails.LT.total.monthly_2020 = expenses
  .filter((expense) => {return expense.expenseDate >= startOfPreviousYearString && expense.expenseDate <= endOfPreviousYearString && expense.frequency === "Monthly" && expense.category === "Local Transport";})
  .reduce((a,c) => a + 1 * c.amount, 0) 
  
  expenseDetails.TT.total.monthly_2020 += expenseDetails.LT.total.monthly_2020;  
  
  expenseDetails.ED.total.monthly_2020 = expenses
  .filter((expense) => {return expense.expenseDate >= startOfPreviousYearString && expense.expenseDate <= endOfPreviousYearString && expense.frequency === "Monthly" && expense.category === "Education";})
  .reduce((a,c) => a + 1 * c.amount, 0) 
  
  expenseDetails.TT.total.monthly_2020 += expenseDetails.ED.total.monthly_2020;  
  
  expenseDetails.DO.total.monthly_2020 = expenses
  .filter((expense) => {return expense.expenseDate >= startOfPreviousYearString && expense.expenseDate <= endOfPreviousYearString && expense.frequency === "Monthly" && expense.category === "Donation";})
  .reduce((a,c) => a + 1 * c.amount, 0) 
  
  expenseDetails.TT.total.monthly_2020 += expenseDetails.DO.total.monthly_2020;  
  
  expenseDetails.GF.total.monthly_2020 = expenses
  .filter((expense) => {return expense.expenseDate >= startOfPreviousYearString && expense.expenseDate <= endOfPreviousYearString && expense.frequency === "Monthly" && expense.category === "Gift";})
  .reduce((a,c) => a + 1 * c.amount, 0) 
  
  expenseDetails.TT.total.monthly_2020 += expenseDetails.GF.total.monthly_2020;  
  
  expenseDetails.YR.total.monthly_2020 = expenses
  .filter((expense) => {return expense.expenseDate >= startOfPreviousYearString && expense.expenseDate <= endOfPreviousYearString && expense.frequency === "Monthly" && expense.category === "Yearly";})
  .reduce((a,c) => a + 1 * c.amount, 0) 
  
  expenseDetails.TT.total.monthly_2020 += expenseDetails.YR.total.monthly_2020;  
  
  expenseDetails.TR.total.monthly_2020 = expenses
  .filter((expense) => {return expense.expenseDate >= startOfPreviousYearString && expense.expenseDate <= endOfPreviousYearString && expense.frequency === "Monthly" && expense.category === "Travel";})
  .reduce((a,c) => a + 1 * c.amount, 0) 
  
  expenseDetails.TT.total.monthly_2020 += expenseDetails.TR.total.monthly_2020;  
  expenseDetails.RM.total.recursive = expenses
  .filter((expense) => {return expense.expenseDate >= startOfCurrentYearString && expense.expenseDate <= todaysDateString && expense.frequency === "Monthly" && expense.category === "Regular Expenses";})
  .reduce((a,c) => a + 1 * c.amount, 0) 
  
  expenseDetails.RM.total.recursive = expenses
  .filter((expense) => {return expense.expenseDate >= startOfCurrentYearString && expense.expenseDate <= todaysDateString && expense.frequency === "Monthly" && expense.category === "Regular Expenses" && expense.occurance === "Recursive";})
  .reduce((a,c) => a + 1 * c.amount, 0) 
  
  expenseDetails.RM.delta.recursive = expenses
  .filter((expense) => {return expense.expenseDate >= startOFcurrentMonthString && expense.expenseDate <= todaysDateString && expense.frequency === "Monthly" && expense.category === "Regular Expenses" && expense.occurance === "Recursive";})
  .reduce((a,c) => a + 1 * c.amount, 0) 
  
  expenseDetails.TT.total.recursive = expenseDetails.RM.total.recursive;  
  expenseDetails.TT.delta.recursive = expenseDetails.RM.delta.recursive;
  
  expenseDetails.GR.total.recursive = expenses
  .filter((expense) => {return expense.expenseDate >= startOfCurrentYearString && expense.expenseDate <= todaysDateString && expense.frequency === "Monthly" && expense.category === "Grocery" && expense.occurance === "Recursive";})
  .reduce((a,c) => a + 1 * c.amount, 0) 
  
  expenseDetails.GR.delta.recursive = expenses
  .filter((expense) => {return expense.expenseDate >= startOFcurrentMonthString && expense.expenseDate <= todaysDateString && expense.frequency === "Monthly" && expense.category === "Grocery" && expense.occurance === "Recursive";})
  .reduce((a,c) => a + 1 * c.amount, 0) 
  
  expenseDetails.TT.total.recursive += expenseDetails.GR.total.recursive;  
  expenseDetails.TT.delta.recursive += expenseDetails.GR.delta.recursive;
  
  expenseDetails.OT.total.recursive = expenses
  .filter((expense) => {return expense.expenseDate >= startOfCurrentYearString && expense.expenseDate <= todaysDateString && expense.frequency === "Monthly" && expense.category === "One Time" && expense.occurance === "Recursive";})
  .reduce((a,c) => a + 1 * c.amount, 0) 
  
  expenseDetails.OT.delta.recursive = expenses
  .filter((expense) => {return expense.expenseDate >= startOFcurrentMonthString && expense.expenseDate <= todaysDateString && expense.frequency === "Monthly" && expense.category === "One Time" && expense.occurance === "Recursive";})
  .reduce((a,c) => a + 1 * c.amount, 0) 
  
  expenseDetails.TT.total.recursive += expenseDetails.OT.total.recursive;  
  expenseDetails.TT.delta.recursive += expenseDetails.OT.delta.recursive;
  
  expenseDetails.CL.total.recursive = expenses
  .filter((expense) => {return expense.expenseDate >= startOfCurrentYearString && expense.expenseDate <= todaysDateString && expense.frequency === "Monthly" && expense.category === "Clothing" && expense.occurance === "Recursive";})
  .reduce((a,c) => a + 1 * c.amount, 0) 
  
  expenseDetails.CL.delta.recursive = expenses
  .filter((expense) => {return expense.expenseDate >= startOFcurrentMonthString && expense.expenseDate <= todaysDateString && expense.frequency === "Monthly" && expense.category === "Clothing" && expense.occurance === "Recursive";})
  .reduce((a,c) => a + 1 * c.amount, 0) 
  
  expenseDetails.TT.total.recursive += expenseDetails.CL.total.recursive;  
  expenseDetails.TT.delta.recursive += expenseDetails.CL.delta.recursive;
  
  expenseDetails.HO.total.recursive = expenses
  .filter((expense) => {return expense.expenseDate >= startOfCurrentYearString && expense.expenseDate <= todaysDateString && expense.frequency === "Monthly" && expense.category === "Hotel" && expense.occurance === "Recursive";})
  .reduce((a,c) => a + 1 * c.amount, 0) 
  
  expenseDetails.HO.delta.recursive = expenses
  .filter((expense) => {return expense.expenseDate >= startOFcurrentMonthString && expense.expenseDate <= todaysDateString && expense.frequency === "Monthly" && expense.category === "Hotel" && expense.occurance === "Recursive";})
  .reduce((a,c) => a + 1 * c.amount, 0) 
  
  expenseDetails.TT.total.recursive += expenseDetails.HO.total.recursive;  
  expenseDetails.TT.delta.recursive += expenseDetails.HO.delta.recursive;
  
  expenseDetails.ME.total.recursive = expenses
  .filter((expense) => {return expense.expenseDate >= startOfCurrentYearString && expense.expenseDate <= todaysDateString && expense.frequency === "Monthly" && expense.category === "Medical" && expense.occurance === "Recursive";})
  .reduce((a,c) => a + 1 * c.amount, 0) 
  
  expenseDetails.ME.delta.recursive = expenses
  .filter((expense) => {return expense.expenseDate >= startOFcurrentMonthString && expense.expenseDate <= todaysDateString && expense.frequency === "Monthly" && expense.category === "Medical" && expense.occurance === "Recursive";})
  .reduce((a,c) => a + 1 * c.amount, 0) 
  
  expenseDetails.TT.total.recursive += expenseDetails.ME.total.recursive;  
  expenseDetails.TT.delta.recursive += expenseDetails.ME.delta.recursive;
  
  expenseDetails.LT.total.recursive = expenses
  .filter((expense) => {return expense.expenseDate >= startOfCurrentYearString && expense.expenseDate <= todaysDateString && expense.frequency === "Monthly" && expense.category === "Local Transport" && expense.occurance === "Recursive";})
  .reduce((a,c) => a + 1 * c.amount, 0) 
  
  expenseDetails.LT.delta.recursive = expenses
  .filter((expense) => {return expense.expenseDate >= startOFcurrentMonthString && expense.expenseDate <= todaysDateString && expense.frequency === "Monthly" && expense.category === "Local Transport" && expense.occurance === "Recursive";})
  .reduce((a,c) => a + 1 * c.amount, 0) 
  
  expenseDetails.TT.total.recursive += expenseDetails.LT.total.recursive;  
  expenseDetails.TT.delta.recursive += expenseDetails.LT.delta.recursive;
  
  expenseDetails.ED.total.recursive = expenses
  .filter((expense) => {return expense.expenseDate >= startOfCurrentYearString && expense.expenseDate <= todaysDateString && expense.frequency === "Monthly" && expense.category === "Education" && expense.occurance === "Recursive";})
  .reduce((a,c) => a + 1 * c.amount, 0) 
  
  expenseDetails.ED.delta.recursive = expenses
  .filter((expense) => {return expense.expenseDate >= startOFcurrentMonthString && expense.expenseDate <= todaysDateString && expense.frequency === "Monthly" && expense.category === "Education" && expense.occurance === "Recursive";})
  .reduce((a,c) => a + 1 * c.amount, 0) 
  
  expenseDetails.TT.total.recursive += expenseDetails.ED.total.recursive;  
  expenseDetails.TT.delta.recursive += expenseDetails.ED.delta.recursive;
  
  expenseDetails.DO.total.recursive = expenses
  .filter((expense) => {return expense.expenseDate >= startOfCurrentYearString && expense.expenseDate <= todaysDateString && expense.frequency === "Monthly" && expense.category === "Donation" && expense.occurance === "Recursive";})
  .reduce((a,c) => a + 1 * c.amount, 0) 
  
  expenseDetails.DO.delta.recursive = expenses
  .filter((expense) => {return expense.expenseDate >= startOFcurrentMonthString && expense.expenseDate <= todaysDateString && expense.frequency === "Monthly" && expense.category === "Donation" && expense.occurance === "Recursive";})
  .reduce((a,c) => a + 1 * c.amount, 0) 
  
  expenseDetails.TT.total.recursive += expenseDetails.DO.total.recursive;  
  expenseDetails.TT.delta.recursive += expenseDetails.DO.delta.recursive;
  
  expenseDetails.GF.total.recursive = expenses
  .filter((expense) => {return expense.expenseDate >= startOfCurrentYearString && expense.expenseDate <= todaysDateString && expense.frequency === "Monthly" && expense.category === "Gift" && expense.occurance === "Recursive";})
  .reduce((a,c) => a + 1 * c.amount, 0) 
  
  expenseDetails.GF.delta.recursive = expenses
  .filter((expense) => {return expense.expenseDate >= startOFcurrentMonthString && expense.expenseDate <= todaysDateString && expense.frequency === "Monthly" && expense.category === "Gift" && expense.occurance === "Recursive";})
  .reduce((a,c) => a + 1 * c.amount, 0) 
  
  expenseDetails.TT.total.recursive += expenseDetails.GF.total.recursive;  
  expenseDetails.TT.delta.recursive += expenseDetails.GF.delta.recursive;
  
  expenseDetails.YR.total.recursive = expenses
  .filter((expense) => {return expense.expenseDate >= startOfCurrentYearString && expense.expenseDate <= todaysDateString && expense.frequency === "Monthly" && expense.category === "Yearly" && expense.occurance === "Recursive";})
  .reduce((a,c) => a + 1 * c.amount, 0) 
  
  expenseDetails.YR.delta.recursive = expenses
  .filter((expense) => {return expense.expenseDate >= startOFcurrentMonthString && expense.expenseDate <= todaysDateString && expense.frequency === "Monthly" && expense.category === "Yearly" && expense.occurance === "Recursive";})
  .reduce((a,c) => a + 1 * c.amount, 0) 
  
  expenseDetails.TT.total.recursive += expenseDetails.YR.total.recursive;  
  expenseDetails.TT.delta.recursive += expenseDetails.YR.delta.recursive;
  
  expenseDetails.TR.total.recursive = expenses
  .filter((expense) => {return expense.expenseDate >= startOfCurrentYearString && expense.expenseDate <= todaysDateString && expense.frequency === "Monthly" && expense.category === "Travel" && expense.occurance === "Recursive";})
  .reduce((a,c) => a + 1 * c.amount, 0) 
  
  expenseDetails.TR.delta.recursive = expenses
  .filter((expense) => {return expense.expenseDate >= startOFcurrentMonthString && expense.expenseDate <= todaysDateString && expense.frequency === "Monthly" && expense.category === "Travel" && expense.occurance === "Recursive";})
  .reduce((a,c) => a + 1 * c.amount, 0) 
  
  expenseDetails.TT.total.recursive += expenseDetails.TR.total.recursive;  
  expenseDetails.TT.delta.recursive += expenseDetails.TR.delta.recursive;

  expenseDetails.RM.total.onetime = expenses
  .filter((expense) => {return expense.expenseDate >= startOfCurrentYearString && expense.expenseDate <= todaysDateString && expense.frequency === "Monthly" && expense.category === "Regular Expenses" && expense.occurance === "One Time";})
  .reduce((a,c) => a + 1 * c.amount, 0) 
  
  expenseDetails.RM.delta.onetime = expenses
  .filter((expense) => {return expense.expenseDate >= startOFcurrentMonthString && expense.expenseDate <= todaysDateString && expense.frequency === "Monthly" && expense.category === "Regular Expenses" && expense.occurance === "One Time";})
  .reduce((a,c) => a + 1 * c.amount, 0) 
  
  expenseDetails.TT.total.onetime = expenseDetails.RM.total.onetime;  
  expenseDetails.TT.delta.onetime = expenseDetails.RM.delta.onetime;
  
  expenseDetails.GR.total.onetime = expenses
  .filter((expense) => {return expense.expenseDate >= startOfCurrentYearString && expense.expenseDate <= todaysDateString && expense.frequency === "Monthly" && expense.category === "Grocery" && expense.occurance === "One Time";})
  .reduce((a,c) => a + 1 * c.amount, 0) 
  
  expenseDetails.GR.delta.onetime = expenses
  .filter((expense) => {return expense.expenseDate >= startOFcurrentMonthString && expense.expenseDate <= todaysDateString && expense.frequency === "Monthly" && expense.category === "Grocery" && expense.occurance === "One Time";})
  .reduce((a,c) => a + 1 * c.amount, 0) 
  
  expenseDetails.TT.total.onetime += expenseDetails.GR.total.onetime;  
  expenseDetails.TT.delta.onetime += expenseDetails.GR.delta.onetime;
  
  expenseDetails.OT.total.onetime = expenses
  .filter((expense) => {return expense.expenseDate >= startOfCurrentYearString && expense.expenseDate <= todaysDateString && expense.frequency === "Monthly" && expense.category === "One Time" && expense.occurance === "One Time";})
  .reduce((a,c) => a + 1 * c.amount, 0) 
  
  expenseDetails.OT.delta.onetime = expenses
  .filter((expense) => {return expense.expenseDate >= startOFcurrentMonthString && expense.expenseDate <= todaysDateString && expense.frequency === "Monthly" && expense.category === "One Time" && expense.occurance === "One Time";})
  .reduce((a,c) => a + 1 * c.amount, 0) 
  
  expenseDetails.TT.total.onetime += expenseDetails.OT.total.onetime;  
  expenseDetails.TT.delta.onetime += expenseDetails.OT.delta.onetime;
  
  expenseDetails.CL.total.onetime = expenses
  .filter((expense) => {return expense.expenseDate >= startOfCurrentYearString && expense.expenseDate <= todaysDateString && expense.frequency === "Monthly" && expense.category === "Clothing" && expense.occurance === "One Time";})
  .reduce((a,c) => a + 1 * c.amount, 0) 
  
  expenseDetails.CL.delta.onetime = expenses
  .filter((expense) => {return expense.expenseDate >= startOFcurrentMonthString && expense.expenseDate <= todaysDateString && expense.frequency === "Monthly" && expense.category === "Clothing" && expense.occurance === "One Time";})
  .reduce((a,c) => a + 1 * c.amount, 0) 
  
  expenseDetails.TT.total.onetime += expenseDetails.CL.total.onetime;  
  expenseDetails.TT.delta.onetime += expenseDetails.CL.delta.onetime;
  
  expenseDetails.HO.total.onetime = expenses
  .filter((expense) => {return expense.expenseDate >= startOfCurrentYearString && expense.expenseDate <= todaysDateString && expense.frequency === "Monthly" && expense.category === "Hotel" && expense.occurance === "One Time";})
  .reduce((a,c) => a + 1 * c.amount, 0) 
  
  expenseDetails.HO.delta.onetime = expenses
  .filter((expense) => {return expense.expenseDate >= startOFcurrentMonthString && expense.expenseDate <= todaysDateString && expense.frequency === "Monthly" && expense.category === "Hotel" && expense.occurance === "One Time";})
  .reduce((a,c) => a + 1 * c.amount, 0) 
  
  expenseDetails.TT.total.onetime += expenseDetails.HO.total.onetime;  
  expenseDetails.TT.delta.onetime += expenseDetails.HO.delta.onetime;
  
  expenseDetails.ME.total.onetime = expenses
  .filter((expense) => {return expense.expenseDate >= startOfCurrentYearString && expense.expenseDate <= todaysDateString && expense.frequency === "Monthly" && expense.category === "Medical" && expense.occurance === "One Time";})
  .reduce((a,c) => a + 1 * c.amount, 0) 
  
  expenseDetails.ME.delta.onetime = expenses
  .filter((expense) => {return expense.expenseDate >= startOFcurrentMonthString && expense.expenseDate <= todaysDateString && expense.frequency === "Monthly" && expense.category === "Medical" && expense.occurance === "One Time";})
  .reduce((a,c) => a + 1 * c.amount, 0) 
  
  expenseDetails.TT.total.onetime += expenseDetails.ME.total.onetime;  
  expenseDetails.TT.delta.onetime += expenseDetails.ME.delta.onetime;
  
  expenseDetails.LT.total.onetime = expenses
  .filter((expense) => {return expense.expenseDate >= startOfCurrentYearString && expense.expenseDate <= todaysDateString && expense.frequency === "Monthly" && expense.category === "Local Transport" && expense.occurance === "One Time";})
  .reduce((a,c) => a + 1 * c.amount, 0) 
  
  expenseDetails.LT.delta.onetime = expenses
  .filter((expense) => {return expense.expenseDate >= startOFcurrentMonthString && expense.expenseDate <= todaysDateString && expense.frequency === "Monthly" && expense.category === "Local Transport" && expense.occurance === "One Time";})
  .reduce((a,c) => a + 1 * c.amount, 0) 
  
  expenseDetails.TT.total.onetime += expenseDetails.LT.total.onetime;  
  expenseDetails.TT.delta.onetime += expenseDetails.LT.delta.onetime;
  
  expenseDetails.ED.total.onetime = expenses
  .filter((expense) => {return expense.expenseDate >= startOfCurrentYearString && expense.expenseDate <= todaysDateString && expense.frequency === "Monthly" && expense.category === "Education" && expense.occurance === "One Time";})
  .reduce((a,c) => a + 1 * c.amount, 0) 
  
  expenseDetails.ED.delta.onetime = expenses
  .filter((expense) => {return expense.expenseDate >= startOFcurrentMonthString && expense.expenseDate <= todaysDateString && expense.frequency === "Monthly" && expense.category === "Education" && expense.occurance === "One Time";})
  .reduce((a,c) => a + 1 * c.amount, 0) 
  
  expenseDetails.TT.total.onetime += expenseDetails.ED.total.onetime;  
  expenseDetails.TT.delta.onetime += expenseDetails.ED.delta.onetime;
  
  expenseDetails.DO.total.onetime = expenses
  .filter((expense) => {return expense.expenseDate >= startOfCurrentYearString && expense.expenseDate <= todaysDateString && expense.frequency === "Monthly" && expense.category === "Donation" && expense.occurance === "One Time";})
  .reduce((a,c) => a + 1 * c.amount, 0) 
  
  expenseDetails.DO.delta.onetime = expenses
  .filter((expense) => {return expense.expenseDate >= startOFcurrentMonthString && expense.expenseDate <= todaysDateString && expense.frequency === "Monthly" && expense.category === "Donation" && expense.occurance === "One Time";})
  .reduce((a,c) => a + 1 * c.amount, 0) 
  
  expenseDetails.TT.total.onetime += expenseDetails.DO.total.onetime;  
  expenseDetails.TT.delta.onetime += expenseDetails.DO.delta.onetime;
  
  expenseDetails.GF.total.onetime = expenses
  .filter((expense) => {return expense.expenseDate >= startOfCurrentYearString && expense.expenseDate <= todaysDateString && expense.frequency === "Monthly" && expense.category === "Gift" && expense.occurance === "One Time";})
  .reduce((a,c) => a + 1 * c.amount, 0) 
  
  expenseDetails.GF.delta.onetime = expenses
  .filter((expense) => {return expense.expenseDate >= startOFcurrentMonthString && expense.expenseDate <= todaysDateString && expense.frequency === "Monthly" && expense.category === "Gift" && expense.occurance === "One Time";})
  .reduce((a,c) => a + 1 * c.amount, 0) 
  
  expenseDetails.TT.total.onetime += expenseDetails.GF.total.onetime;  
  expenseDetails.TT.delta.onetime += expenseDetails.GF.delta.onetime;
  
  expenseDetails.YR.total.onetime = expenses
  .filter((expense) => {return expense.expenseDate >= startOfCurrentYearString && expense.expenseDate <= todaysDateString && expense.frequency === "Monthly" && expense.category === "Yearly" && expense.occurance === "One Time";})
  .reduce((a,c) => a + 1 * c.amount, 0) 
  
  expenseDetails.YR.delta.onetime = expenses
  .filter((expense) => {return expense.expenseDate >= startOFcurrentMonthString && expense.expenseDate <= todaysDateString && expense.frequency === "Monthly" && expense.category === "Yearly" && expense.occurance === "One Time";})
  .reduce((a,c) => a + 1 * c.amount, 0) 
  
  expenseDetails.TT.total.onetime += expenseDetails.YR.total.onetime;  
  expenseDetails.TT.delta.onetime += expenseDetails.YR.delta.onetime;
  
  expenseDetails.TR.total.onetime = expenses
  .filter((expense) => {return expense.expenseDate >= startOfCurrentYearString && expense.expenseDate <= todaysDateString && expense.frequency === "Monthly" && expense.category === "Travel" && expense.occurance === "One Time";})
  .reduce((a,c) => a + 1 * c.amount, 0) 
  
  expenseDetails.TR.delta.onetime = expenses
  .filter((expense) => {return expense.expenseDate >= startOFcurrentMonthString && expense.expenseDate <= todaysDateString && expense.frequency === "Monthly" && expense.category === "Travel" && expense.occurance === "One Time";})
  .reduce((a,c) => a + 1 * c.amount, 0) 
  
  expenseDetails.TT.total.onetime += expenseDetails.TR.total.onetime;  
  expenseDetails.TT.delta.onetime += expenseDetails.TR.delta.onetime;

  expenseDetails.RM.total.must = expenses
  .filter((expense) => {return expense.expenseDate >= startOfCurrentYearString && expense.expenseDate <= todaysDateString && expense.frequency === "Monthly" && expense.category === "Regular Expenses" && expense.requiredType === "Must";})
  .reduce((a,c) => a + 1 * c.amount, 0) 
  
  expenseDetails.RM.delta.must = expenses
  .filter((expense) => {return expense.expenseDate >= startOFcurrentMonthString && expense.expenseDate <= todaysDateString && expense.frequency === "Monthly" && expense.category === "Regular Expenses" && expense.requiredType === "Must";})
  .reduce((a,c) => a + 1 * c.amount, 0) 
  
  expenseDetails.TT.total.must = expenseDetails.RM.total.must;  
  expenseDetails.TT.delta.must = expenseDetails.RM.delta.must;
  
  expenseDetails.GR.total.must = expenses
  .filter((expense) => {return expense.expenseDate >= startOfCurrentYearString && expense.expenseDate <= todaysDateString && expense.frequency === "Monthly" && expense.category === "Grocery" && expense.requiredType === "Must";})
  .reduce((a,c) => a + 1 * c.amount, 0) 
  
  expenseDetails.GR.delta.must = expenses
  .filter((expense) => {return expense.expenseDate >= startOFcurrentMonthString && expense.expenseDate <= todaysDateString && expense.frequency === "Monthly" && expense.category === "Grocery" && expense.requiredType === "Must";})
  .reduce((a,c) => a + 1 * c.amount, 0) 
  
  expenseDetails.TT.total.must += expenseDetails.GR.total.must;  
  expenseDetails.TT.delta.must += expenseDetails.GR.delta.must;
  
  expenseDetails.OT.total.must = expenses
  .filter((expense) => {return expense.expenseDate >= startOfCurrentYearString && expense.expenseDate <= todaysDateString && expense.frequency === "Monthly" && expense.category === "One Time" && expense.requiredType === "Must";})
  .reduce((a,c) => a + 1 * c.amount, 0) 
  
  expenseDetails.OT.delta.must = expenses
  .filter((expense) => {return expense.expenseDate >= startOFcurrentMonthString && expense.expenseDate <= todaysDateString && expense.frequency === "Monthly" && expense.category === "One Time" && expense.requiredType === "Must";})
  .reduce((a,c) => a + 1 * c.amount, 0) 
  
  expenseDetails.TT.total.must += expenseDetails.OT.total.must;  
  expenseDetails.TT.delta.must += expenseDetails.OT.delta.must;
  
  expenseDetails.CL.total.must = expenses
  .filter((expense) => {return expense.expenseDate >= startOfCurrentYearString && expense.expenseDate <= todaysDateString && expense.frequency === "Monthly" && expense.category === "Clothing" && expense.requiredType === "Must";})
  .reduce((a,c) => a + 1 * c.amount, 0) 
  
  expenseDetails.CL.delta.must = expenses
  .filter((expense) => {return expense.expenseDate >= startOFcurrentMonthString && expense.expenseDate <= todaysDateString && expense.frequency === "Monthly" && expense.category === "Clothing" && expense.requiredType === "Must";})
  .reduce((a,c) => a + 1 * c.amount, 0) 
  
  expenseDetails.TT.total.must += expenseDetails.CL.total.must;  
  expenseDetails.TT.delta.must += expenseDetails.CL.delta.must;
  
  expenseDetails.HO.total.must = expenses
  .filter((expense) => {return expense.expenseDate >= startOfCurrentYearString && expense.expenseDate <= todaysDateString && expense.frequency === "Monthly" && expense.category === "Hotel" && expense.requiredType === "Must";})
  .reduce((a,c) => a + 1 * c.amount, 0) 
  
  expenseDetails.HO.delta.must = expenses
  .filter((expense) => {return expense.expenseDate >= startOFcurrentMonthString && expense.expenseDate <= todaysDateString && expense.frequency === "Monthly" && expense.category === "Hotel" && expense.requiredType === "Must";})
  .reduce((a,c) => a + 1 * c.amount, 0) 
  
  expenseDetails.TT.total.must += expenseDetails.HO.total.must;  
  expenseDetails.TT.delta.must += expenseDetails.HO.delta.must;
  
  expenseDetails.ME.total.must = expenses
  .filter((expense) => {return expense.expenseDate >= startOfCurrentYearString && expense.expenseDate <= todaysDateString && expense.frequency === "Monthly" && expense.category === "Medical" && expense.requiredType === "Must";})
  .reduce((a,c) => a + 1 * c.amount, 0) 
  
  expenseDetails.ME.delta.must = expenses
  .filter((expense) => {return expense.expenseDate >= startOFcurrentMonthString && expense.expenseDate <= todaysDateString && expense.frequency === "Monthly" && expense.category === "Medical" && expense.requiredType === "Must";})
  .reduce((a,c) => a + 1 * c.amount, 0) 
  
  expenseDetails.TT.total.must += expenseDetails.ME.total.must;  
  expenseDetails.TT.delta.must += expenseDetails.ME.delta.must;
  
  expenseDetails.LT.total.must = expenses
  .filter((expense) => {return expense.expenseDate >= startOfCurrentYearString && expense.expenseDate <= todaysDateString && expense.frequency === "Monthly" && expense.category === "Local Transport" && expense.requiredType === "Must";})
  .reduce((a,c) => a + 1 * c.amount, 0) 
  
  expenseDetails.LT.delta.must = expenses
  .filter((expense) => {return expense.expenseDate >= startOFcurrentMonthString && expense.expenseDate <= todaysDateString && expense.frequency === "Monthly" && expense.category === "Local Transport" && expense.requiredType === "Must";})
  .reduce((a,c) => a + 1 * c.amount, 0) 
  
  expenseDetails.TT.total.must += expenseDetails.LT.total.must;  
  expenseDetails.TT.delta.must += expenseDetails.LT.delta.must;
  
  expenseDetails.ED.total.must = expenses
  .filter((expense) => {return expense.expenseDate >= startOfCurrentYearString && expense.expenseDate <= todaysDateString && expense.frequency === "Monthly" && expense.category === "Education" && expense.requiredType === "Must";})
  .reduce((a,c) => a + 1 * c.amount, 0) 
  
  expenseDetails.ED.delta.must = expenses
  .filter((expense) => {return expense.expenseDate >= startOFcurrentMonthString && expense.expenseDate <= todaysDateString && expense.frequency === "Monthly" && expense.category === "Education" && expense.requiredType === "Must";})
  .reduce((a,c) => a + 1 * c.amount, 0) 
  
  expenseDetails.TT.total.must += expenseDetails.ED.total.must;  
  expenseDetails.TT.delta.must += expenseDetails.ED.delta.must;
  
  expenseDetails.DO.total.must = expenses
  .filter((expense) => {return expense.expenseDate >= startOfCurrentYearString && expense.expenseDate <= todaysDateString && expense.frequency === "Monthly" && expense.category === "Donation" && expense.requiredType === "Must";})
  .reduce((a,c) => a + 1 * c.amount, 0) 
  
  expenseDetails.DO.delta.must = expenses
  .filter((expense) => {return expense.expenseDate >= startOFcurrentMonthString && expense.expenseDate <= todaysDateString && expense.frequency === "Monthly" && expense.category === "Donation" && expense.requiredType === "Must";})
  .reduce((a,c) => a + 1 * c.amount, 0) 
  
  expenseDetails.TT.total.must += expenseDetails.DO.total.must;  
  expenseDetails.TT.delta.must += expenseDetails.DO.delta.must;
  
  expenseDetails.GF.total.must = expenses
  .filter((expense) => {return expense.expenseDate >= startOfCurrentYearString && expense.expenseDate <= todaysDateString && expense.frequency === "Monthly" && expense.category === "Gift" && expense.requiredType === "Must";})
  .reduce((a,c) => a + 1 * c.amount, 0) 
  
  expenseDetails.GF.delta.must = expenses
  .filter((expense) => {return expense.expenseDate >= startOFcurrentMonthString && expense.expenseDate <= todaysDateString && expense.frequency === "Monthly" && expense.category === "Gift" && expense.requiredType === "Must";})
  .reduce((a,c) => a + 1 * c.amount, 0) 
  
  expenseDetails.TT.total.must += expenseDetails.GF.total.must;  
  expenseDetails.TT.delta.must += expenseDetails.GF.delta.must;
  
  expenseDetails.YR.total.must = expenses
  .filter((expense) => {return expense.expenseDate >= startOfCurrentYearString && expense.expenseDate <= todaysDateString && expense.frequency === "Monthly" && expense.category === "Yearly" && expense.requiredType === "Must";})
  .reduce((a,c) => a + 1 * c.amount, 0) 
  
  expenseDetails.YR.delta.must = expenses
  .filter((expense) => {return expense.expenseDate >= startOFcurrentMonthString && expense.expenseDate <= todaysDateString && expense.frequency === "Monthly" && expense.category === "Yearly" && expense.requiredType === "Must";})
  .reduce((a,c) => a + 1 * c.amount, 0) 
  
  expenseDetails.TT.total.must += expenseDetails.YR.total.must;  
  expenseDetails.TT.delta.must += expenseDetails.YR.delta.must;
  
  expenseDetails.TR.total.must = expenses
  .filter((expense) => {return expense.expenseDate >= startOfCurrentYearString && expense.expenseDate <= todaysDateString && expense.frequency === "Monthly" && expense.category === "Travel" && expense.requiredType === "Must";})
  .reduce((a,c) => a + 1 * c.amount, 0) 
  
  expenseDetails.TR.delta.must = expenses
  .filter((expense) => {return expense.expenseDate >= startOFcurrentMonthString && expense.expenseDate <= todaysDateString && expense.frequency === "Monthly" && expense.category === "Travel" && expense.requiredType === "Must";})
  .reduce((a,c) => a + 1 * c.amount, 0) 
  
  expenseDetails.TT.total.must += expenseDetails.TR.total.must;  
  expenseDetails.TT.delta.must += expenseDetails.TR.delta.must;
  
  expenseDetails.RM.total.nice = expenses
  .filter((expense) => {return expense.expenseDate >= startOfCurrentYearString && expense.expenseDate <= todaysDateString && expense.frequency === "Monthly" && expense.category === "Regular Expenses" && expense.requiredType === "Nice";})
  .reduce((a,c) => a + 1 * c.amount, 0) 
  
  expenseDetails.RM.delta.nice = expenses
  .filter((expense) => {return expense.expenseDate >= startOFcurrentMonthString && expense.expenseDate <= todaysDateString && expense.frequency === "Monthly" && expense.category === "Regular Expenses" && expense.requiredType === "Nice";})
  .reduce((a,c) => a + 1 * c.amount, 0) 
  
  expenseDetails.TT.total.nice = expenseDetails.RM.total.nice;  
  expenseDetails.TT.delta.nice = expenseDetails.RM.delta.nice;
  
  expenseDetails.GR.total.nice = expenses
  .filter((expense) => {return expense.expenseDate >= startOfCurrentYearString && expense.expenseDate <= todaysDateString && expense.frequency === "Monthly" && expense.category === "Grocery" && expense.requiredType === "Nice";})
  .reduce((a,c) => a + 1 * c.amount, 0) 
  
  expenseDetails.GR.delta.nice = expenses
  .filter((expense) => {return expense.expenseDate >= startOFcurrentMonthString && expense.expenseDate <= todaysDateString && expense.frequency === "Monthly" && expense.category === "Grocery" && expense.requiredType === "Nice";})
  .reduce((a,c) => a + 1 * c.amount, 0) 
  
  expenseDetails.TT.total.nice += expenseDetails.GR.total.nice;  
  expenseDetails.TT.delta.nice += expenseDetails.GR.delta.nice;
  
  expenseDetails.OT.total.nice = expenses
  .filter((expense) => {return expense.expenseDate >= startOfCurrentYearString && expense.expenseDate <= todaysDateString && expense.frequency === "Monthly" && expense.category === "One Time" && expense.requiredType === "Nice";})
  .reduce((a,c) => a + 1 * c.amount, 0) 
  
  expenseDetails.OT.delta.nice = expenses
  .filter((expense) => {return expense.expenseDate >= startOFcurrentMonthString && expense.expenseDate <= todaysDateString && expense.frequency === "Monthly" && expense.category === "One Time" && expense.requiredType === "Nice";})
  .reduce((a,c) => a + 1 * c.amount, 0) 
  
  expenseDetails.TT.total.nice += expenseDetails.OT.total.nice;  
  expenseDetails.TT.delta.nice += expenseDetails.OT.delta.nice;
  
  expenseDetails.CL.total.nice = expenses
  .filter((expense) => {return expense.expenseDate >= startOfCurrentYearString && expense.expenseDate <= todaysDateString && expense.frequency === "Monthly" && expense.category === "Clothing" && expense.requiredType === "Nice";})
  .reduce((a,c) => a + 1 * c.amount, 0) 
  
  expenseDetails.CL.delta.nice = expenses
  .filter((expense) => {return expense.expenseDate >= startOFcurrentMonthString && expense.expenseDate <= todaysDateString && expense.frequency === "Monthly" && expense.category === "Clothing" && expense.requiredType === "Nice";})
  .reduce((a,c) => a + 1 * c.amount, 0) 
  
  expenseDetails.TT.total.nice += expenseDetails.CL.total.nice;  
  expenseDetails.TT.delta.nice += expenseDetails.CL.delta.nice;
  
  expenseDetails.HO.total.nice = expenses
  .filter((expense) => {return expense.expenseDate >= startOfCurrentYearString && expense.expenseDate <= todaysDateString && expense.frequency === "Monthly" && expense.category === "Hotel" && expense.requiredType === "Nice";})
  .reduce((a,c) => a + 1 * c.amount, 0) 
  
  expenseDetails.HO.delta.nice = expenses
  .filter((expense) => {return expense.expenseDate >= startOFcurrentMonthString && expense.expenseDate <= todaysDateString && expense.frequency === "Monthly" && expense.category === "Hotel" && expense.requiredType === "Nice";})
  .reduce((a,c) => a + 1 * c.amount, 0) 
  
  expenseDetails.TT.total.nice += expenseDetails.HO.total.nice;  
  expenseDetails.TT.delta.nice += expenseDetails.HO.delta.nice;
  
  expenseDetails.ME.total.nice = expenses
  .filter((expense) => {return expense.expenseDate >= startOfCurrentYearString && expense.expenseDate <= todaysDateString && expense.frequency === "Monthly" && expense.category === "Medical" && expense.requiredType === "Nice";})
  .reduce((a,c) => a + 1 * c.amount, 0) 
  
  expenseDetails.ME.delta.nice = expenses
  .filter((expense) => {return expense.expenseDate >= startOFcurrentMonthString && expense.expenseDate <= todaysDateString && expense.frequency === "Monthly" && expense.category === "Medical" && expense.requiredType === "Nice";})
  .reduce((a,c) => a + 1 * c.amount, 0) 
  
  expenseDetails.TT.total.nice += expenseDetails.ME.total.nice;  
  expenseDetails.TT.delta.nice += expenseDetails.ME.delta.nice;
  
  expenseDetails.LT.total.nice = expenses
  .filter((expense) => {return expense.expenseDate >= startOfCurrentYearString && expense.expenseDate <= todaysDateString && expense.frequency === "Monthly" && expense.category === "Local Transport" && expense.requiredType === "Nice";})
  .reduce((a,c) => a + 1 * c.amount, 0) 
  
  expenseDetails.LT.delta.nice = expenses
  .filter((expense) => {return expense.expenseDate >= startOFcurrentMonthString && expense.expenseDate <= todaysDateString && expense.frequency === "Monthly" && expense.category === "Local Transport" && expense.requiredType === "Nice";})
  .reduce((a,c) => a + 1 * c.amount, 0) 
  
  expenseDetails.TT.total.nice += expenseDetails.LT.total.nice;  
  expenseDetails.TT.delta.nice += expenseDetails.LT.delta.nice;
  
  expenseDetails.ED.total.nice = expenses
  .filter((expense) => {return expense.expenseDate >= startOfCurrentYearString && expense.expenseDate <= todaysDateString && expense.frequency === "Monthly" && expense.category === "Education" && expense.requiredType === "Nice";})
  .reduce((a,c) => a + 1 * c.amount, 0) 
  
  expenseDetails.ED.delta.nice = expenses
  .filter((expense) => {return expense.expenseDate >= startOFcurrentMonthString && expense.expenseDate <= todaysDateString && expense.frequency === "Monthly" && expense.category === "Education" && expense.requiredType === "Nice";})
  .reduce((a,c) => a + 1 * c.amount, 0) 
  
  expenseDetails.TT.total.nice += expenseDetails.ED.total.nice;  
  expenseDetails.TT.delta.nice += expenseDetails.ED.delta.nice;
  
  expenseDetails.DO.total.nice = expenses
  .filter((expense) => {return expense.expenseDate >= startOfCurrentYearString && expense.expenseDate <= todaysDateString && expense.frequency === "Monthly" && expense.category === "Donation" && expense.requiredType === "Nice";})
  .reduce((a,c) => a + 1 * c.amount, 0) 
  
  expenseDetails.DO.delta.nice = expenses
  .filter((expense) => {return expense.expenseDate >= startOFcurrentMonthString && expense.expenseDate <= todaysDateString && expense.frequency === "Monthly" && expense.category === "Donation" && expense.requiredType === "Nice";})
  .reduce((a,c) => a + 1 * c.amount, 0) 
  
  expenseDetails.TT.total.nice += expenseDetails.DO.total.nice;  
  expenseDetails.TT.delta.nice += expenseDetails.DO.delta.nice;
  
  expenseDetails.GF.total.nice = expenses
  .filter((expense) => {return expense.expenseDate >= startOfCurrentYearString && expense.expenseDate <= todaysDateString && expense.frequency === "Monthly" && expense.category === "Gift" && expense.requiredType === "Nice";})
  .reduce((a,c) => a + 1 * c.amount, 0) 
  
  expenseDetails.GF.delta.nice = expenses
  .filter((expense) => {return expense.expenseDate >= startOFcurrentMonthString && expense.expenseDate <= todaysDateString && expense.frequency === "Monthly" && expense.category === "Gift" && expense.requiredType === "Nice";})
  .reduce((a,c) => a + 1 * c.amount, 0) 
  
  expenseDetails.TT.total.nice += expenseDetails.GF.total.nice;  
  expenseDetails.TT.delta.nice += expenseDetails.GF.delta.nice;
  
  expenseDetails.YR.total.nice = expenses
  .filter((expense) => {return expense.expenseDate >= startOfCurrentYearString && expense.expenseDate <= todaysDateString && expense.frequency === "Monthly" && expense.category === "Yearly" && expense.requiredType === "Nice";})
  .reduce((a,c) => a + 1 * c.amount, 0) 
  
  expenseDetails.YR.delta.nice = expenses
  .filter((expense) => {return expense.expenseDate >= startOFcurrentMonthString && expense.expenseDate <= todaysDateString && expense.frequency === "Monthly" && expense.category === "Yearly" && expense.requiredType === "Nice";})
  .reduce((a,c) => a + 1 * c.amount, 0) 
  
  expenseDetails.TT.total.nice += expenseDetails.YR.total.nice;  
  expenseDetails.TT.delta.nice += expenseDetails.YR.delta.nice;
  
  expenseDetails.TR.total.nice = expenses
  .filter((expense) => {return expense.expenseDate >= startOfCurrentYearString && expense.expenseDate <= todaysDateString && expense.frequency === "Monthly" && expense.category === "Travel" && expense.requiredType === "Nice";})
  .reduce((a,c) => a + 1 * c.amount, 0) 
  
  expenseDetails.TR.delta.nice = expenses
  .filter((expense) => {return expense.expenseDate >= startOFcurrentMonthString && expense.expenseDate <= todaysDateString && expense.frequency === "Monthly" && expense.category === "Travel" && expense.requiredType === "Nice";})
  .reduce((a,c) => a + 1 * c.amount, 0) 
  
  expenseDetails.TT.total.nice += expenseDetails.TR.total.nice;  
  expenseDetails.TT.delta.nice += expenseDetails.TR.delta.nice;

  expenseDetails.RM.total.zing_cc = expenses
  .filter((expense) => {return expense.expenseDate >= startOfCurrentYearString && expense.expenseDate <= todaysDateString && expense.frequency === "Monthly" && expense.category === "Regular Expenses" && expense.card === "Zing Credit Card";})
  .reduce((a,c) => a + 1 * c.amount, 0) 
  
  expenseDetails.RM.delta.zing_cc = expenses
  .filter((expense) => {return expense.expenseDate >= startOFcurrentMonthString && expense.expenseDate <= todaysDateString && expense.frequency === "Monthly" && expense.category === "Regular Expenses" && expense.card === "Zing Credit Card";})
  .reduce((a,c) => a + 1 * c.amount, 0) 
  
  expenseDetails.TT.total.zing_cc = expenseDetails.RM.total.zing_cc;  
  expenseDetails.TT.delta.zing_cc = expenseDetails.RM.delta.zing_cc;
  
  expenseDetails.GR.total.zing_cc = expenses
  .filter((expense) => {return expense.expenseDate >= startOfCurrentYearString && expense.expenseDate <= todaysDateString && expense.frequency === "Monthly" && expense.category === "Grocery" && expense.card === "Zing Credit Card";})
  .reduce((a,c) => a + 1 * c.amount, 0) 
  
  expenseDetails.GR.delta.zing_cc = expenses
  .filter((expense) => {return expense.expenseDate >= startOFcurrentMonthString && expense.expenseDate <= todaysDateString && expense.frequency === "Monthly" && expense.category === "Grocery" && expense.card === "Zing Credit Card";})
  .reduce((a,c) => a + 1 * c.amount, 0) 
  
  expenseDetails.TT.total.zing_cc += expenseDetails.GR.total.zing_cc;  
  expenseDetails.TT.delta.zing_cc += expenseDetails.GR.delta.zing_cc;
  
  expenseDetails.OT.total.zing_cc = expenses
  .filter((expense) => {return expense.expenseDate >= startOfCurrentYearString && expense.expenseDate <= todaysDateString && expense.frequency === "Monthly" && expense.category === "One Time" && expense.card === "Zing Credit Card";})
  .reduce((a,c) => a + 1 * c.amount, 0) 
  
  expenseDetails.OT.delta.zing_cc = expenses
  .filter((expense) => {return expense.expenseDate >= startOFcurrentMonthString && expense.expenseDate <= todaysDateString && expense.frequency === "Monthly" && expense.category === "One Time" && expense.card === "Zing Credit Card";})
  .reduce((a,c) => a + 1 * c.amount, 0) 
  
  expenseDetails.TT.total.zing_cc += expenseDetails.OT.total.zing_cc;  
  expenseDetails.TT.delta.zing_cc += expenseDetails.OT.delta.zing_cc;
  
  expenseDetails.CL.total.zing_cc = expenses
  .filter((expense) => {return expense.expenseDate >= startOfCurrentYearString && expense.expenseDate <= todaysDateString && expense.frequency === "Monthly" && expense.category === "Clothing" && expense.card === "Zing Credit Card";})
  .reduce((a,c) => a + 1 * c.amount, 0) 
  
  expenseDetails.CL.delta.zing_cc = expenses
  .filter((expense) => {return expense.expenseDate >= startOFcurrentMonthString && expense.expenseDate <= todaysDateString && expense.frequency === "Monthly" && expense.category === "Clothing" && expense.card === "Zing Credit Card";})
  .reduce((a,c) => a + 1 * c.amount, 0) 
  
  expenseDetails.TT.total.zing_cc += expenseDetails.CL.total.zing_cc;  
  expenseDetails.TT.delta.zing_cc += expenseDetails.CL.delta.zing_cc;
  
  expenseDetails.HO.total.zing_cc = expenses
  .filter((expense) => {return expense.expenseDate >= startOfCurrentYearString && expense.expenseDate <= todaysDateString && expense.frequency === "Monthly" && expense.category === "Hotel" && expense.card === "Zing Credit Card";})
  .reduce((a,c) => a + 1 * c.amount, 0) 
  
  expenseDetails.HO.delta.zing_cc = expenses
  .filter((expense) => {return expense.expenseDate >= startOFcurrentMonthString && expense.expenseDate <= todaysDateString && expense.frequency === "Monthly" && expense.category === "Hotel" && expense.card === "Zing Credit Card";})
  .reduce((a,c) => a + 1 * c.amount, 0) 
  
  expenseDetails.TT.total.zing_cc += expenseDetails.HO.total.zing_cc;  
  expenseDetails.TT.delta.zing_cc += expenseDetails.HO.delta.zing_cc;
  
  expenseDetails.ME.total.zing_cc = expenses
  .filter((expense) => {return expense.expenseDate >= startOfCurrentYearString && expense.expenseDate <= todaysDateString && expense.frequency === "Monthly" && expense.category === "Medical" && expense.card === "Zing Credit Card";})
  .reduce((a,c) => a + 1 * c.amount, 0) 
  
  expenseDetails.ME.delta.zing_cc = expenses
  .filter((expense) => {return expense.expenseDate >= startOFcurrentMonthString && expense.expenseDate <= todaysDateString && expense.frequency === "Monthly" && expense.category === "Medical" && expense.card === "Zing Credit Card";})
  .reduce((a,c) => a + 1 * c.amount, 0) 
  
  expenseDetails.TT.total.zing_cc += expenseDetails.ME.total.zing_cc;  
  expenseDetails.TT.delta.zing_cc += expenseDetails.ME.delta.zing_cc;
  
  expenseDetails.LT.total.zing_cc = expenses
  .filter((expense) => {return expense.expenseDate >= startOfCurrentYearString && expense.expenseDate <= todaysDateString && expense.frequency === "Monthly" && expense.category === "Local Transport" && expense.card === "Zing Credit Card";})
  .reduce((a,c) => a + 1 * c.amount, 0) 
  
  expenseDetails.LT.delta.zing_cc = expenses
  .filter((expense) => {return expense.expenseDate >= startOFcurrentMonthString && expense.expenseDate <= todaysDateString && expense.frequency === "Monthly" && expense.category === "Local Transport" && expense.card === "Zing Credit Card";})
  .reduce((a,c) => a + 1 * c.amount, 0) 
  
  expenseDetails.TT.total.zing_cc += expenseDetails.LT.total.zing_cc;  
  expenseDetails.TT.delta.zing_cc += expenseDetails.LT.delta.zing_cc;
  
  expenseDetails.ED.total.zing_cc = expenses
  .filter((expense) => {return expense.expenseDate >= startOfCurrentYearString && expense.expenseDate <= todaysDateString && expense.frequency === "Monthly" && expense.category === "Education" && expense.card === "Zing Credit Card";})
  .reduce((a,c) => a + 1 * c.amount, 0) 
  
  expenseDetails.ED.delta.zing_cc = expenses
  .filter((expense) => {return expense.expenseDate >= startOFcurrentMonthString && expense.expenseDate <= todaysDateString && expense.frequency === "Monthly" && expense.category === "Education" && expense.card === "Zing Credit Card";})
  .reduce((a,c) => a + 1 * c.amount, 0) 
  
  expenseDetails.TT.total.zing_cc += expenseDetails.ED.total.zing_cc;  
  expenseDetails.TT.delta.zing_cc += expenseDetails.ED.delta.zing_cc;
  
  expenseDetails.DO.total.zing_cc = expenses
  .filter((expense) => {return expense.expenseDate >= startOfCurrentYearString && expense.expenseDate <= todaysDateString && expense.frequency === "Monthly" && expense.category === "Donation" && expense.card === "Zing Credit Card";})
  .reduce((a,c) => a + 1 * c.amount, 0) 
  
  expenseDetails.DO.delta.zing_cc = expenses
  .filter((expense) => {return expense.expenseDate >= startOFcurrentMonthString && expense.expenseDate <= todaysDateString && expense.frequency === "Monthly" && expense.category === "Donation" && expense.card === "Zing Credit Card";})
  .reduce((a,c) => a + 1 * c.amount, 0) 
  
  expenseDetails.TT.total.zing_cc += expenseDetails.DO.total.zing_cc;  
  expenseDetails.TT.delta.zing_cc += expenseDetails.DO.delta.zing_cc;
  
  expenseDetails.GF.total.zing_cc = expenses
  .filter((expense) => {return expense.expenseDate >= startOfCurrentYearString && expense.expenseDate <= todaysDateString && expense.frequency === "Monthly" && expense.category === "Gift" && expense.card === "Zing Credit Card";})
  .reduce((a,c) => a + 1 * c.amount, 0) 
  
  expenseDetails.GF.delta.zing_cc = expenses
  .filter((expense) => {return expense.expenseDate >= startOFcurrentMonthString && expense.expenseDate <= todaysDateString && expense.frequency === "Monthly" && expense.category === "Gift" && expense.card === "Zing Credit Card";})
  .reduce((a,c) => a + 1 * c.amount, 0) 
  
  expenseDetails.TT.total.zing_cc += expenseDetails.GF.total.zing_cc;  
  expenseDetails.TT.delta.zing_cc += expenseDetails.GF.delta.zing_cc;
  
  expenseDetails.YR.total.zing_cc = expenses
  .filter((expense) => {return expense.expenseDate >= startOfCurrentYearString && expense.expenseDate <= todaysDateString && expense.frequency === "Monthly" && expense.category === "Yearly" && expense.card === "Zing Credit Card";})
  .reduce((a,c) => a + 1 * c.amount, 0) 
  
  expenseDetails.YR.delta.zing_cc = expenses
  .filter((expense) => {return expense.expenseDate >= startOFcurrentMonthString && expense.expenseDate <= todaysDateString && expense.frequency === "Monthly" && expense.category === "Yearly" && expense.card === "Zing Credit Card";})
  .reduce((a,c) => a + 1 * c.amount, 0) 
  
  expenseDetails.TT.total.zing_cc += expenseDetails.YR.total.zing_cc;  
  expenseDetails.TT.delta.zing_cc += expenseDetails.YR.delta.zing_cc;
  
  expenseDetails.TR.total.zing_cc = expenses
  .filter((expense) => {return expense.expenseDate >= startOfCurrentYearString && expense.expenseDate <= todaysDateString && expense.frequency === "Monthly" && expense.category === "Travel" && expense.card === "Zing Credit Card";})
  .reduce((a,c) => a + 1 * c.amount, 0) 
  
  expenseDetails.TR.delta.zing_cc = expenses
  .filter((expense) => {return expense.expenseDate >= startOFcurrentMonthString && expense.expenseDate <= todaysDateString && expense.frequency === "Monthly" && expense.category === "Travel" && expense.card === "Zing Credit Card";})
  .reduce((a,c) => a + 1 * c.amount, 0) 
  
  expenseDetails.TT.total.zing_cc += expenseDetails.TR.total.zing_cc;  
  expenseDetails.TT.delta.zing_cc += expenseDetails.TR.delta.zing_cc;
  
  expenseDetails.RM.total.zing_current = expenses
  .filter((expense) => {return expense.expenseDate >= startOfCurrentYearString && expense.expenseDate <= todaysDateString && expense.frequency === "Monthly" && expense.category === "Regular Expenses" && expense.card === "Zing Current Account";})
  .reduce((a,c) => a + 1 * c.amount, 0) 
  
  expenseDetails.RM.delta.zing_current = expenses
  .filter((expense) => {return expense.expenseDate >= startOFcurrentMonthString && expense.expenseDate <= todaysDateString && expense.frequency === "Monthly" && expense.category === "Regular Expenses" && expense.card === "Zing Current Account";})
  .reduce((a,c) => a + 1 * c.amount, 0) 
  
  expenseDetails.TT.total.zing_current = expenseDetails.RM.total.zing_current;  
  expenseDetails.TT.delta.zing_current = expenseDetails.RM.delta.zing_current;
  
  expenseDetails.GR.total.zing_current = expenses
  .filter((expense) => {return expense.expenseDate >= startOfCurrentYearString && expense.expenseDate <= todaysDateString && expense.frequency === "Monthly" && expense.category === "Grocery" && expense.card === "Zing Current Account";})
  .reduce((a,c) => a + 1 * c.amount, 0) 
  
  expenseDetails.GR.delta.zing_current = expenses
  .filter((expense) => {return expense.expenseDate >= startOFcurrentMonthString && expense.expenseDate <= todaysDateString && expense.frequency === "Monthly" && expense.category === "Grocery" && expense.card === "Zing Current Account";})
  .reduce((a,c) => a + 1 * c.amount, 0) 
  
  expenseDetails.TT.total.zing_current += expenseDetails.GR.total.zing_current;  
  expenseDetails.TT.delta.zing_current += expenseDetails.GR.delta.zing_current;
  
  expenseDetails.OT.total.zing_current = expenses
  .filter((expense) => {return expense.expenseDate >= startOfCurrentYearString && expense.expenseDate <= todaysDateString && expense.frequency === "Monthly" && expense.category === "One Time" && expense.card === "Zing Current Account";})
  .reduce((a,c) => a + 1 * c.amount, 0) 
  
  expenseDetails.OT.delta.zing_current = expenses
  .filter((expense) => {return expense.expenseDate >= startOFcurrentMonthString && expense.expenseDate <= todaysDateString && expense.frequency === "Monthly" && expense.category === "One Time" && expense.card === "Zing Current Account";})
  .reduce((a,c) => a + 1 * c.amount, 0) 
  
  expenseDetails.TT.total.zing_current += expenseDetails.OT.total.zing_current;  
  expenseDetails.TT.delta.zing_current += expenseDetails.OT.delta.zing_current;
  
  expenseDetails.CL.total.zing_current = expenses
  .filter((expense) => {return expense.expenseDate >= startOfCurrentYearString && expense.expenseDate <= todaysDateString && expense.frequency === "Monthly" && expense.category === "Clothing" && expense.card === "Zing Current Account";})
  .reduce((a,c) => a + 1 * c.amount, 0) 
  
  expenseDetails.CL.delta.zing_current = expenses
  .filter((expense) => {return expense.expenseDate >= startOFcurrentMonthString && expense.expenseDate <= todaysDateString && expense.frequency === "Monthly" && expense.category === "Clothing" && expense.card === "Zing Current Account";})
  .reduce((a,c) => a + 1 * c.amount, 0) 
  
  expenseDetails.TT.total.zing_current += expenseDetails.CL.total.zing_current;  
  expenseDetails.TT.delta.zing_current += expenseDetails.CL.delta.zing_current;
  
  expenseDetails.HO.total.zing_current = expenses
  .filter((expense) => {return expense.expenseDate >= startOfCurrentYearString && expense.expenseDate <= todaysDateString && expense.frequency === "Monthly" && expense.category === "Hotel" && expense.card === "Zing Current Account";})
  .reduce((a,c) => a + 1 * c.amount, 0) 
  
  expenseDetails.HO.delta.zing_current = expenses
  .filter((expense) => {return expense.expenseDate >= startOFcurrentMonthString && expense.expenseDate <= todaysDateString && expense.frequency === "Monthly" && expense.category === "Hotel" && expense.card === "Zing Current Account";})
  .reduce((a,c) => a + 1 * c.amount, 0) 
  
  expenseDetails.TT.total.zing_current += expenseDetails.HO.total.zing_current;  
  expenseDetails.TT.delta.zing_current += expenseDetails.HO.delta.zing_current;
  
  expenseDetails.ME.total.zing_current = expenses
  .filter((expense) => {return expense.expenseDate >= startOfCurrentYearString && expense.expenseDate <= todaysDateString && expense.frequency === "Monthly" && expense.category === "Medical" && expense.card === "Zing Current Account";})
  .reduce((a,c) => a + 1 * c.amount, 0) 
  
  expenseDetails.ME.delta.zing_current = expenses
  .filter((expense) => {return expense.expenseDate >= startOFcurrentMonthString && expense.expenseDate <= todaysDateString && expense.frequency === "Monthly" && expense.category === "Medical" && expense.card === "Zing Current Account";})
  .reduce((a,c) => a + 1 * c.amount, 0) 
  
  expenseDetails.TT.total.zing_current += expenseDetails.ME.total.zing_current;  
  expenseDetails.TT.delta.zing_current += expenseDetails.ME.delta.zing_current;
  
  expenseDetails.LT.total.zing_current = expenses
  .filter((expense) => {return expense.expenseDate >= startOfCurrentYearString && expense.expenseDate <= todaysDateString && expense.frequency === "Monthly" && expense.category === "Local Transport" && expense.card === "Zing Current Account";})
  .reduce((a,c) => a + 1 * c.amount, 0) 
  
  expenseDetails.LT.delta.zing_current = expenses
  .filter((expense) => {return expense.expenseDate >= startOFcurrentMonthString && expense.expenseDate <= todaysDateString && expense.frequency === "Monthly" && expense.category === "Local Transport" && expense.card === "Zing Current Account";})
  .reduce((a,c) => a + 1 * c.amount, 0) 
  
  expenseDetails.TT.total.zing_current += expenseDetails.LT.total.zing_current;  
  expenseDetails.TT.delta.zing_current += expenseDetails.LT.delta.zing_current;
  
  expenseDetails.ED.total.zing_current = expenses
  .filter((expense) => {return expense.expenseDate >= startOfCurrentYearString && expense.expenseDate <= todaysDateString && expense.frequency === "Monthly" && expense.category === "Education" && expense.card === "Zing Current Account";})
  .reduce((a,c) => a + 1 * c.amount, 0) 
  
  expenseDetails.ED.delta.zing_current = expenses
  .filter((expense) => {return expense.expenseDate >= startOFcurrentMonthString && expense.expenseDate <= todaysDateString && expense.frequency === "Monthly" && expense.category === "Education" && expense.card === "Zing Current Account";})
  .reduce((a,c) => a + 1 * c.amount, 0) 
  
  expenseDetails.TT.total.zing_current += expenseDetails.ED.total.zing_current;  
  expenseDetails.TT.delta.zing_current += expenseDetails.ED.delta.zing_current;
  
  expenseDetails.DO.total.zing_current = expenses
  .filter((expense) => {return expense.expenseDate >= startOfCurrentYearString && expense.expenseDate <= todaysDateString && expense.frequency === "Monthly" && expense.category === "Donation" && expense.card === "Zing Current Account";})
  .reduce((a,c) => a + 1 * c.amount, 0) 
  
  expenseDetails.DO.delta.zing_current = expenses
  .filter((expense) => {return expense.expenseDate >= startOFcurrentMonthString && expense.expenseDate <= todaysDateString && expense.frequency === "Monthly" && expense.category === "Donation" && expense.card === "Zing Current Account";})
  .reduce((a,c) => a + 1 * c.amount, 0) 
  
  expenseDetails.TT.total.zing_current += expenseDetails.DO.total.zing_current;  
  expenseDetails.TT.delta.zing_current += expenseDetails.DO.delta.zing_current;
  
  expenseDetails.GF.total.zing_current = expenses
  .filter((expense) => {return expense.expenseDate >= startOfCurrentYearString && expense.expenseDate <= todaysDateString && expense.frequency === "Monthly" && expense.category === "Gift" && expense.card === "Zing Current Account";})
  .reduce((a,c) => a + 1 * c.amount, 0) 
  
  expenseDetails.GF.delta.zing_current = expenses
  .filter((expense) => {return expense.expenseDate >= startOFcurrentMonthString && expense.expenseDate <= todaysDateString && expense.frequency === "Monthly" && expense.category === "Gift" && expense.card === "Zing Current Account";})
  .reduce((a,c) => a + 1 * c.amount, 0) 
  
  expenseDetails.TT.total.zing_current += expenseDetails.GF.total.zing_current;  
  expenseDetails.TT.delta.zing_current += expenseDetails.GF.delta.zing_current;
  
  expenseDetails.YR.total.zing_current = expenses
  .filter((expense) => {return expense.expenseDate >= startOfCurrentYearString && expense.expenseDate <= todaysDateString && expense.frequency === "Monthly" && expense.category === "Yearly" && expense.card === "Zing Current Account";})
  .reduce((a,c) => a + 1 * c.amount, 0) 
  
  expenseDetails.YR.delta.zing_current = expenses
  .filter((expense) => {return expense.expenseDate >= startOFcurrentMonthString && expense.expenseDate <= todaysDateString && expense.frequency === "Monthly" && expense.category === "Yearly" && expense.card === "Zing Current Account";})
  .reduce((a,c) => a + 1 * c.amount, 0) 
  
  expenseDetails.TT.total.zing_current += expenseDetails.YR.total.zing_current;  
  expenseDetails.TT.delta.zing_current += expenseDetails.YR.delta.zing_current;
  
  expenseDetails.TR.total.zing_current = expenses
  .filter((expense) => {return expense.expenseDate >= startOfCurrentYearString && expense.expenseDate <= todaysDateString && expense.frequency === "Monthly" && expense.category === "Travel" && expense.card === "Zing Current Account";})
  .reduce((a,c) => a + 1 * c.amount, 0) 
  
  expenseDetails.TR.delta.zing_current = expenses
  .filter((expense) => {return expense.expenseDate >= startOFcurrentMonthString && expense.expenseDate <= todaysDateString && expense.frequency === "Monthly" && expense.category === "Travel" && expense.card === "Zing Current Account";})
  .reduce((a,c) => a + 1 * c.amount, 0) 
  
  expenseDetails.TT.total.zing_current += expenseDetails.TR.total.zing_current;  
  expenseDetails.TT.delta.zing_current += expenseDetails.TR.delta.zing_current;
  
  expenseDetails.RM.total.zing_hdfc = expenses
  .filter((expense) => {return expense.expenseDate >= startOfCurrentYearString && expense.expenseDate <= todaysDateString && expense.frequency === "Monthly" && expense.category === "Regular Expenses" && expense.card === "Zing HDFC Dabit Card";})
  .reduce((a,c) => a + 1 * c.amount, 0) 
  
  expenseDetails.RM.delta.zing_hdfc = expenses
  .filter((expense) => {return expense.expenseDate >= startOFcurrentMonthString && expense.expenseDate <= todaysDateString && expense.frequency === "Monthly" && expense.category === "Regular Expenses" && expense.card === "Zing HDFC Dabit Card";})
  .reduce((a,c) => a + 1 * c.amount, 0) 
  
  expenseDetails.TT.total.zing_hdfc = expenseDetails.RM.total.zing_hdfc;  
  expenseDetails.TT.delta.zing_hdfc = expenseDetails.RM.delta.zing_hdfc;
  
  expenseDetails.GR.total.zing_hdfc = expenses
  .filter((expense) => {return expense.expenseDate >= startOfCurrentYearString && expense.expenseDate <= todaysDateString && expense.frequency === "Monthly" && expense.category === "Grocery" && expense.card === "Zing HDFC Dabit Card";})
  .reduce((a,c) => a + 1 * c.amount, 0) 
  
  expenseDetails.GR.delta.zing_hdfc = expenses
  .filter((expense) => {return expense.expenseDate >= startOFcurrentMonthString && expense.expenseDate <= todaysDateString && expense.frequency === "Monthly" && expense.category === "Grocery" && expense.card === "Zing HDFC Dabit Card";})
  .reduce((a,c) => a + 1 * c.amount, 0) 
  
  expenseDetails.TT.total.zing_hdfc += expenseDetails.GR.total.zing_hdfc;  
  expenseDetails.TT.delta.zing_hdfc += expenseDetails.GR.delta.zing_hdfc;
  
  expenseDetails.OT.total.zing_hdfc = expenses
  .filter((expense) => {return expense.expenseDate >= startOfCurrentYearString && expense.expenseDate <= todaysDateString && expense.frequency === "Monthly" && expense.category === "One Time" && expense.card === "Zing HDFC Dabit Card";})
  .reduce((a,c) => a + 1 * c.amount, 0) 
  
  expenseDetails.OT.delta.zing_hdfc = expenses
  .filter((expense) => {return expense.expenseDate >= startOFcurrentMonthString && expense.expenseDate <= todaysDateString && expense.frequency === "Monthly" && expense.category === "One Time" && expense.card === "Zing HDFC Dabit Card";})
  .reduce((a,c) => a + 1 * c.amount, 0) 
  
  expenseDetails.TT.total.zing_hdfc += expenseDetails.OT.total.zing_hdfc;  
  expenseDetails.TT.delta.zing_hdfc += expenseDetails.OT.delta.zing_hdfc;
  
  expenseDetails.CL.total.zing_hdfc = expenses
  .filter((expense) => {return expense.expenseDate >= startOfCurrentYearString && expense.expenseDate <= todaysDateString && expense.frequency === "Monthly" && expense.category === "Clothing" && expense.card === "Zing HDFC Dabit Card";})
  .reduce((a,c) => a + 1 * c.amount, 0) 
  
  expenseDetails.CL.delta.zing_hdfc = expenses
  .filter((expense) => {return expense.expenseDate >= startOFcurrentMonthString && expense.expenseDate <= todaysDateString && expense.frequency === "Monthly" && expense.category === "Clothing" && expense.card === "Zing HDFC Dabit Card";})
  .reduce((a,c) => a + 1 * c.amount, 0) 
  
  expenseDetails.TT.total.zing_hdfc += expenseDetails.CL.total.zing_hdfc;  
  expenseDetails.TT.delta.zing_hdfc += expenseDetails.CL.delta.zing_hdfc;
  
  expenseDetails.HO.total.zing_hdfc = expenses
  .filter((expense) => {return expense.expenseDate >= startOfCurrentYearString && expense.expenseDate <= todaysDateString && expense.frequency === "Monthly" && expense.category === "Hotel" && expense.card === "Zing HDFC Dabit Card";})
  .reduce((a,c) => a + 1 * c.amount, 0) 
  
  expenseDetails.HO.delta.zing_hdfc = expenses
  .filter((expense) => {return expense.expenseDate >= startOFcurrentMonthString && expense.expenseDate <= todaysDateString && expense.frequency === "Monthly" && expense.category === "Hotel" && expense.card === "Zing HDFC Dabit Card";})
  .reduce((a,c) => a + 1 * c.amount, 0) 
  
  expenseDetails.TT.total.zing_hdfc += expenseDetails.HO.total.zing_hdfc;  
  expenseDetails.TT.delta.zing_hdfc += expenseDetails.HO.delta.zing_hdfc;
  
  expenseDetails.ME.total.zing_hdfc = expenses
  .filter((expense) => {return expense.expenseDate >= startOfCurrentYearString && expense.expenseDate <= todaysDateString && expense.frequency === "Monthly" && expense.category === "Medical" && expense.card === "Zing HDFC Dabit Card";})
  .reduce((a,c) => a + 1 * c.amount, 0) 
  
  expenseDetails.ME.delta.zing_hdfc = expenses
  .filter((expense) => {return expense.expenseDate >= startOFcurrentMonthString && expense.expenseDate <= todaysDateString && expense.frequency === "Monthly" && expense.category === "Medical" && expense.card === "Zing HDFC Dabit Card";})
  .reduce((a,c) => a + 1 * c.amount, 0) 
  
  expenseDetails.TT.total.zing_hdfc += expenseDetails.ME.total.zing_hdfc;  
  expenseDetails.TT.delta.zing_hdfc += expenseDetails.ME.delta.zing_hdfc;
  
  expenseDetails.LT.total.zing_hdfc = expenses
  .filter((expense) => {return expense.expenseDate >= startOfCurrentYearString && expense.expenseDate <= todaysDateString && expense.frequency === "Monthly" && expense.category === "Local Transport" && expense.card === "Zing HDFC Dabit Card";})
  .reduce((a,c) => a + 1 * c.amount, 0) 
  
  expenseDetails.LT.delta.zing_hdfc = expenses
  .filter((expense) => {return expense.expenseDate >= startOFcurrentMonthString && expense.expenseDate <= todaysDateString && expense.frequency === "Monthly" && expense.category === "Local Transport" && expense.card === "Zing HDFC Dabit Card";})
  .reduce((a,c) => a + 1 * c.amount, 0) 
  
  expenseDetails.TT.total.zing_hdfc += expenseDetails.LT.total.zing_hdfc;  
  expenseDetails.TT.delta.zing_hdfc += expenseDetails.LT.delta.zing_hdfc;
  
  expenseDetails.ED.total.zing_hdfc = expenses
  .filter((expense) => {return expense.expenseDate >= startOfCurrentYearString && expense.expenseDate <= todaysDateString && expense.frequency === "Monthly" && expense.category === "Education" && expense.card === "Zing HDFC Dabit Card";})
  .reduce((a,c) => a + 1 * c.amount, 0) 
  
  expenseDetails.ED.delta.zing_hdfc = expenses
  .filter((expense) => {return expense.expenseDate >= startOFcurrentMonthString && expense.expenseDate <= todaysDateString && expense.frequency === "Monthly" && expense.category === "Education" && expense.card === "Zing HDFC Dabit Card";})
  .reduce((a,c) => a + 1 * c.amount, 0) 
  
  expenseDetails.TT.total.zing_hdfc += expenseDetails.ED.total.zing_hdfc;  
  expenseDetails.TT.delta.zing_hdfc += expenseDetails.ED.delta.zing_hdfc;
  
  expenseDetails.DO.total.zing_hdfc = expenses
  .filter((expense) => {return expense.expenseDate >= startOfCurrentYearString && expense.expenseDate <= todaysDateString && expense.frequency === "Monthly" && expense.category === "Donation" && expense.card === "Zing HDFC Dabit Card";})
  .reduce((a,c) => a + 1 * c.amount, 0) 
  
  expenseDetails.DO.delta.zing_hdfc = expenses
  .filter((expense) => {return expense.expenseDate >= startOFcurrentMonthString && expense.expenseDate <= todaysDateString && expense.frequency === "Monthly" && expense.category === "Donation" && expense.card === "Zing HDFC Dabit Card";})
  .reduce((a,c) => a + 1 * c.amount, 0) 
  
  expenseDetails.TT.total.zing_hdfc += expenseDetails.DO.total.zing_hdfc;  
  expenseDetails.TT.delta.zing_hdfc += expenseDetails.DO.delta.zing_hdfc;
  
  expenseDetails.GF.total.zing_hdfc = expenses
  .filter((expense) => {return expense.expenseDate >= startOfCurrentYearString && expense.expenseDate <= todaysDateString && expense.frequency === "Monthly" && expense.category === "Gift" && expense.card === "Zing HDFC Dabit Card";})
  .reduce((a,c) => a + 1 * c.amount, 0) 
  
  expenseDetails.GF.delta.zing_hdfc = expenses
  .filter((expense) => {return expense.expenseDate >= startOFcurrentMonthString && expense.expenseDate <= todaysDateString && expense.frequency === "Monthly" && expense.category === "Gift" && expense.card === "Zing HDFC Dabit Card";})
  .reduce((a,c) => a + 1 * c.amount, 0) 
  
  expenseDetails.TT.total.zing_hdfc += expenseDetails.GF.total.zing_hdfc;  
  expenseDetails.TT.delta.zing_hdfc += expenseDetails.GF.delta.zing_hdfc;
  
  expenseDetails.YR.total.zing_hdfc = expenses
  .filter((expense) => {return expense.expenseDate >= startOfCurrentYearString && expense.expenseDate <= todaysDateString && expense.frequency === "Monthly" && expense.category === "Yearly" && expense.card === "Zing HDFC Dabit Card";})
  .reduce((a,c) => a + 1 * c.amount, 0) 
  
  expenseDetails.YR.delta.zing_hdfc = expenses
  .filter((expense) => {return expense.expenseDate >= startOFcurrentMonthString && expense.expenseDate <= todaysDateString && expense.frequency === "Monthly" && expense.category === "Yearly" && expense.card === "Zing HDFC Dabit Card";})
  .reduce((a,c) => a + 1 * c.amount, 0) 
  
  expenseDetails.TT.total.zing_hdfc += expenseDetails.YR.total.zing_hdfc;  
  expenseDetails.TT.delta.zing_hdfc += expenseDetails.YR.delta.zing_hdfc;
  
  expenseDetails.TR.total.zing_hdfc = expenses
  .filter((expense) => {return expense.expenseDate >= startOfCurrentYearString && expense.expenseDate <= todaysDateString && expense.frequency === "Monthly" && expense.category === "Travel" && expense.card === "Zing HDFC Dabit Card";})
  .reduce((a,c) => a + 1 * c.amount, 0) 
  
  expenseDetails.TR.delta.zing_hdfc = expenses
  .filter((expense) => {return expense.expenseDate >= startOFcurrentMonthString && expense.expenseDate <= todaysDateString && expense.frequency === "Monthly" && expense.category === "Travel" && expense.card === "Zing HDFC Dabit Card";})
  .reduce((a,c) => a + 1 * c.amount, 0) 
  
  expenseDetails.TT.total.zing_hdfc += expenseDetails.TR.total.zing_hdfc;  
  expenseDetails.TT.delta.zing_hdfc += expenseDetails.TR.delta.zing_hdfc;
  
  expenseDetails.RM.total.pinky_hdfc = expenses
  .filter((expense) => {return expense.expenseDate >= startOfCurrentYearString && expense.expenseDate <= todaysDateString && expense.frequency === "Monthly" && expense.category === "Regular Expenses" && expense.card === "Pinky HDFC Debit Card";})
  .reduce((a,c) => a + 1 * c.amount, 0) 
  
  expenseDetails.RM.delta.pinky_hdfc = expenses
  .filter((expense) => {return expense.expenseDate >= startOFcurrentMonthString && expense.expenseDate <= todaysDateString && expense.frequency === "Monthly" && expense.category === "Regular Expenses" && expense.card === "Pinky HDFC Debit Card";})
  .reduce((a,c) => a + 1 * c.amount, 0) 
  
  expenseDetails.TT.total.pinky_hdfc = expenseDetails.RM.total.pinky_hdfc;  
  expenseDetails.TT.delta.pinky_hdfc = expenseDetails.RM.delta.pinky_hdfc;
  
  expenseDetails.GR.total.pinky_hdfc = expenses
  .filter((expense) => {return expense.expenseDate >= startOfCurrentYearString && expense.expenseDate <= todaysDateString && expense.frequency === "Monthly" && expense.category === "Grocery" && expense.card === "Pinky HDFC Debit Card";})
  .reduce((a,c) => a + 1 * c.amount, 0) 
  
  expenseDetails.GR.delta.pinky_hdfc = expenses
  .filter((expense) => {return expense.expenseDate >= startOFcurrentMonthString && expense.expenseDate <= todaysDateString && expense.frequency === "Monthly" && expense.category === "Grocery" && expense.card === "Pinky HDFC Debit Card";})
  .reduce((a,c) => a + 1 * c.amount, 0) 
  
  expenseDetails.TT.total.pinky_hdfc += expenseDetails.GR.total.pinky_hdfc;  
  expenseDetails.TT.delta.pinky_hdfc += expenseDetails.GR.delta.pinky_hdfc;
  
  expenseDetails.OT.total.pinky_hdfc = expenses
  .filter((expense) => {return expense.expenseDate >= startOfCurrentYearString && expense.expenseDate <= todaysDateString && expense.frequency === "Monthly" && expense.category === "One Time" && expense.card === "Pinky HDFC Debit Card";})
  .reduce((a,c) => a + 1 * c.amount, 0) 
  
  expenseDetails.OT.delta.pinky_hdfc = expenses
  .filter((expense) => {return expense.expenseDate >= startOFcurrentMonthString && expense.expenseDate <= todaysDateString && expense.frequency === "Monthly" && expense.category === "One Time" && expense.card === "Pinky HDFC Debit Card";})
  .reduce((a,c) => a + 1 * c.amount, 0) 
  
  expenseDetails.TT.total.pinky_hdfc += expenseDetails.OT.total.pinky_hdfc;  
  expenseDetails.TT.delta.pinky_hdfc += expenseDetails.OT.delta.pinky_hdfc;
  
  expenseDetails.CL.total.pinky_hdfc = expenses
  .filter((expense) => {return expense.expenseDate >= startOfCurrentYearString && expense.expenseDate <= todaysDateString && expense.frequency === "Monthly" && expense.category === "Clothing" && expense.card === "Pinky HDFC Debit Card";})
  .reduce((a,c) => a + 1 * c.amount, 0) 
  
  expenseDetails.CL.delta.pinky_hdfc = expenses
  .filter((expense) => {return expense.expenseDate >= startOFcurrentMonthString && expense.expenseDate <= todaysDateString && expense.frequency === "Monthly" && expense.category === "Clothing" && expense.card === "Pinky HDFC Debit Card";})
  .reduce((a,c) => a + 1 * c.amount, 0) 
  
  expenseDetails.TT.total.pinky_hdfc += expenseDetails.CL.total.pinky_hdfc;  
  expenseDetails.TT.delta.pinky_hdfc += expenseDetails.CL.delta.pinky_hdfc;
  
  expenseDetails.HO.total.pinky_hdfc = expenses
  .filter((expense) => {return expense.expenseDate >= startOfCurrentYearString && expense.expenseDate <= todaysDateString && expense.frequency === "Monthly" && expense.category === "Hotel" && expense.card === "Pinky HDFC Debit Card";})
  .reduce((a,c) => a + 1 * c.amount, 0) 
  
  expenseDetails.HO.delta.pinky_hdfc = expenses
  .filter((expense) => {return expense.expenseDate >= startOFcurrentMonthString && expense.expenseDate <= todaysDateString && expense.frequency === "Monthly" && expense.category === "Hotel" && expense.card === "Pinky HDFC Debit Card";})
  .reduce((a,c) => a + 1 * c.amount, 0) 
  
  expenseDetails.TT.total.pinky_hdfc += expenseDetails.HO.total.pinky_hdfc;  
  expenseDetails.TT.delta.pinky_hdfc += expenseDetails.HO.delta.pinky_hdfc;
  
  expenseDetails.ME.total.pinky_hdfc = expenses
  .filter((expense) => {return expense.expenseDate >= startOfCurrentYearString && expense.expenseDate <= todaysDateString && expense.frequency === "Monthly" && expense.category === "Medical" && expense.card === "Pinky HDFC Debit Card";})
  .reduce((a,c) => a + 1 * c.amount, 0) 
  
  expenseDetails.ME.delta.pinky_hdfc = expenses
  .filter((expense) => {return expense.expenseDate >= startOFcurrentMonthString && expense.expenseDate <= todaysDateString && expense.frequency === "Monthly" && expense.category === "Medical" && expense.card === "Pinky HDFC Debit Card";})
  .reduce((a,c) => a + 1 * c.amount, 0) 
  
  expenseDetails.TT.total.pinky_hdfc += expenseDetails.ME.total.pinky_hdfc;  
  expenseDetails.TT.delta.pinky_hdfc += expenseDetails.ME.delta.pinky_hdfc;
  
  expenseDetails.LT.total.pinky_hdfc = expenses
  .filter((expense) => {return expense.expenseDate >= startOfCurrentYearString && expense.expenseDate <= todaysDateString && expense.frequency === "Monthly" && expense.category === "Local Transport" && expense.card === "Pinky HDFC Debit Card";})
  .reduce((a,c) => a + 1 * c.amount, 0) 
  
  expenseDetails.LT.delta.pinky_hdfc = expenses
  .filter((expense) => {return expense.expenseDate >= startOFcurrentMonthString && expense.expenseDate <= todaysDateString && expense.frequency === "Monthly" && expense.category === "Local Transport" && expense.card === "Pinky HDFC Debit Card";})
  .reduce((a,c) => a + 1 * c.amount, 0) 
  
  expenseDetails.TT.total.pinky_hdfc += expenseDetails.LT.total.pinky_hdfc;  
  expenseDetails.TT.delta.pinky_hdfc += expenseDetails.LT.delta.pinky_hdfc;
  
  expenseDetails.ED.total.pinky_hdfc = expenses
  .filter((expense) => {return expense.expenseDate >= startOfCurrentYearString && expense.expenseDate <= todaysDateString && expense.frequency === "Monthly" && expense.category === "Education" && expense.card === "Pinky HDFC Debit Card";})
  .reduce((a,c) => a + 1 * c.amount, 0) 
  
  expenseDetails.ED.delta.pinky_hdfc = expenses
  .filter((expense) => {return expense.expenseDate >= startOFcurrentMonthString && expense.expenseDate <= todaysDateString && expense.frequency === "Monthly" && expense.category === "Education" && expense.card === "Pinky HDFC Debit Card";})
  .reduce((a,c) => a + 1 * c.amount, 0) 
  
  expenseDetails.TT.total.pinky_hdfc += expenseDetails.ED.total.pinky_hdfc;  
  expenseDetails.TT.delta.pinky_hdfc += expenseDetails.ED.delta.pinky_hdfc;
  
  expenseDetails.DO.total.pinky_hdfc = expenses
  .filter((expense) => {return expense.expenseDate >= startOfCurrentYearString && expense.expenseDate <= todaysDateString && expense.frequency === "Monthly" && expense.category === "Donation" && expense.card === "Pinky HDFC Debit Card";})
  .reduce((a,c) => a + 1 * c.amount, 0) 
  
  expenseDetails.DO.delta.pinky_hdfc = expenses
  .filter((expense) => {return expense.expenseDate >= startOFcurrentMonthString && expense.expenseDate <= todaysDateString && expense.frequency === "Monthly" && expense.category === "Donation" && expense.card === "Pinky HDFC Debit Card";})
  .reduce((a,c) => a + 1 * c.amount, 0) 
  
  expenseDetails.TT.total.pinky_hdfc += expenseDetails.DO.total.pinky_hdfc;  
  expenseDetails.TT.delta.pinky_hdfc += expenseDetails.DO.delta.pinky_hdfc;
  
  expenseDetails.GF.total.pinky_hdfc = expenses
  .filter((expense) => {return expense.expenseDate >= startOfCurrentYearString && expense.expenseDate <= todaysDateString && expense.frequency === "Monthly" && expense.category === "Gift" && expense.card === "Pinky HDFC Debit Card";})
  .reduce((a,c) => a + 1 * c.amount, 0) 
  
  expenseDetails.GF.delta.pinky_hdfc = expenses
  .filter((expense) => {return expense.expenseDate >= startOFcurrentMonthString && expense.expenseDate <= todaysDateString && expense.frequency === "Monthly" && expense.category === "Gift" && expense.card === "Pinky HDFC Debit Card";})
  .reduce((a,c) => a + 1 * c.amount, 0) 
  
  expenseDetails.TT.total.pinky_hdfc += expenseDetails.GF.total.pinky_hdfc;  
  expenseDetails.TT.delta.pinky_hdfc += expenseDetails.GF.delta.pinky_hdfc;
  
  expenseDetails.YR.total.pinky_hdfc = expenses
  .filter((expense) => {return expense.expenseDate >= startOfCurrentYearString && expense.expenseDate <= todaysDateString && expense.frequency === "Monthly" && expense.category === "Yearly" && expense.card === "Pinky HDFC Debit Card";})
  .reduce((a,c) => a + 1 * c.amount, 0) 
  
  expenseDetails.YR.delta.pinky_hdfc = expenses
  .filter((expense) => {return expense.expenseDate >= startOFcurrentMonthString && expense.expenseDate <= todaysDateString && expense.frequency === "Monthly" && expense.category === "Yearly" && expense.card === "Pinky HDFC Debit Card";})
  .reduce((a,c) => a + 1 * c.amount, 0) 
  
  expenseDetails.TT.total.pinky_hdfc += expenseDetails.YR.total.pinky_hdfc;  
  expenseDetails.TT.delta.pinky_hdfc += expenseDetails.YR.delta.pinky_hdfc;
  
  expenseDetails.TR.total.pinky_hdfc = expenses
  .filter((expense) => {return expense.expenseDate >= startOfCurrentYearString && expense.expenseDate <= todaysDateString && expense.frequency === "Monthly" && expense.category === "Travel" && expense.card === "Pinky HDFC Debit Card";})
  .reduce((a,c) => a + 1 * c.amount, 0) 
  
  expenseDetails.TR.delta.pinky_hdfc = expenses
  .filter((expense) => {return expense.expenseDate >= startOFcurrentMonthString && expense.expenseDate <= todaysDateString && expense.frequency === "Monthly" && expense.category === "Travel" && expense.card === "Pinky HDFC Debit Card";})
  .reduce((a,c) => a + 1 * c.amount, 0) 
  
  expenseDetails.TT.total.pinky_hdfc += expenseDetails.TR.total.pinky_hdfc;  
  expenseDetails.TT.delta.pinky_hdfc += expenseDetails.TR.delta.pinky_hdfc;
  
  expenseDetails.RM.total.pinky_canara = expenses
  .filter((expense) => {return expense.expenseDate >= startOfCurrentYearString && expense.expenseDate <= todaysDateString && expense.frequency === "Monthly" && expense.category === "Regular Expenses" && expense.card === "Pinky Canara Debit Card";})
  .reduce((a,c) => a + 1 * c.amount, 0) 
  
  expenseDetails.RM.delta.pinky_canara = expenses
  .filter((expense) => {return expense.expenseDate >= startOFcurrentMonthString && expense.expenseDate <= todaysDateString && expense.frequency === "Monthly" && expense.category === "Regular Expenses" && expense.card === "Pinky Canara Debit Card";})
  .reduce((a,c) => a + 1 * c.amount, 0) 
  
  expenseDetails.TT.total.pinky_canara = expenseDetails.RM.total.pinky_canara;  
  expenseDetails.TT.delta.pinky_canara = expenseDetails.RM.delta.pinky_canara;
  
  expenseDetails.GR.total.pinky_canara = expenses
  .filter((expense) => {return expense.expenseDate >= startOfCurrentYearString && expense.expenseDate <= todaysDateString && expense.frequency === "Monthly" && expense.category === "Grocery" && expense.card === "Pinky Canara Debit Card";})
  .reduce((a,c) => a + 1 * c.amount, 0) 
  
  expenseDetails.GR.delta.pinky_canara = expenses
  .filter((expense) => {return expense.expenseDate >= startOFcurrentMonthString && expense.expenseDate <= todaysDateString && expense.frequency === "Monthly" && expense.category === "Grocery" && expense.card === "Pinky Canara Debit Card";})
  .reduce((a,c) => a + 1 * c.amount, 0) 
  
  expenseDetails.TT.total.pinky_canara += expenseDetails.GR.total.pinky_canara;  
  expenseDetails.TT.delta.pinky_canara += expenseDetails.GR.delta.pinky_canara;
  
  expenseDetails.OT.total.pinky_canara = expenses
  .filter((expense) => {return expense.expenseDate >= startOfCurrentYearString && expense.expenseDate <= todaysDateString && expense.frequency === "Monthly" && expense.category === "One Time" && expense.card === "Pinky Canara Debit Card";})
  .reduce((a,c) => a + 1 * c.amount, 0) 
  
  expenseDetails.OT.delta.pinky_canara = expenses
  .filter((expense) => {return expense.expenseDate >= startOFcurrentMonthString && expense.expenseDate <= todaysDateString && expense.frequency === "Monthly" && expense.category === "One Time" && expense.card === "Pinky Canara Debit Card";})
  .reduce((a,c) => a + 1 * c.amount, 0) 
  
  expenseDetails.TT.total.pinky_canara += expenseDetails.OT.total.pinky_canara;  
  expenseDetails.TT.delta.pinky_canara += expenseDetails.OT.delta.pinky_canara;
  
  expenseDetails.CL.total.pinky_canara = expenses
  .filter((expense) => {return expense.expenseDate >= startOfCurrentYearString && expense.expenseDate <= todaysDateString && expense.frequency === "Monthly" && expense.category === "Clothing" && expense.card === "Pinky Canara Debit Card";})
  .reduce((a,c) => a + 1 * c.amount, 0) 
  
  expenseDetails.CL.delta.pinky_canara = expenses
  .filter((expense) => {return expense.expenseDate >= startOFcurrentMonthString && expense.expenseDate <= todaysDateString && expense.frequency === "Monthly" && expense.category === "Clothing" && expense.card === "Pinky Canara Debit Card";})
  .reduce((a,c) => a + 1 * c.amount, 0) 
  
  expenseDetails.TT.total.pinky_canara += expenseDetails.CL.total.pinky_canara;  
  expenseDetails.TT.delta.pinky_canara += expenseDetails.CL.delta.pinky_canara;
  
  expenseDetails.HO.total.pinky_canara = expenses
  .filter((expense) => {return expense.expenseDate >= startOfCurrentYearString && expense.expenseDate <= todaysDateString && expense.frequency === "Monthly" && expense.category === "Hotel" && expense.card === "Pinky Canara Debit Card";})
  .reduce((a,c) => a + 1 * c.amount, 0) 
  
  expenseDetails.HO.delta.pinky_canara = expenses
  .filter((expense) => {return expense.expenseDate >= startOFcurrentMonthString && expense.expenseDate <= todaysDateString && expense.frequency === "Monthly" && expense.category === "Hotel" && expense.card === "Pinky Canara Debit Card";})
  .reduce((a,c) => a + 1 * c.amount, 0) 
  
  expenseDetails.TT.total.pinky_canara += expenseDetails.HO.total.pinky_canara;  
  expenseDetails.TT.delta.pinky_canara += expenseDetails.HO.delta.pinky_canara;
  
  expenseDetails.ME.total.pinky_canara = expenses
  .filter((expense) => {return expense.expenseDate >= startOfCurrentYearString && expense.expenseDate <= todaysDateString && expense.frequency === "Monthly" && expense.category === "Medical" && expense.card === "Pinky Canara Debit Card";})
  .reduce((a,c) => a + 1 * c.amount, 0) 
  
  expenseDetails.ME.delta.pinky_canara = expenses
  .filter((expense) => {return expense.expenseDate >= startOFcurrentMonthString && expense.expenseDate <= todaysDateString && expense.frequency === "Monthly" && expense.category === "Medical" && expense.card === "Pinky Canara Debit Card";})
  .reduce((a,c) => a + 1 * c.amount, 0) 
  
  expenseDetails.TT.total.pinky_canara += expenseDetails.ME.total.pinky_canara;  
  expenseDetails.TT.delta.pinky_canara += expenseDetails.ME.delta.pinky_canara;
  
  expenseDetails.LT.total.pinky_canara = expenses
  .filter((expense) => {return expense.expenseDate >= startOfCurrentYearString && expense.expenseDate <= todaysDateString && expense.frequency === "Monthly" && expense.category === "Local Transport" && expense.card === "Pinky Canara Debit Card";})
  .reduce((a,c) => a + 1 * c.amount, 0) 
  
  expenseDetails.LT.delta.pinky_canara = expenses
  .filter((expense) => {return expense.expenseDate >= startOFcurrentMonthString && expense.expenseDate <= todaysDateString && expense.frequency === "Monthly" && expense.category === "Local Transport" && expense.card === "Pinky Canara Debit Card";})
  .reduce((a,c) => a + 1 * c.amount, 0) 
  
  expenseDetails.TT.total.pinky_canara += expenseDetails.LT.total.pinky_canara;  
  expenseDetails.TT.delta.pinky_canara += expenseDetails.LT.delta.pinky_canara;
  
  expenseDetails.ED.total.pinky_canara = expenses
  .filter((expense) => {return expense.expenseDate >= startOfCurrentYearString && expense.expenseDate <= todaysDateString && expense.frequency === "Monthly" && expense.category === "Education" && expense.card === "Pinky Canara Debit Card";})
  .reduce((a,c) => a + 1 * c.amount, 0) 
  
  expenseDetails.ED.delta.pinky_canara = expenses
  .filter((expense) => {return expense.expenseDate >= startOFcurrentMonthString && expense.expenseDate <= todaysDateString && expense.frequency === "Monthly" && expense.category === "Education" && expense.card === "Pinky Canara Debit Card";})
  .reduce((a,c) => a + 1 * c.amount, 0) 
  
  expenseDetails.TT.total.pinky_canara += expenseDetails.ED.total.pinky_canara;  
  expenseDetails.TT.delta.pinky_canara += expenseDetails.ED.delta.pinky_canara;
  
  expenseDetails.DO.total.pinky_canara = expenses
  .filter((expense) => {return expense.expenseDate >= startOfCurrentYearString && expense.expenseDate <= todaysDateString && expense.frequency === "Monthly" && expense.category === "Donation" && expense.card === "Pinky Canara Debit Card";})
  .reduce((a,c) => a + 1 * c.amount, 0) 
  
  expenseDetails.DO.delta.pinky_canara = expenses
  .filter((expense) => {return expense.expenseDate >= startOFcurrentMonthString && expense.expenseDate <= todaysDateString && expense.frequency === "Monthly" && expense.category === "Donation" && expense.card === "Pinky Canara Debit Card";})
  .reduce((a,c) => a + 1 * c.amount, 0) 
  
  expenseDetails.TT.total.pinky_canara += expenseDetails.DO.total.pinky_canara;  
  expenseDetails.TT.delta.pinky_canara += expenseDetails.DO.delta.pinky_canara;
  
  expenseDetails.GF.total.pinky_canara = expenses
  .filter((expense) => {return expense.expenseDate >= startOfCurrentYearString && expense.expenseDate <= todaysDateString && expense.frequency === "Monthly" && expense.category === "Gift" && expense.card === "Pinky Canara Debit Card";})
  .reduce((a,c) => a + 1 * c.amount, 0) 
  
  expenseDetails.GF.delta.pinky_canara = expenses
  .filter((expense) => {return expense.expenseDate >= startOFcurrentMonthString && expense.expenseDate <= todaysDateString && expense.frequency === "Monthly" && expense.category === "Gift" && expense.card === "Pinky Canara Debit Card";})
  .reduce((a,c) => a + 1 * c.amount, 0) 
  
  expenseDetails.TT.total.pinky_canara += expenseDetails.GF.total.pinky_canara;  
  expenseDetails.TT.delta.pinky_canara += expenseDetails.GF.delta.pinky_canara;
  
  expenseDetails.YR.total.pinky_canara = expenses
  .filter((expense) => {return expense.expenseDate >= startOfCurrentYearString && expense.expenseDate <= todaysDateString && expense.frequency === "Monthly" && expense.category === "Yearly" && expense.card === "Pinky Canara Debit Card";})
  .reduce((a,c) => a + 1 * c.amount, 0) 
  
  expenseDetails.YR.delta.pinky_canara = expenses
  .filter((expense) => {return expense.expenseDate >= startOFcurrentMonthString && expense.expenseDate <= todaysDateString && expense.frequency === "Monthly" && expense.category === "Yearly" && expense.card === "Pinky Canara Debit Card";})
  .reduce((a,c) => a + 1 * c.amount, 0) 
  
  expenseDetails.TT.total.pinky_canara += expenseDetails.YR.total.pinky_canara;  
  expenseDetails.TT.delta.pinky_canara += expenseDetails.YR.delta.pinky_canara;
  
  expenseDetails.TR.total.pinky_canara = expenses
  .filter((expense) => {return expense.expenseDate >= startOfCurrentYearString && expense.expenseDate <= todaysDateString && expense.frequency === "Monthly" && expense.category === "Travel" && expense.card === "Pinky Canara Debit Card";})
  .reduce((a,c) => a + 1 * c.amount, 0) 
  
  expenseDetails.TR.delta.pinky_canara = expenses
  .filter((expense) => {return expense.expenseDate >= startOFcurrentMonthString && expense.expenseDate <= todaysDateString && expense.frequency === "Monthly" && expense.category === "Travel" && expense.card === "Pinky Canara Debit Card";})
  .reduce((a,c) => a + 1 * c.amount, 0) 
  
  expenseDetails.TT.total.pinky_canara += expenseDetails.TR.total.pinky_canara;  
  expenseDetails.TT.delta.pinky_canara += expenseDetails.TR.delta.pinky_canara;
  }
  