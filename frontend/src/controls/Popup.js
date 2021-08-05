import { Dialog, DialogContent, DialogTitle, makeStyles, Typography } from '@material-ui/core'
import React from 'react'

const useStyles = makeStyles(theme => ({
    dialogWrapper:{
        position:'absolute',
        top:theme.spacing(2),
    },
    dialogTitle:{
        paddingRight:'0px',
    }
}))

export default function Popup(props) {
    const {title, children, openPopup, setOpenPopup} = props
    const classes = useStyles()
    return (
        <Dialog open={openPopup} classes={{paper:classes.dialogWrapper}}>
            <DialogTitle className={classes.dialogTitle}>
                <div style={{display:"flex"}}>
                    <Typography variant="h4" component="div" style={{flexGrow:1}}>
                        {title}
                    </Typography>
                </div>
            </DialogTitle>
            <DialogContent dividers>
                {children}
            </DialogContent>
        </Dialog>
    )
}