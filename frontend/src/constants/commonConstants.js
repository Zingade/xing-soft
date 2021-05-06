export const PRIMARY_STATISTICS_CUSTOM = [
    'monthly_2021',
    'overall_2021',
    'monthly_2020',
    'overall_2020',
  ];
  
  export const STATISTIC_DEFINITIONS_CUSTOM = {
    monthly_2021: {
      displayName: 'Monthlhy 2021',
      format: 'int',
    },
    overall_2021: {
      displayName: 'Overall 2021',
      format: 'int',
    },
    monthly_2020: {
      displayName: 'Monthlhy 2020',
      format: 'int',
    },
    overall_2020: {
      displayName: 'Overall 2020',
      format: 'int',
    },
  };
  
  export const EXPENSE_DEFINITIONS = {
    monthly_2021: {
      displayName: 'Expenses in 2021',
      color: '#ff073a',
    },
    monthly_2020: {
      displayName: 'Expenses in 2020',
      color: '#007bff',
    },
    recursive: {
      displayName: 'Recursive Expenses',
      color: '#28a745',
    },
    onetime: {
      displayName: 'One time Expenses',
      color: '#6c757d',
    },
    must: {
      displayName: 'Must Spend',
      color: '#6c757d',
    },
    nice: {
      displayName: 'Nice to Spend',
      color: '#4b1eaa',
    },
    zing_cc: {
      displayName: 'Zing Credit Card',
      color: '#fb5581',
    },
    zing_hdfc: {
      displayName: 'Zing HDFC Debit Card',
      color: '#fb5581',
    },
    zing_current: {
      displayName: 'Google Pay',
      color: '#fb5581',
    },
    pinky_hdfc: {
      displayName: 'Pinky HDFC Debit Card',
      color: '#fb5581',
    },
    pinky_canara: {
      displayName: 'Pinky Canara Card',
      color: '#fb5581',
    },
  };

  export const EXPENSE_CATEGORY = {
    RM: 'Regular Expenses',
    GR: 'Grocery',
    OT: 'One Time',
    CL: 'Clothing',
    HO: 'Hotel',
    ME: 'Medical',
    TT: 'Grand Total',
    LT: 'Local Transport',
    ED: 'Education',
    DO: 'Donation',
    GF: 'Gift',
    YR: 'Yearly',
    TR: 'Travel',
  };
  
  export const TABLE_COLUMNS = [
    'monthly_2021',
    'monthly_2020',
    'recursive',
    'onetime',
    'must', 
    'nice',
    'zing_cc',
    'zing_hdfc',
    'zing_current',
    'pinky_hdfc',
    'pinky_canara',
  ];

  export var summaryExpense  = {
      delta: {monthly_2021:0, overall_2021:0, monthly_2020:0, monthly_2020:0},
      total: {monthly_2021:0, overall_2021:0, monthly_2020:0, monthly_2020:0},
      current:0,
      availableBalance:0,
  }

  export var expenseDetails = {
    RM:{
      delta:{
        monthly_2021:0, monthly_2020:0, recursive:0, onetime:0, must:0, nice:0, zing_cc:0, zing_hdfc:0, zing_current:0, pinky_hdfc:0,pinky_canara:0,
      },
      total:{
        monthly_2021:0, monthly_2020:0, recursive:0, onetime:0, must:0, nice:0, zing_cc:0, zing_hdfc:0, zing_current:0, pinky_hdfc:0,pinky_canara:0,
      },
    },
    GR:{
      delta:{
        monthly_2021:0, monthly_2020:0, recursive:0, onetime:0, must:0, nice:0, zing_cc:0, zing_hdfc:0, zing_current:0, pinky_hdfc:0,pinky_canara:0,
      },
      total:{
        monthly_2021:0, monthly_2020:0, recursive:0, onetime:0, must:0, nice:0, zing_cc:0, zing_hdfc:0, zing_current:0, pinky_hdfc:0,pinky_canara:0,
      },
    },
    OT:{
      delta:{
        monthly_2021:0, monthly_2020:0, recursive:0, onetime:0, must:0, nice:0, zing_cc:0, zing_hdfc:0, zing_current:0, pinky_hdfc:0,pinky_canara:0,
      },
      total:{
        monthly_2021:0, monthly_2020:0, recursive:0, onetime:0, must:0, nice:0, zing_cc:0, zing_hdfc:0, zing_current:0, pinky_hdfc:0,pinky_canara:0,
      },
    },
    CL:{
      delta:{
        monthly_2021:0, monthly_2020:0, recursive:0, onetime:0, must:0, nice:0, zing_cc:0, zing_hdfc:0, zing_current:0, pinky_hdfc:0,pinky_canara:0,
      },
      total:{
        monthly_2021:0, monthly_2020:0, recursive:0, onetime:0, must:0, nice:0, zing_cc:0, zing_hdfc:0, zing_current:0, pinky_hdfc:0,pinky_canara:0,
      },
    },
    HO:{
      delta:{
        monthly_2021:0, monthly_2020:0, recursive:0, onetime:0, must:0, nice:0, zing_cc:0, zing_hdfc:0, zing_current:0, pinky_hdfc:0,pinky_canara:0,
      },
      total:{
        monthly_2021:0, monthly_2020:0, recursive:0, onetime:0, must:0, nice:0, zing_cc:0, zing_hdfc:0, zing_current:0, pinky_hdfc:0,pinky_canara:0,
      },
    },
    ME:{
      delta:{
        monthly_2021:0, monthly_2020:0, recursive:0, onetime:0, must:0, nice:0, zing_cc:0, zing_hdfc:0, zing_current:0, pinky_hdfc:0,pinky_canara:0,
      },
      total:{
        monthly_2021:0, monthly_2020:0, recursive:0, onetime:0, must:0, nice:0, zing_cc:0, zing_hdfc:0, zing_current:0, pinky_hdfc:0,pinky_canara:0,
      },
    },
    LT:{
      delta:{
        monthly_2021:0, monthly_2020:0, recursive:0, onetime:0, must:0, nice:0, zing_cc:0, zing_hdfc:0, zing_current:0, pinky_hdfc:0,pinky_canara:0,
      },
      total:{
        monthly_2021:0, monthly_2020:0, recursive:0, onetime:0, must:0, nice:0, zing_cc:0, zing_hdfc:0, zing_current:0, pinky_hdfc:0,pinky_canara:0,
      },
    },
    ED:{
      delta:{
        monthly_2021:0, monthly_2020:0, recursive:0, onetime:0, must:0, nice:0, zing_cc:0, zing_hdfc:0, zing_current:0, pinky_hdfc:0,pinky_canara:0,
      },
      total:{
        monthly_2021:0, monthly_2020:0, recursive:0, onetime:0, must:0, nice:0, zing_cc:0, zing_hdfc:0, zing_current:0, pinky_hdfc:0,pinky_canara:0,
      },
    },
    DO:{
      delta:{
        monthly_2021:0, monthly_2020:0, recursive:0, onetime:0, must:0, nice:0, zing_cc:0, zing_hdfc:0, zing_current:0, pinky_hdfc:0,pinky_canara:0,
      },
      total:{
        monthly_2021:0, monthly_2020:0, recursive:0, onetime:0, must:0, nice:0, zing_cc:0, zing_hdfc:0, zing_current:0, pinky_hdfc:0,pinky_canara:0,
      },
    },
    TT:{
      delta:{
        monthly_2021:0, monthly_2020:0, recursive:0, onetime:0, must:0, nice:0, zing_cc:0, zing_hdfc:0, zing_current:0, pinky_hdfc:0,pinky_canara:0,
      },
      total:{
        monthly_2021:0, monthly_2020:0, recursive:0, onetime:0, must:0, nice:0, zing_cc:0, zing_hdfc:0, zing_current:0, pinky_hdfc:0,pinky_canara:0,
      },
    },
    GF:{
      delta:{
        monthly_2021:0, monthly_2020:0, recursive:0, onetime:0, must:0, nice:0, zing_cc:0, zing_hdfc:0, zing_current:0, pinky_hdfc:0,pinky_canara:0,
      },
      total:{
        monthly_2021:0, monthly_2020:0, recursive:0, onetime:0, must:0, nice:0, zing_cc:0, zing_hdfc:0, zing_current:0, pinky_hdfc:0,pinky_canara:0,
      },
    },
    YR:{
      delta:{
        monthly_2021:0, monthly_2020:0, recursive:0, onetime:0, must:0, nice:0, zing_cc:0, zing_hdfc:0, zing_current:0, pinky_hdfc:0,pinky_canara:0,
      },
      total:{
        monthly_2021:0, monthly_2020:0, recursive:0, onetime:0, must:0, nice:0, zing_cc:0, zing_hdfc:0, zing_current:0, pinky_hdfc:0,pinky_canara:0,
      },
    },
    TR:{
      delta:{
        monthly_2021:0, monthly_2020:0, recursive:0, onetime:0, must:0, nice:0, zing_cc:0, zing_hdfc:0, zing_current:0, pinky_hdfc:0,pinky_canara:0,
      },
      total:{
        monthly_2021:0, monthly_2020:0, recursive:0, onetime:0, must:0, nice:0, zing_cc:0, zing_hdfc:0, zing_current:0, pinky_hdfc:0,pinky_canara:0,
      },
    },
  };
  
  
  
  
