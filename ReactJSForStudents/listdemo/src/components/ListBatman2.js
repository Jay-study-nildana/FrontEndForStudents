//ListBatman2.js

import { useState } from "react";
import { useEffect } from "react";
import React from 'react';
import Accordion from 'react-bootstrap/Accordion';
import batmanData from "../sampledata/batmandata.js";


const ListBatman2 = () => {

    const [batmanDataObject, setbatmanDataObject] = useState({});

    useEffect(() => {
        console.log("ListBatman2.js useEffect");

        //if I don't put this check here, 
        //then the batman data will keeping loading infinitely. 

        if(batmanDataObject==={} || batmanDataObject.length === undefined)
        {
        //initialize the batmanData object
        batmanData.constructor()
        //updated collection of batman data with id
        batmanData.addId();
        // console.log(batmanData);
        // console.log(batmanData.constructor());
        // console.log(batmanData.getBatmanData());
        // console.log(batmanData.getBatmanDataById(1));

        setbatmanDataObject(batmanData.getBatmanData());
        console.log(batmanDataObject);
        }
        else
        {
            console.log("batmanDataObject is not empty");
            console.log(batmanDataObject);
            console.log(batmanDataObject.length);
        }


    }, [batmanDataObject]);

    const IndividualItemBatman = ({ item }) => (
        <div>
            <li key={item.id}>{item.id} {item.name}</li>
        </div>
    );

    const ShowBatmanList = () => (

        <div>
            {batmanDataObject.map ?             
            <div>
            <h3>Accordion List</h3>
            <Accordion defaultActiveKey="0">
                {batmanDataObject.map((item) => (
                    <Accordion.Item eventKey={item.id}>
                        <Accordion.Header>{item.id} {item.name}</Accordion.Header>
                        <Accordion.Body>
                            <p>
                            Age : {item.age} <br></br>
                            location : {item.location} <br></br>


                            </p>
                        </Accordion.Body>
                    </Accordion.Item>
                ))}
            </Accordion>
            {/* <h3>Batman List basic</h3>
            <ul>
                {batmanDataObject.map((item) => (
                    // <li key={item.id}>{item.id}. {item.name}</li>
                    <IndividualItemBatman item={item} />
                ))}
            </ul> */}

            </div> 
            : <div>batmanData is false</div>}

        </div>
    );

    return (
        <div className="container-fluid text-center">
            <h1>Batman List with Functions feeding data</h1>
            <p className="lead">
                getting a simple array object from a function in a separate file
            </p>
            <hr></hr>
            <ShowBatmanList />

        </div>
    );
};

export default ListBatman2;
