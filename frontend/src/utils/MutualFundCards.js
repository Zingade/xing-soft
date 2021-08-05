import React from 'react';
import { Card, CardContent, Grid, makeStyles, Typography } from '@material-ui/core';
import Popup from '../controls/Popup'
import MutualFundForm from './MutualFundForm';
import Controls from '../controls/Controls';

const useStyles = makeStyles((theme) => ({
    fundcard:{
        margin:"5px 5px",
        width: 375,
        height:"auto",
        textAlign:"center",    
        borderRadius:"20px",    
        backgroundColor:"#edeeef"   
    },
    assetcard:{
        margin:"5px 5px",
        width: "98%",
        height:"auto",
        textAlign:"center",
        borderRadius:"20px",
        backgroundColor:"#edeeef"   
    },
    assetText:{
        color:"rgb(0,0,0)", 
        fontWeight: 600, 
    },
    profitText:{
        color:"#28a745", 
        fontSize: 30, 
    },
    curValueText:{
        color:"#201aa2dd", 
        fontSize: 45, 
    },
    fundName:{
        color:"#007bff", 
        fontSize: 22, 
    },
    fundNav:{
        color:"#6c757d", 
        fontSize: 20, 
    },
    fundAmount:{
        color:"#6c757d", 
        fontSize: 20, 
    },
    fundCurValue:{
        color:"#6c757d", 
        fontSize: 20, 
    },
    fundGain:{
        color:"#28a745", 
        fontSize:25,
    },
    fundLoss:{
        color:"#ff073a", 
        fontSize:25,
    },
    button: {
        fontSize:15,
        borderRadius:"20px",
        margin: theme.spacing(0),
      },
}))

const FundCard = (props) => {
    const classes = useStyles();
    const {data, openPopup, setOpenPopup, openDialog, formValues, setFormValues} = props;
    const handleEdit = () => {
        openDialog({id:data._id, name: data.name, amount:data.amount, apiLink:data.apiLink, mutualFundDate:data.mutualFundDate, units:data.units})
    }

    return (
        <Grid item component={Card} elevation={10} className={classes.fundcard}>
            <CardContent>
                <Typography variant="h5" className={classes.fundName}>{data.name}</Typography>
                <Typography variant="h5" className={classes.fundNav}>Fund NAV: ₹{data.nav}</Typography>
                <Typography variant="h5" className={classes.fundAmount}>Invested Amount: ₹{data.amount}</Typography>
                <Typography variant="h5" className={classes.fundAmount}>Current Value: ₹{parseFloat(data.total).toFixed(0)}</Typography>
                <Typography variant="h5" className={(data.profit>0)?classes.fundGain:classes.fundLoss}>{(data.profit > 0)?"Gain:":"Loss:"} ₹{parseFloat(data.profit).toFixed(0)} ({parseFloat(data.profitPercentage).toFixed(2)}%)</Typography>
                <Grid container justify="flex-end">
                    <Controls.Button
                        id={data._id}
                        variant="contained"
                        text="Edit"
                        className={classes.button}
                        onClick={handleEdit}
                    >
                    Edit
                    </Controls.Button>
                </Grid>
                <Popup
                title={(formValues.id)?"Update Mutual Fund":"Create New Mutual Fund"}
                openPopup = {openPopup}
                setOpenPopup = {setOpenPopup}
                >
                    <MutualFundForm 
                    values = {formValues}
                    setValues = {setFormValues}
                    setOpenPopup = {setOpenPopup}
                    />
                </Popup>
            </CardContent>
        </Grid>
    )
}

const AssetCard = (props) => {
    const {data} = props;
    const profit = data.curValue - data.invValue;
    const profitPer = parseFloat(profit * 100 / data.invValue).toFixed(2);
    const classes = useStyles();
    return (
        <Grid item component={Card} elevation={10} className={classes.assetcard}>
            <CardContent>
                <Typography variant="subtitle1" className={classes.assetText}>Current Value</Typography>
                <Typography variant="h3" className={classes.curValueText}>₹{parseFloat(data.curValue).toFixed(0)} </Typography>
                <Typography variant="h4" className={classes.profitText}>₹{parseFloat(profit).toFixed(0)} ({(profit > 0)?"+":"-"}{profitPer}%)</Typography>
            </CardContent>
        </Grid>
    )
}

export {FundCard,AssetCard};