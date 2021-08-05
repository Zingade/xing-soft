import React from 'react'
import Controls from '../controls/Controls';
import {Form} from '../controls/useForm'
import { Grid, makeStyles } from '@material-ui/core'
import { saveMutualFund } from '../actions/mutualFundActions';
import { useDispatch } from 'react-redux';

const useStyles = makeStyles(theme => ({
    button:{
        position:"flex",
        borderRadius:"20px",
        fontSize:12
    }
}))


export default function MutualFundForm(props) {

    const {setOpenPopup, values, setValues} = props
    const dispatch = useDispatch();
    const classes = useStyles()

    const handleInputChange = e => {
        const {name, value} = e.target;
        setValues({
            ...values,
            [name]:value
        })
    }

    const handleSubmit = e => {
        e.preventDefault()
        dispatch(saveMutualFund({_id:values.id, name:values.name, amount:values.amount, mutualFundDate:values.mutualFundDate, apiLink:values.apiLink, units:values.units}));
        setOpenPopup(false);
    }
    const handleCancelEvent = () => {
        setOpenPopup(false)
    }


    return(
        <Form onSubmit={handleSubmit}>
            <Grid container>
                <Grid item xs={12}>
                    <Controls.Input 
                    name="name"
                    label="Name"
                    value={values.name}
                    onChange={handleInputChange}
                    required={true}
                    />
                    <Controls.Input 
                    name="amount"
                    label="Amount"
                    value={values.amount}
                    onChange={handleInputChange}
                    type="number"
                    required={true}
                    />
                    <Controls.DatePicker
                    name="date"
                    value={values.mutualFundDate}
                    label="Date"
                    onChange={handleInputChange}
                    />   
                    <Controls.Input 
                    name="apiLink"
                    label="API Link"
                    value={values.apiLink}
                    onChange={handleInputChange}
                    required={true}
                    />
                    <Controls.Input 
                    name="units"
                    label="Units"
                    value={values.units}
                    onChange={handleInputChange}
                    type="number"
                    required={true}
                    />
                    <Grid container justify="center">
                        <Controls.Button
                        type="submit"
                        text = {(values.id)?"Update":"Create"}
                        className={classes.button}
                        />
                        <Controls.Button
                        onClick={handleCancelEvent}
                        text = "Cancel"
                        className={classes.button}
                        />
                    </Grid>
                </Grid>
            </Grid>
        </Form>
    )
}