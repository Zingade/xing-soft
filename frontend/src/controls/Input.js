import { TextField } from '@material-ui/core'
import React from 'react'


export default function Input(props) {
    const {name, value, label, onChange, ...other} = props

    return (
        <TextField 
        variant="outlined"
        label={label}
        name={name}
        value={value}
        inputProps={{style: {fontSize: 15}}} // font size of input text
        InputLabelProps={{style: {fontSize: 15}}} // font size of input label
        onChange={onChange}
        {...other}
        />
    )
}