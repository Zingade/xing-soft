import Axios from "axios"
import { ConnectionPolicyPage } from "twilio/lib/rest/voice/v1/connectionPolicy";
import { mutualFundsDetails } from "../constants/commonConstants";
import { MUTUAL_FUND_DELETE_FAIL, MUTUAL_FUND_DELETE_REQUEST, MUTUAL_FUND_DELETE_SUCCESS, MUTUAL_FUND_LIST_FAIL, MUTUAL_FUND_LIST_REQUEST, MUTUAL_FUND_LIST_SUCCESS, MUTUAL_FUND_SAVE_FAIL, MUTUAL_FUND_SAVE_REQUEST, MUTUAL_FUND_SAVE_SUCCESS } from '../constants/mutualFundConstants'

const listMutualFunds = () => async (dispatch) => {
  try {
      dispatch({ type: MUTUAL_FUND_LIST_REQUEST });
      let { data } = await Axios.get('/api/mutualfunds');
      data.investValue = 0
      data.actualValue = 0;
      for (let i=0; i<data.length; i++)
      {
        await Axios.get(data[i].apiLink)
                  .then((response) => {
                    // handle success
                    data[i].nav = parseFloat(response.data.data[0].nav)
                    data[i].total = data[i].nav * data[i].units 
                    data[i].profit = data[i].total - data[i].amount 
                    data[i].profitPercentage = (data[i].profit * 100)/data[i].total
                    data.investValue += data[i].amount
                    data.actualValue += data[i].total
                  })
                  .catch((error) => {
                    // handle error
                    console.log(error);
                  })
      }
      dispatch({ type: MUTUAL_FUND_LIST_SUCCESS, payload: data });
    } catch (error) {
        dispatch({ type: MUTUAL_FUND_LIST_FAIL, payload: error.message });
    }
  };
  
const saveMutualFund = (mutualFund) => async (dispatch, getState) => {
    try{
        dispatch({type:MUTUAL_FUND_SAVE_REQUEST, payload:mutualFund});
        const {userSignin: {userInfo}} = getState();
        if(!mutualFund._id){
            const {data} = await Axios.post('/api/mutualfunds', mutualFund, {
                headers: {Authorization: 'Bearer ' + userInfo.token,} 
            });
            dispatch({type:MUTUAL_FUND_SAVE_SUCCESS, payload:data});
        }
        else {
            const {data} = await Axios.put('/api/mutualfunds/' + mutualFund._id, mutualFund, {
                headers: {Authorization: 'Bearer ' + userInfo.token,} 
            });
            dispatch({type:MUTUAL_FUND_SAVE_SUCCESS, payload:data});
        }
    }
    catch(error){
        dispatch({type: MUTUAL_FUND_SAVE_FAIL, payload:error.message});
    }
} 

const deleteMutualFund = (mutualFundId) => async (dispatch, getState) => {
    try{
        const {userSignin: {userInfo}} = getState();
        dispatch({type:MUTUAL_FUND_DELETE_REQUEST, payload:mutualFundId});
            const {data} = await Axios.delete('/api/mutualfunds/' + mutualFundId, {
                headers: {Authorization: 'Bearer ' + userInfo.token,} 
            });
            dispatch({type:MUTUAL_FUND_DELETE_SUCCESS, payload:data,sucess:true});
        }
    catch(error){
        dispatch({type: MUTUAL_FUND_DELETE_FAIL, payload:error.message});
    }
} 


export {listMutualFunds,saveMutualFund,deleteMutualFund}; 

/*const listMutualFunds = () => async (dispatch) => {
    let iciciPrud, sbiHC, axisBlueChip, hdfcGold, hdfcIndex;    
    try {
      dispatch({ type: MUTUAL_FUND_LIST_REQUEST });

      await Axios.get('https://api.mfapi.in/mf/100363')
                              .then((response) => {
                                // handle success
                                iciciPrud = parseFloat(response.data.data[0].nav)
                              })
                              .catch((error) => {
                                // handle error
                                console.log(error);
                              })
      await Axios.get('https://api.mfapi.in/mf/102823')
                              .then((response) => {
                                // handle success
                                sbiHC = parseFloat(response.data.data[0].nav)
                              })
                              .catch((error) => {
                                // handle error
                                console.log(error);
                              })
      await Axios.get('https://api.mfapi.in/mf/112277')
                              .then((response) => {
                                // handle success
                                axisBlueChip = parseFloat(response.data.data[0].nav)
                              })
                              .catch((error) => {
                                // handle error
                                console.log(error);
                              })
      await Axios.get('https://api.mfapi.in/mf/115934')
                              .then((response) => {
                                // handle success
                                hdfcGold = parseFloat(response.data.data[0].nav)
                              })
                              .catch((error) => {
                                // handle error
                                console.log(error);
                              })
      await Axios.get('https://api.mfapi.in/mf/101525')
                              .then((response) => {
                                // handle success
                                hdfcIndex = parseFloat(response.data.data[0].nav)
                              })
                              .catch((error) => {
                                // handle error
                                console.log(error);
                              })
      console.log(iciciPrud, sbiHC, axisBlueChip, hdfcGold, hdfcIndex)
      dispatch({ type: MUTUAL_FUND_LIST_SUCCESS, payload: {iciciPrud:iciciPrud, sbiHC:sbiHC, axisBlueChip:axisBlueChip, hdfcGold:hdfcGold, hdfcIndex:hdfcIndex} });
    } catch (error) {
      dispatch({ type: MUTUAL_FUND_LIST_FAIL, payload: error.message });
    }
  };

export {listMutualFunds};*/