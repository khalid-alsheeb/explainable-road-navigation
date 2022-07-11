import React, { useState } from "react";
import { ListItem, Typography, List, ListItemIcon, ListItemText } from "@material-ui/core";
import Container from 'react-bootstrap/Container';
import { useSelector } from "react-redux";

const Explanations = () => {

    const explanations = useSelector((state) => state.explanations);
    return (
        <Container style={{ marginBottom: '10%'}}>
            <Typography variant="subtitle2" color="textSecondary" align="left" style={{color: 'white'}}>
                The explanations are:
            </Typography>
            <List>

                { explanations.map((exp) => 
                    <ListItem>
                        <Typography variant="subtitle2" color="textSecondary" align="left" style={{color: 'white'}}>
                            {exp}
                        </Typography>
                    </ListItem>
                )}
            </List>
        </Container>

    );
}

export default Explanations;