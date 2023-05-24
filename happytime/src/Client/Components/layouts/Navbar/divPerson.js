import React from "react";
import Dropdown from 'react-bootstrap/Dropdown';

const DivPerson = () => {
    return (
       
        <Dropdown>
            <Dropdown.Toggle style={{backgroundColor:"#DCDCDC",  }} id="dropdown-basic">
                   
            </Dropdown.Toggle>

            <Dropdown.Menu>
                <Dropdown.Item href="#/action-1">Profile</Dropdown.Item>
                <Dropdown.Item href="#/action-2">Cham</Dropdown.Item>
                <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
            </Dropdown.Menu>
        </Dropdown>
    );
}

export default DivPerson