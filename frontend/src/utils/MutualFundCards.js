import React from 'react';
import { Button, Card, CardContent, Grid, makeStyles, Typography } from '@material-ui/core';
//import { MdModeEdit } from "react-icons/md"

const useStyles = makeStyles((theme) => ({
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
        fontSize: 30, 
    },
    curValueText:{
        color:"rgb(0,0,200)", 
        fontWeight: 600, 
        fontSize: 40, 
    },
    fundName:{
        color:"rgb(128,0,128)", 
        fontWeight: 600, 
        fontSize: 22, 
    },
    fundNav:{
        color:"rgba(0,0,128,0.8)", 
        fontWeight: 600, 
        fontSize: 20, 
    },
    fundAmount:{
        color:"rgba(0,0,128,0.8)", 
        fontWeight: 600,
        fontSize: 20, 
    },
    fundCurValue:{
        color:"rgba(0,0,128,0.8)", 
        fontWeight: 600,
        fontSize: 20, 
    },
    fundGain:{
        color:"rgb(0,128,0)", 
        fontWeight: 600,
        fontSize:25,
        fontSize: 25, 
    },
    fundLoss:{
        color:"rgb(128,0,0)", 
        fontWeight: 600,
        fontSize:25,
    },
    button: {
        margin: theme.spacing(0),
      },
}))

const FundCard = (props) => {
    const classes = useStyles();
    const {data} = props;
    /*const handleEditEvent = (e) => {
        console.log(e.target)
    }*/
    return (
        <Grid item component={Card} elevation={10} className={classes.fundcard}>
            <CardContent>
                <Typography variant="h5" className={classes.fundName}>{data.name}</Typography>
                <Typography variant="h5" className={classes.fundNav}>Fund NAV: ₹{data.nav}</Typography>
                <Typography variant="h5" className={classes.fundAmount}>Invested Amount: ₹{data.amount}</Typography>
                <Typography variant="h5" className={classes.fundAmount}>Current Value: ₹{parseFloat(data.total).toFixed(0)}</Typography>
                <Typography variant="h5" className={(data.profit>0)?classes.fundGain:classes.fundLoss}>{(data.profit > 0)?"Gain:":"Loss:"} ₹{parseFloat(data.profit).toFixed(0)} ({parseFloat(data.profitPercentage).toFixed(2)}%)</Typography>
                {/*<Button
                    id={data._id}
                    variant="contained"
                    color="primary"
                    className={classes.button}
                    startIcon={<MdModeEdit />}
                    onClick={handleEditEvent}
                >
                    Edit
                </Button>*/}
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