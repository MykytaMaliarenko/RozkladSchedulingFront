import React from 'react';
import PropTypes from 'prop-types';
import Dialog from "@material-ui/core/Dialog";
import ListItem from "@material-ui/core/ListItem";
import List from "@material-ui/core/List";
import DialogTitle from "@material-ui/core/DialogTitle";
import ListItemText from "@material-ui/core/ListItemText";
import Typography from "@material-ui/core/Typography";


const SimpleDialog = (props) => {
    const {
        title, values,
        valueRender, open,
        onClose, onGroupSelected
    } = props;


    return (

        <Dialog onClose={onClose} open={open}>
            <DialogTitle
                disableTypography
            >
                <Typography variant={"subtitle1"}>
                    {title}
                </Typography>
            </DialogTitle>
            <List>
                {values.map(value => {
                    let renderedValue = valueRender ? valueRender(value) : value;
                    return (
                        <ListItem button key={renderedValue}>
                            <ListItemText
                                onClick={() => onGroupSelected(value)}
                                primary={renderedValue}
                                inset
                            />
                        </ListItem>
                    )
                })}
            </List>
        </Dialog>
    );
}

SimpleDialog.propTypes = {
    title: PropTypes.string.isRequired,

    values: PropTypes.array.isRequired,
    valueRender: PropTypes.func,

    open: PropTypes.bool.isRequired,
    onGroupSelected: PropTypes.func.isRequired,
    onClose: PropTypes.func.isRequired,
};

export default SimpleDialog;
