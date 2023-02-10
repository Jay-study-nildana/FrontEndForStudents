//ListSimple2.js

//array of objects

import React from 'react';

const ListSimple2 = () => {


    const listItems = [
        { id: 1, name: 'Cras justo odio' },
        { id: 2, name: 'Dapibus ac facilisis in' },
        { id: 3, name: 'Morbi leo risus' },
        { id: 4, name: 'Porta ac consectetur ac' },
        { id: 5, name: 'Vestibulum at eros' },
    ];

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



    const ShowList2 = () => (
        <div className="ListSimple">
            <h3>Simple List with item rendered by another component</h3>
            <ul>
                {listItems.map((item) => (
                    // <li key={item.id}>{item.id}. {item.name}</li>
                    <IndividualItem item={item} />
                ))}
            </ul>
        </div>
    );

    const IndividualItem = ({item}) => (
        <div>
        <li key={item.id}>{item.id} {item.name}</li>
        </div>
    );

    return (
        <div className="container-fluid text-center">
        <h1>List shows Array of Objects</h1>
        <p className="lead">
            another simple list but this time using components
        </p>
        <hr></hr>
        {/* <ShowList /> */}
        <ShowList2 />

    </div>
    );
};

export default ListSimple2;