import React from "react";
import { ListItem, Typography, List, ListItemIcon, ListItemText } from "@material-ui/core";
import Container from 'react-bootstrap/Container';
import CircleIcon from '@mui/icons-material/Circle';

const Description = () => {
    return (
        <Container style={{ marginBottom: '10%'}}>
            <Typography variant="subtitle2" color="textSecondary" align="left" style={{color: 'white'}}>
                Create your path by pressing on the nodes you want. You can flip the source and target nodes, by pressing the button. Also, you can see the border of the data we use and remove it if you want.
            </Typography>
            <List>
                <ListItem>
                <ListItemIcon>
                    <CircleIcon sx={{color: '#ffeb3b'}}/>
                </ListItemIcon>
                    <ListItemText>
                        <Typography variant="subtitle2" color="textSecondary" align="left" style={{color: 'white'}}>
                            Desired Path
                        </Typography>
                    </ListItemText>
                </ListItem>

                <ListItem>
                <ListItemIcon>
                    <CircleIcon sx={{color: '#f44336'}}/>
                </ListItemIcon>
                    <ListItemText>
                        <Typography variant="subtitle2" color="textSecondary" align="left" style={{color: 'white'}}>
                            Shortest Path
                        </Typography>
                    </ListItemText>
                </ListItem>

                <ListItem>
                <ListItemIcon>
                    <CircleIcon sx={{color: '#ff9800'}}/>
                </ListItemIcon>
                    <ListItemText>
                        <Typography variant="subtitle2" color="textSecondary" align="left" style={{color: 'white'}}>
                            Both paths
                        </Typography>
                    </ListItemText>
                </ListItem>
            </List>
        </Container>

    );
}

export default Description;