import React from 'react';
import PropTypes from 'prop-types';
import Typography from "@material-ui/core/Typography";
import ButtonBase from "@material-ui/core/ButtonBase";
import Box from "@material-ui/core/Box";

const Field = (props) => {
    let {name, value, onClick} = props;
    return (
        <ButtonBase
            focusRipple
            onClick={onClick}
        >
            <Box
                p={1}
                pl={0}
            >
                <Typography
                    variant={"body2"}
                    align={'left'}
                    display={"inline"}
                >
                    {name}:
                </Typography>

                <Box marginLeft={0.5} display={"inline"}>
                    <Typography
                        variant={"body2"}
                        color={"textSecondary"}
                        align={'left'}
                        display={"inline"}
                    >
                        {value}
                    </Typography>
                </Box>
            </Box>
        </ButtonBase>
    )
}

Field.propTypes = {
    name: PropTypes.string.isRequired,
    value: PropTypes.any.isRequired,

    onClick: PropTypes.func,
}

export default Field;