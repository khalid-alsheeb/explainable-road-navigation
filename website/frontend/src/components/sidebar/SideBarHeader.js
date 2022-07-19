import React from "react";
import Container from 'react-bootstrap/Container';
import Description from "./Description";
import HeaderTop from "./HeaderTop";

const SideBarHeader = () => {
    return (
        <>
            <Container style={{marginTop: '5%', marginBottom: '3%', display: 'flex'}}>
                <HeaderTop />
            </Container>

            <Description />
        </>
    );
}

export default SideBarHeader;