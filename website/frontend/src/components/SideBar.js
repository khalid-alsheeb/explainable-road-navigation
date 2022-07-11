import '../App.css';
import Container from 'react-bootstrap/Container';
import React from 'react';
import DataForm from './DataForm';
import SideBarHeader from './SideBarHeader';
import BetterLine from './BetterLine';

const SideBar = () => {

    return (
        <>
            <SideBarHeader />
            
            <BetterLine color={'#696969'}/>

            <Container className="orange-border" style={{ marginBottom: '10%', marginTop: '10%'}}> 
                <DataForm />
            </Container>

            <BetterLine color={'#696969'}/>

            <Container style={{ marginBottom: '10%', marginTop: '10%'}}>
                {/* <Explanations /> */}
            </Container>

            {/* <BetterLine color={'#696969'}/>

            <Container style={{ marginBottom: '10%', marginTop: '10%'}}>
                <Indicators returns={['67%', '100%', '10%']} />
            </Container> */}
        </>
    )    
}

export default SideBar;