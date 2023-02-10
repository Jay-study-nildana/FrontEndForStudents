//ListBatman1.js

import { useState } from "react";
import { useEffect } from "react";
import React from 'react';
import batmanData from "../sampledata/batmandata.js";

const ListBatman1 = () => {

    const [batmanDataObject, setbatmanDataObject] = useState({});

    useEffect(() => {
        console.log("ListBatman1.js useEffect");

        //if I don't put this check here, 
        //then the batman data will keeping loading infinitely. 

        if (batmanDataObject === {} || batmanDataObject.length === undefined) {
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
        else {
            console.log("batmanDataObject is not empty");
            console.log(batmanDataObject);
            console.log(batmanDataObject.length);
        }


    }, [batmanDataObject]);

    // const listItems = [
    //     { id: 1, name: 'Cras justo odio' },
    //     { id: 2, name: 'Dapibus ac facilisis in' },
    //     { id: 3, name: 'Morbi leo risus' },
    //     { id: 4, name: 'Porta ac consectetur ac' },
    //     { id: 5, name: 'Vestibulum at eros' },
    // ];

    // const ShowList = () => (
    //     <div className="ListSimple">
    //         <h3>Simple List</h3>
    //         <ul>
    //             {listItems.map((item) => (
    //                 <li key={item.id}>{item.id}. {item.name}</li>
    //             ))}
    //         </ul>
    //     </div>
    // );

    //list that passes data to another component



    // const ShowList2 = () => (
    //     <div className="ListSimple">
    //         <h3>Simple List with item rendered by another component</h3>
    //         <ul>
    //             {listItems.map((item) => (
    //                 // <li key={item.id}>{item.id}. {item.name}</li>
    //                 <IndividualItem item={item} />
    //             ))}
    //         </ul>
    //     </div>
    // );

    // const IndividualItem = ({ item }) => (
    //     <div>
    //         <li key={item.id}>{item.id} {item.name}</li>
    //     </div>
    // );

    const IndividualItemBatman = ({ item }) => (
        <div>
            <li key={item.id}>{item.id} {item.name}</li>
        </div>
    );

    const ShowBatmanList = () => (

        <div>
            {batmanDataObject.map ?
                <div>
                    <h3>Batman List</h3>
                    <ul>
                        {batmanDataObject.map((item) => (
                            // <li key={item.id}>{item.id}. {item.name}</li>
                            <IndividualItemBatman item={item} />
                        ))}
                    </ul>

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
            {/* <ShowList />
            <ShowList2 /> */}
            <ShowBatmanList />

        </div>
    );
};

export default ListBatman1;
