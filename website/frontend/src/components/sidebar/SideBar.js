import '../../App.css';
import Container from 'react-bootstrap/Container';
import React from 'react';
import DataForm from './DataForm';
import SideBarHeader from './SideBarHeader';
import BetterLine from '../others/BetterLine';
import Explanations from './Explanations';
import { useSelector } from 'react-redux';
import Controls from './form/Controls';
import ShortestPathButton from './form/ShortestPathButton';

const SideBar = () => {

    const explanations = useSelector((state) => state.explanations);

    const inputType = useSelector((state) => state.inputType);

    return (
        <>
            <SideBarHeader />

            <BetterLine color={'#696969'}/>
            <div style={{ marginBottom: '10%' }}>
                <ShortestPathButton/>
            </div>

            {
                inputType === 0 ?
                    <></>
                :

                    <Container className="orange-border"> 
                        <DataForm />
                    </Container>
            }
            <div style={{ marginTop: '10%' }}>
                <Controls/>
            </div>

            <BetterLine color={'#696969'}/>

            <Container style={{ marginBottom: '10%', marginTop: '10%'}}>
                { explanations.length > 0 &&
                    <Explanations />
                }
            </Container>


        </>
    )    
}

export default SideBar;