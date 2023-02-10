//ListSimple


import React from 'react';
import { ListGroup, ListGroupItem } from "react-bootstrap";

const BasicList = () => (
    <div className="ListSimple">
        <h3>Simple List</h3>
        <ListGroup>
            <ListGroupItem href="#">Cras justo odio</ListGroupItem>
            <ListGroupItem href="#">Dapibus ac facilisis in</ListGroupItem>
            <ListGroupItem href="#">Morbi leo risus</ListGroupItem>
            <ListGroupItem href="#">Porta ac consectetur ac</ListGroupItem>
            <ListGroupItem href="#">Vestibulum at eros</ListGroupItem>
        </ListGroup>
    </div>
);


const ListSimple = () => (
    <div className="container-fluid text-center">
        <h1>Simple List</h1>
        <p className="lead">
            A quick list without any actual data at all. just a list from bootstrap.
        </p>
        <hr></hr>
        <BasicList />

    </div>
);

export default ListSimple;








