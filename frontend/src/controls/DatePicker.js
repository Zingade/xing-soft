import React from 'react'
import {KeyboardDatePicker, MuiPickersUtilsProvider} from '@material-ui/pickers'
import DateFnsUtils from '@date-io/date-fns'

export default function DatePicker(props) {
    const {name, value, label, onChange} = props
    const convertToDefEventPara = (name, value) => ({
        target:{
            name, value
        }
    })
    return (
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <KeyboardDatePicker disableToolbar variant="inline" inputVariant="outlined" 
                label={label}
                format={"dd/MM/yyyy"}
                name={name}
                inputProps={{style: {fontSize: 15}}} // font size of input text
                InputLabelProps={{style: {fontSize: 15}}} // font size of input label
                value={value}
                onChange={date => onChange(convertToDefEventPara(name, date))}
                />
        </MuiPickersUtilsProvider>
    )
}