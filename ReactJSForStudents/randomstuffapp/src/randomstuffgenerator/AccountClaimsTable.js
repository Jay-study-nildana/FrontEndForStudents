import React from 'react';
import styled from 'styled-components';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

//remember to add mui.

//https://mui.com/material-ui/react-table/

function createData(name, calories, fat, carbs, protein) {
    return { name, calories, fat, carbs, protein };
  }

  const rows = [
    createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
    createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
    createData('Eclair', 262, 16.0, 24, 6.0),
    createData('Cupcake', 305, 3.7, 67, 4.3),
    createData('Gingerbread', 356, 16.0, 49, 3.9),
  ];

  const dummyClaims = [
    {
      "type": "iss",
      "value": "loading...1"
    },
    {
      "type": "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier",
      "value": "loading...2"
    },
    {
      "type": "aud1",
      "value": "loading...3"
    },
    {
      "type": "aud2",
      "value": "loading...4"
    },
    {
      "type": "iat",
      "value": "loading...5"
    },
    {
      "type": "exp",
      "value": "loading...6"
    },
    {
      "type": "azp",
      "value": "loading...7"
    },
    {
      "type": "scope",
      "value": "loading...8"
    }
    ];

const AccountClaimsTable = (object) => {
    //remember to unpack your array. when passed, everything come through as an object
    let claimrows = object.claimrows;
    //on initial load, claims might be empty.
    //show dummy data.
    if(claimrows == undefined)
    {
      claimrows = dummyClaims
    }
    console.log(claimrows);

    return (
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Type</TableCell>
                <TableCell align="right">Value</TableCell>
                {/* <TableCell align="right">Fat&nbsp;(g)</TableCell>
                <TableCell align="right">Carbs&nbsp;(g)</TableCell>
                <TableCell align="right">Protein&nbsp;(g)</TableCell> */}
              </TableRow>
            </TableHead>
            <TableBody>
              {claimrows.map((row) => (
                <TableRow
                  key={row.value}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {row.type}
                  </TableCell>
                  <TableCell align="right">{row.value}</TableCell>
                  {/* <TableCell align="right">{row.fat}</TableCell>
                  <TableCell align="right">{row.carbs}</TableCell>
                  <TableCell align="right">{row.protein}</TableCell> */}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      );    

};

export default AccountClaimsTable;