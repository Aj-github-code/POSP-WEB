import React from 'react';

import './ReactDatatable.css';
import Data from './Data.json'

import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

import InfiniteScroll from "react-infinite-scroll-component";


const style = {
    height: 30,
    border: "1px solid green",
    margin: 6,
    padding: 8
  };

  function createData(name, calories, fat, carbs, protein) {
    return { name, calories, fat, carbs, protein };
  }


    

  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  }));
  
  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
      border: 0,
    },
  }));
  

  function ReactDatatable() {
    
    
    const [rows, setRows] = React.useState(20);
    const limit = 10;
  
    const DataLength =  Data.length - 1;
    const [range, setRange] = React.useState(rows);
  // console.log(rows);
  $(window).on('scroll', function() {

    var hT = $('#scroll-to').offset().top,
    hH = $('#scroll-to').outerHeight(),
    wH = $(window).height(),
    wS = $(this).scrollTop();
    if (wS > ((hT+hH-wH)-500)){
    console.log('H1 on the view!');

      setTimeout(() => {
        console.log(DataLength-range);
        if(DataLength !== rows){

          if((DataLength-range) > limit){
            if((rows+limit)>rows){

              setRange(rows+limit);
               setRows(rows+limit);
            }
          } else if((DataLength-range)> 0){
            if((rows+DataLength-range) > rows){

              setRange(rows+DataLength-range);
              setRows(rows+DataLength-range);
            }
          }else {
            console.log('scroll off')
            // $(window).off('scroll');
          
          }
        }
        console.log('Rows: '+rows);
        console.log('Range: '+range);
      }, 1500);
    }
 });

  
  // console.log(rows);

    
    return (
      <div>
      
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table" >
          <TableHead>
            <TableRow>
              <StyledTableCell align="center">Id</StyledTableCell>
              <StyledTableCell align="center">First Name</StyledTableCell>
              <StyledTableCell align="center">Last Name</StyledTableCell>
              <StyledTableCell align="center">Visits</StyledTableCell>
              <StyledTableCell align="center">Progress</StyledTableCell>
              <StyledTableCell align="center">Status Bar</StyledTableCell>

            </TableRow>
          </TableHead>
          <TableBody> 

            {Data.slice(0, rows).map((value, index) => (
              <TableRow key={index+1}>
                <StyledTableCell align="center">{index+1}</StyledTableCell>
                <StyledTableCell align="center">{value.firstName}</StyledTableCell>
                <StyledTableCell align="center">{value.lastName}</StyledTableCell>
                <StyledTableCell align="center">{value.visits}</StyledTableCell>
                <StyledTableCell align="center">{value.progress}</StyledTableCell>
                <StyledTableCell align="center">Active</StyledTableCell>

              </TableRow>
            ))}
          
          <TableRow>
                <StyledTableCell colSpan="4"   id="scroll-to">Loader...</StyledTableCell>


              </TableRow>
        
          </TableBody>
        </Table>
      </TableContainer>
       
      </div>
    );
  }


export default ReactDatatable;
        {/* <InfiniteScroll
          dataLength={10}
          next={this.fetchMoreData}
          hasMore={true}
          loader={<h4>Loading...</h4>}
        >
          {rows.slice(0).map((row, index) => (


            <StyledTableRow key={row.firstName}>
                <StyledTableCell component="th" scope="row">
                {row.name}
                </StyledTableCell>
                <StyledTableCell align="center">{row.lastName}</StyledTableCell>
                <StyledTableCell align="center">{row.visits}</StyledTableCell>
                <StyledTableCell align="center">{row.progress}</StyledTableCell>
                <StyledTableCell align="center">{row.statusBar}</StyledTableCell>
          </StyledTableRow>
          
     
          ))} 
        </InfiniteScroll>*/}