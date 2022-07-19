import './App.css';
import React from "react";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/esm/Row';
import Col from 'react-bootstrap/esm/Col';
import MapHolder from './components/map/MapHolder';
import SideBar from './components/sidebar/SideBar';


const styles = {
    right: {
      height: '100vh',
      padding: 0,
      margin: 0,
      overflow: 'hidden',
      backgroundColor: '#282828'
    },
    left: {
      overflowY: 'scroll',
      overflowX: 'hidden',
      padding: 0,
      height: '100vh',
      backgroundColor: '#404040',
    },
    sh: {
      boxShadow: '5px 5px 5px 5px #ffff'
    }
  }



function App() {
  return (
    <>
        <Container fluid className='App'>
            <Row>
                <Col xs="12" sm="4" md="4" lg="3" style={ styles.left } >
                    <Container>
                        <SideBar />
                    </Container>
                </Col>
                <Col xs="12" sm="8" md="8" lg="9" style={ styles.right }>
                    <Container>
                        <MapHolder />
                    </Container>
                </Col>
            </Row>
        </Container>
    </>
  );
}

export default App;
