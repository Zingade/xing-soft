import { Button, makeStyles } from '@material-ui/core'
import React from 'react'

const useStyles = makeStyles(theme => ({
    root:{
        minWidth:0,
        margin:theme.spacing(0.5)
    },
    secondary:{
        backgroundColor: "rgba(255,0,0,0.1)",
        '& .MuiButton-label':{
            color: theme.palette.secondary.main,
        },
    },
    primary:{
        backgroundColor: "rgba(0,0,255,0.1)",
        '& .MuiButton-label':{
            color: theme.palette.primary.main,
        }
    }
}))

export default function ActionButton(props) {
    const {color, variant, children, onClick} = props
    const classes = useStyles()
    return (
        <Button
        variant={variant || "outlined"}
        className={`${classes.root} ${classes[color]}`}
        onClick={onClick}
        >
            {children}
        </Button>
    )
}