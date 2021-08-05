import { FormControl, InputLabel, MenuItem, Select as MuiSelect } from '@material-ui/core'
import React from 'react'

export default function Select(props) {
    const {name, value, label, onChange, options} = props
    return (
        <FormControl style={{maxWidth:"90vw"}}
        variant="outlined">
            <InputLabel>{label}</InputLabel>
            <MuiSelect 
            name={name}
            label={label}
            value={value}
            onChange={onChange}
            >
                {
                    options.map(item => (
                        <MenuItem key={item.fundName} value={item.fundName}>{item.fundName}</MenuItem>
                    ))
                }
            </MuiSelect>
        </FormControl>
    )
}