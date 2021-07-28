import React, { useEffect, useState } from 'react';
import {useSelector, useDispatch} from 'react-redux';
import { deleteMutualFund, listMutualFunds, saveMutualFund } from '../actions/mutualFundActions';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import {format} from 'date-fns';
import { formatNumberCustom } from '../utils/commonFunctions';
import Level from '../utils/LevelCustom'
import {FundCard, AssetCard} from '../utils/MutualFundCards'
import { Grid } from '@material-ui/core';


function MutualFundScreen(props) {
    const [modalVisible, setModalVisible] = useState(false);
    const [id, setId] = useState('');
    const [name, setName] = useState('');
    const [mutualFundDate, setMutualFundDate] = useState(new Date());
    const [amount, setAmount] = useState(0);
    const [apiLink, setApiLink] = useState('');
    const [units, setUnits] = useState(0);

    const mutualFundList = useSelector(state=>state.mutualFundList);
    const {loading, mutualFunds, error} = mutualFundList;
    const mutualFundSave = useSelector(state=>state.mutualFundSave);
    const {loading:loadingSave, success: successSave, error:errorSave} = mutualFundSave;
    const mutualFundDelete = useSelector(state=>state.mutualFundDelete);
    const {loading:loadingDelete, success: successDelete, error:errorDelete} = mutualFundDelete;
    const dispatch = useDispatch();

    useEffect(()=>{
        if(successSave){
            setModalVisible(false);
        }
        dispatch(listMutualFunds());
        return () =>{
        };
    }, [successSave,successDelete]);

    const openModal = (mutualFund) => {
        setModalVisible(true);
        setId(mutualFund._id);
        setName(mutualFund.name);
        setAmount(mutualFund.amount);
        setMutualFundDate(mutualFund.mutualFundDate);
        setApiLink(mutualFund.apiLink);
        setUnits(mutualFund.units);
    }

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(saveMutualFund({_id:id, name, amount, mutualFundDate, apiLink, units}));
    }

    const deleteHandler = (mutualFundId) => {
        dispatch(deleteMutualFund(mutualFundId));
    }
    
    return (  <>
    {loading?<div>Loading.....</div>:
    error?<div>{error}</div>:(
        <div>
            <Grid container justify="center" style={{display:"flex"}}>
                <AssetCard data={{curValue:mutualFunds.actualValue, invValue:mutualFunds.investValue}}/>
                {mutualFunds.map((mutualFund,count) => (
                    <div key={mutualFund._id}> 
                        <FundCard data={{ fundName:mutualFund.name, fundNav:mutualFund.nav, amount:mutualFund.amount, currentValue:mutualFund.total, gain:mutualFund.profit, gainPercentage:mutualFund.profitPercentage }} />
                    </div>
                ))}
            </Grid>
{/*}    <div className="containt containt-margined">
    <div className="product-header">
        <h3>Mutual Funds</h3>
        <button className="button primary" onClick ={()=>openModal({name:'ICICI PRUDENTIAL TECHNOLOGY FUND - GROWTH',amount:'',mutualFundDate:new Date(),apiLink:'',Units:''})}>New Mutual Fund</button>
    </div>
    {modalVisible && 
    <div className="form">
        <form onSubmit={submitHandler}>
            <ul className="form-container">
                <li>
                    <h2>New Mutual Fund</h2>
                </li>
                <li>
                <label htmlFor="name"> 
                    Mutual Fund Name:
                    </label>
                    <select value={name} name="name" id="name" onChange={(e)=>setName(e.target.value)}>
                        <option value="ICICI PRUDENTIAL TECHNOLOGY FUND - GROWTH">ICICI PRUDENTIAL TECHNOLOGY FUND - GROWTH</option>
                        <option value="SBI HEALTHCARE OPPORTUNITIES FUND - GROWTH">SBI HEALTHCARE OPPORTUNITIES FUND - GROWTH</option>
                        <option value="AXIS BLUECHIP FUNDS - GROWTH">AXIS BLUECHIP FUNDS - GROWTH</option>
                        <option  value="HDFC GOLD FUNDS - GROWTH">HDFC GOLD FUNDS - GROWTH</option>
                        <option  value="HDFC INDEX FUND - NIFTY 50 PLAN - REGULAR PLAN - GROWTH">HDFC INDEX FUND - NIFTY 50 PLAN - REGULAR PLAN - GROWTH</option>
                    </select>
                </li>
                <li>
                    <label htmlFor="amount"> 
                    Amount:
                    </label>
                    <input type="text" value={amount} name="amount" id="amount" onChange={(e)=>setAmount(e.target.value)}>
                    </input>
                </li>
                <li>
                    <label htmlFor="mutualFund_date"> 
                    Mutual Fund Date:
                    </label>
                    <DatePicker selected={new Date(mutualFundDate)} dateFormat="dd/MM/yyyy" onChange={date => setMutualFundDate(date)} />
                </li>
                <li>
                    <label htmlFor="apiLink"> 
                    API Link:
                    </label>
                    <input type="text" value={apiLink} name="apiLink" id="apiLink" onChange={(e)=>setApiLink(e.target.value)}>
                    </input>
                </li>
                <li>
                    <label htmlFor="units"> 
                    Units:
                    </label>
                    <input type="text" value={units} name="units" id="units" onChange={(e)=>setUnits(e.target.value)}>
                    </input>
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
                    <th>Mutual Fund Name</th>
                    <th>Amount</th>
                    <th>API Link</th>
                    <th>Units</th>
                    <th>NAV</th>
                    <th>Total</th>
                    <th>Profit/Loss</th>
                    <th>Profit Percentage</th>
                </tr>
            </thead>
            <tbody>
            {mutualFunds.map((mutualFund,count) => (
              <tr key={mutualFund._id}>
                <td>{count+1}</td>
                <td>{mutualFund.name}</td>
                <td>{mutualFund.amount}</td>
                <td>{mutualFund.apiLink}</td>
                <td>{mutualFund.units}</td>
                <td>{mutualFund.nav}</td>
                <td>{formatNumberCustom((mutualFund.total),'int')}</td>
                <td>{formatNumberCustom((mutualFund.profit),'int')}</td>
                <td>{formatNumberCustom((mutualFund.profitPercentage),'int')}%</td>
                <td>
                  <button onClick={()=>openModal(mutualFund)} className="button">
                    Edit
                  </button>{' '}
                  <button onClick={()=>deleteHandler(mutualFund._id)} className="button">
                    Delete
                  </button>
                </td>
              </tr>
            ))}
            </tbody>
        </table>
    </div>
            </div>*/}
    </div> 
    )}
    </>
    )
}

export default MutualFundScreen;