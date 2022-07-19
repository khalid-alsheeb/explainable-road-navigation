import React from "react";
import { ListItem, Typography, List, ListItemIcon, ListItemText } from "@material-ui/core";
import Container from 'react-bootstrap/Container';
import CircleIcon from '@mui/icons-material/Circle';
import RoomIcon from '@mui/icons-material/Room';
import { Col, Row } from "react-bootstrap";

const Description = () => {
    return (
        <Container >
            <Typography variant="subtitle2" color="textSecondary" align="left" style={{color: 'white'}}>
                Choose which algorithm/input-mechanism you want to use. You can show the border of the data we use, and reset the data that you have put. When you are ready press get explanations.
            </Typography>
            <Row>
                <Col style={{padding: '0', paddingRight: '0'}}>
                    <List>
                        <ListItem>
                        <ListItemIcon style={{minWidth: '30px'}} >
                            <CircleIcon sx={{color: '#ffeb3b'}}/>
                        </ListItemIcon>
                            <ListItemText>
                                <Typography variant="subtitle2" color="textSecondary" align="left" style={{color: 'white'}}>
                                    Desired Path
                                </Typography>
                            </ListItemText>
                        </ListItem>

                        <ListItem>
                        <ListItemIcon style={{minWidth: '30px'}}>
                            <CircleIcon sx={{color: '#f44336'}}/>
                        </ListItemIcon>
                            <ListItemText>
                                <Typography variant="subtitle2" color="textSecondary" align="left" style={{color: 'white'}}>
                                    Shortest Path
                                </Typography>
                            </ListItemText>
                        </ListItem>

                        <ListItem>
                        <ListItemIcon style={{minWidth: '30px'}}>
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
                <Col style={{padding: '0', paddingLeft: '0'}}>
                    <List>
                        <ListItem>
                        <ListItemIcon style={{minWidth: '30px'}}>
                            <RoomIcon sx={{color: '#1fcf48', fontSize: '200%'}}/>
                        </ListItemIcon>
                            <ListItemText>
                                <Typography variant="subtitle2" color="textSecondary" align="left" style={{color: 'white'}}>
                                    Source node
                                </Typography>
                            </ListItemText>
                        </ListItem>

                        <ListItem>
                        <ListItemIcon style={{minWidth: '30px'}}>
                            <RoomIcon sx={{color: '#f44336', fontSize: '200%'}}/>
                        </ListItemIcon>
                            <ListItemText>
                                <Typography variant="subtitle2" color="textSecondary" align="left" style={{color: 'white'}}>
                                    Target node
                                </Typography>
                            </ListItemText>
                        </ListItem>

                        <ListItem>
                        <ListItemIcon style={{minWidth: '30px'}}>
                            <RoomIcon sx={{color: 'orange', fontSize: '200%'}}/>
                        </ListItemIcon>
                            <ListItemText>
                                <Typography variant="subtitle2" color="textSecondary" align="left" style={{color: 'white'}}>
                                    Waypoint node
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