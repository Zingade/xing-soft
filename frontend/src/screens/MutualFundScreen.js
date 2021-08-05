import React, { useEffect, useState } from 'react';
import {useSelector, useDispatch} from 'react-redux';
import { deleteMutualFund, listMutualFunds } from '../actions/mutualFundActions';
import "react-datepicker/dist/react-datepicker.css";
import {FundCard, AssetCard} from '../utils/MutualFundCards'
import { Grid, makeStyles } from '@material-ui/core'
import Controls from '../controls/Controls';

const useStyles = makeStyles(theme => ({
        newButton:{
            position:"flex",
            borderRadius:"20px",
            fontSize:15
        }
}))

let initialFValues = {
    id:0,
    name:'',
    amount:0,
    mutualFundDate: new Date(),
    apiLink:'',
    units:0,
}

function MutualFundScreen(props) {
    const classes = useStyles() 
    const [formValues, setFormValues] = useState({})
    const [openPopup, setOpenPopup] = useState(false);

    const mutualFundList = useSelector(state=>state.mutualFundList);
    const {loading, mutualFunds, error} = mutualFundList;
    const mutualFundSave = useSelector(state=>state.mutualFundSave);
    const {loading:loadingSave, success: successSave, error:errorSave} = mutualFundSave;
    const mutualFundDelete = useSelector(state=>state.mutualFundDelete);
    const {loading:loadingDelete, success: successDelete, error:errorDelete} = mutualFundDelete;
    const dispatch = useDispatch();

    const openDialog = (mutualFund) => {
        setFormValues({id:mutualFund.id, name:mutualFund.name, amount: mutualFund.amount, apiLink:mutualFund.apiLink, mutualFundDate:mutualFund.mutualFundDate, units:mutualFund.units})
        setOpenPopup(true)
    }

    useEffect(()=>{
        dispatch(listMutualFunds());
        return () =>{
        };
    }, [successSave,successDelete]);

    const handleAddNew = () => {
        openDialog(initialFValues)
    }

    return (  
    <>
        {loading?<div>Loading.....</div>:
        error?<div>{error}</div>:(
            <div>
                <Grid container justify="center" style={{display:"flex"}}>
                    <AssetCard data={{curValue:mutualFunds.actualValue, invValue:mutualFunds.investValue}}/>
                    {mutualFunds.map((mutualFund,count) => (
                        <div key={mutualFund._id}> 
                            <FundCard 
                            data={mutualFund}
                            openDialog={openDialog}
                            formValues={formValues}
                            setFormValues={setFormValues}
                            openPopup={openPopup}
                            setOpenPopup={setOpenPopup} 
                            />
                        </div>
                    ))}
                </Grid>
                <Grid container justify="center">
                    <Controls.Button 
                    className={classes.newButton} 
                    text="Add New" 
                    variant="contained"
                    onClick={handleAddNew}
                    />
                </Grid>
            </div> 
        )}
    </>
    )
}

export default MutualFundScreen;