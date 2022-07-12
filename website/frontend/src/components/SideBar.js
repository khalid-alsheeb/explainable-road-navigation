import '../App.css';
import Container from 'react-bootstrap/Container';
import React from 'react';
import DataForm from './DataForm';
import SideBarHeader from './SideBarHeader';
import BetterLine from './BetterLine';
import Explanations from './Explanations';
import { useSelector } from 'react-redux';

const SideBar = () => {

    const explanations = useSelector((state) => state.explanations);

    return (
        <>
            <SideBarHeader />
            
            <BetterLine color={'#696969'}/>

            <Container className="orange-border" style={{ marginBottom: '10%', marginTop: '10%'}}> 
                <DataForm />
            </Container>

            <BetterLine color={'#696969'}/>

            <Container style={{ marginBottom: '10%', marginTop: '10%'}}>
                {explanations.length > 0 &&
                    <Explanations />
                }
            </Container>
        </>
    )    
}

export default SideBar;