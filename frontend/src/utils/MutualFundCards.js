import React from 'react';
import { Card, CardContent, Grid, makeStyles, Typography } from '@material-ui/core';

const useStyles = makeStyles({
    fundcard:{
        margin:"5px 5px",
        width: 375,
        height:"auto",
        textAlign:"center",    
        borderRadius:"20px"    
    },
    assetcard:{
        margin:"5px 5px",
        width: "98%",
        height:"auto",
        textAlign:"center",
        borderRadius:"20px"    
    },
    assetText:{
        color:"rgb(0,0,0)", 
        fontWeight: 600, 
    },
    profitText:{
        color:"rgb(0,128,0)", 
        fontWeight: 600, 
    },
    curValueText:{
        color:"rgb(0,0,128)", 
        fontWeight: 600, 
    },
    fundName:{
        color:"rgb(128,0,128)", 
        fontWeight: 600, 
    },
    fundNav:{
        color:"rgba(0,0,128,0.5)", 
        fontWeight: 600, 
    },
    fundAmount:{
        color:"rgba(0,128,0,0.5)", 
        fontWeight: 600,
    },
    fundCurValue:{
        color:"rgba(128,0,128,0.5)", 
        fontWeight: 600,
    },
    fundGain:{
        color:"rgba(0,128,0,0.7)", 
        fontWeight: 600,
        fontSize:25,
    },
    fundLoss:{
        color:"rgba(128,0,0,0.7)", 
        fontWeight: 600,
        fontSize:25,
    },
})

const FundCard = (props) => {
    const classes = useStyles();
    const {data} = props;
    return (
        <Grid item component={Card} elevation={10} className={classes.fundcard}>
            <CardContent>
                <Typography variant="h5" className={classes.fundName}>{data.fundName}</Typography>
                <Typography variant="h5" className={classes.fundNav}>Fund NAV: {data.fundNav}</Typography>
                <Typography variant="h5" className={classes.fundAmount}>Invested Amount: {data.amount}</Typography>
                <Typography variant="h5" className={classes.fundCurValue}>Current Value: {parseFloat(data.currentValue).toFixed(0)}</Typography>
                <Typography variant="h5" className={(data.gain>0)?classes.fundGain:classes.fundLoss}>{(data.gain > 0)?"Gain:":"Loss:"} {parseFloat(data.gain).toFixed(0)} ({parseFloat(data.gainPercentage).toFixed(2)}%)</Typography>
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
                <Typography variant="h3" className={classes.curValueText}>{parseFloat(data.curValue).toFixed(0)} </Typography>
                <Typography variant="h4" className={classes.profitText}>{parseFloat(profit).toFixed(0)} ({(profit > 0)?"+":"-"}{profitPer})%</Typography>
            </CardContent>
        </Grid>
    )
}

export {FundCard,AssetCard};