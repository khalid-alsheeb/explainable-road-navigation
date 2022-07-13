import React from "react";
import { ListItem, Typography, List, ListItemIcon, ListItemText } from "@material-ui/core";
import Container from 'react-bootstrap/Container';
import CircleIcon from '@mui/icons-material/Circle';
import RoomIcon from '@mui/icons-material/Room';
import { Col, Row } from "react-bootstrap";

const Description = () => {
    return (
        <Container style={{ marginBottom: '10%'}}>
            <Typography variant="subtitle2" color="textSecondary" align="left" style={{color: 'white'}}>
                {/* Create your path by pressing on the nodes you want. You can flip the source and target nodes, by pressing the button. Also, you can see the border of the data we use and remove it if you want. */}
                Choose which algorithm/input-mechanism you want to use. You can show the border of the data we use, and reset the data that you have put. When you are ready press get explanations.
            </Typography>
            <Row>
                <Col>
                    <List>
                        <ListItem>
                        <ListItemIcon style={{minWidth: '40px'}}>
                            <CircleIcon sx={{color: '#ffeb3b'}}/>
                        </ListItemIcon>
                            <ListItemText>
                                <Typography variant="subtitle2" color="textSecondary" align="left" style={{color: 'white'}}>
                                    Desired Path
                                </Typography>
                            </ListItemText>
                        </ListItem>

                        <ListItem>
                        <ListItemIcon style={{minWidth: '40px'}}>
                            <CircleIcon sx={{color: '#f44336'}}/>
                        </ListItemIcon>
                            <ListItemText>
                                <Typography variant="subtitle2" color="textSecondary" align="left" style={{color: 'white'}}>
                                    Shortest Path
                                </Typography>
                            </ListItemText>
                        </ListItem>

                        <ListItem>
                        <ListItemIcon style={{minWidth: '40px'}}>
                            <CircleIcon sx={{color: '#ff9800'}}/>
                        </ListItemIcon>
                            <ListItemText>
                                <Typography variant="subtitle2" color="textSecondary" align="left" style={{color: 'white'}}>
                                    Both paths
                                </Typography>
                            </ListItemText>
                        </ListItem>
                    </List>
                </Col>
                <Col>
                    <List>
                        <ListItem>
                        <ListItemIcon style={{minWidth: '40px'}}>
                            <RoomIcon sx={{color: '#1fcf48'}}/>
                        </ListItemIcon>
                            <ListItemText>
                                <Typography variant="subtitle2" color="textSecondary" align="left" style={{color: 'white'}}>
                                    Source node
                                </Typography>
                            </ListItemText>
                        </ListItem>

                        <ListItem>
                        <ListItemIcon style={{minWidth: '40px'}}>
                            <RoomIcon sx={{color: '#f44336'}}/>
                        </ListItemIcon>
                            <ListItemText>
                                <Typography variant="subtitle2" color="textSecondary" align="left" style={{color: 'white'}}>
                                    Target node
                                </Typography>
                            </ListItemText>
                        </ListItem>
                    </List>
                </Col>
            </Row>
        </Container>

    );
}

export default Description;