import React from "react";
import { ListItem, Typography, List, ListItemIcon, ListItemText } from "@material-ui/core";
import Container from 'react-bootstrap/Container';
import CircleIcon from '@mui/icons-material/Circle';
import HorizontalRuleIcon from '@mui/icons-material/HorizontalRule';
import RoomIcon from '@mui/icons-material/Room';
import { Col, Row } from "react-bootstrap";
import RemoveIcon from '@mui/icons-material/Remove';

const Description = () => {
    const normalEdge = '#4169E1'
    const changedColor = '#FF00FF'
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
                            <ListItemIcon style={{minWidth: '30px'}}>
                                <HorizontalRuleIcon sx={{color: '#4169E1'}}/>
                            </ListItemIcon>
                            <ListItemText>
                                <Typography variant="subtitle2" color="textSecondary" align="left" style={{color: 'white'}}>
                                    Roads
                                </Typography>
                            </ListItemText>
                        </ListItem>

                        <ListItem>
                            <ListItemIcon style={{minWidth: '30px'}} >
                                <HorizontalRuleIcon sx={{color: '#FFFF00'}}/>
                            </ListItemIcon>
                            <ListItemText>
                                <Typography variant="subtitle2" color="textSecondary" align="left" style={{color: 'white'}}>
                                    Desired path
                                </Typography>
                            </ListItemText>
                        </ListItem>

                        <ListItem>
                            <ListItemIcon style={{minWidth: '30px'}}>
                                <HorizontalRuleIcon sx={{color: '#FF0000'}}/>
                            </ListItemIcon>
                            <ListItemText>
                                <Typography variant="subtitle2" color="textSecondary" align="left" style={{color: 'white'}}>
                                    Shortest path
                                </Typography>
                            </ListItemText>
                        </ListItem>

                        <ListItem>
                            <ListItemIcon style={{minWidth: '30px'}}>
                                <HorizontalRuleIcon sx={{color: '#FF8C00'}}/>
                            </ListItemIcon>
                            <ListItemText>
                                <Typography variant="subtitle2" color="textSecondary" align="left" style={{color: 'white'}}>
                                    Overlap of desired and shortest path
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
                                <RoomIcon sx={{color: '#FF0000', fontSize: '200%'}}/>
                            </ListItemIcon>
                            <ListItemText>
                                <Typography variant="subtitle2" color="textSecondary" align="left" style={{color: 'white'}}>
                                    Target node
                                </Typography>
                            </ListItemText>
                        </ListItem>

                        <ListItem>
                            <ListItemIcon style={{minWidth: '30px'}}>
                                <RoomIcon sx={{color: '#FF8C00', fontSize: '200%'}}/>
                            </ListItemIcon>
                            <ListItemText>
                                <Typography variant="subtitle2" color="textSecondary" align="left" style={{color: 'white'}}>
                                    Waypoint node
                                </Typography>
                            </ListItemText>
                        </ListItem>

                        <ListItem style={{paddingTop: '1%', paddingLeft: '11%'}}>
                            <ListItemIcon style={{minWidth: '30px'}}>
                                <HorizontalRuleIcon sx={{color: '#FF00FF'}}/>
                            </ListItemIcon>
                            <ListItemText>
                                <Typography variant="subtitle2" color="textSecondary" align="left" style={{color: 'white'}}>
                                    Explanation
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