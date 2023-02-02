import React from "react";
import { Container } from "react-bootstrap";
import Map from "./Map";
import Row from 'react-bootstrap/esm/Row';
import { Typography } from "@material-ui/core";

const MapHolder = () => {

    return(
        <Container style={{ marginTop: '2%', height: '98vh', paddingBottom: '12%'}} >
            <Row style={{justifyContent:'center', alignItems:'center'}}>
                <Typography variant="h3" style={{color: 'white'}} >
                Towards Explainable Road Navigation Systems
                </Typography>
            </Row>
            <Row style={{justifyContent:'center', alignItems:'center', marginBottom: '1%'}}>
                <Typography variant="h6" style={{color: 'white'}} >
                Khalid Alsheeb & Martim Brandao
                </Typography>
            </Row>
            <Map />
        </Container>
    );
}

export default MapHolder;

