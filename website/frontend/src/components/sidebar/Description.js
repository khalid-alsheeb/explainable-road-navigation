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
                This website is a demo for a paper in explainable navigation apps. It explains to the user why a certain path is not optimal, and more.
            </Typography>
            <Typography variant="subtitle2" color="textSecondary" align="left" style={{color: 'white'}}>
                Drag the source and target nodes around, and then press on the start a journey button, to get the fastest route from start to end.
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