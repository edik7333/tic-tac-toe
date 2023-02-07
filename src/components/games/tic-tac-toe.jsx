import { Button, Grid, Paper } from "@mui/material";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";

const url = "http://127.0.0.1:3001"

export default function TicTacToe(){
    const [data,setData] = useState([['x','o',''],['x','x','o'],['x','o','o']])
    const [grid,setGrid] = useState()

    useEffect(()=>{
        let tempGrid = []
        for(var x=0;x<data.length;x++)
        {
            const tempRow = []
            for(var y=0;y<data[0].length;y++)
            {
                const dataXY = data[y][x]
                const color = dataXY=='x'?"error":"primary"
                tempRow.push(<Grid item height={40} xs={4}><Button sx={{height:40}} onClick={()=>{handleClick(dataXY, x, y)}} color={color} variant="text">{dataXY}</Button></Grid>)
            }
            tempGrid.push(
                <Grid item>{tempRow}</Grid>
            )
            
        }
        console.log(tempGrid)
        setGrid(tempGrid)
    }
    ,[data])

    const handleClick = (who,x,y)=>{
        console.log(x+","+y)
        if(who!='')
            return
        httpGet("/TicTacToe/game",{x:x,
        y:y})
    }
    
    function httpGet(path,params)
    {
        const options = {
            method: 'POST',
            body: JSON.stringify( params ),
        };
        fetch( url+path, options )
            .then( response => response.json() )
            .then( response => {
                setData(response.board)
            } );
    }

    return(
    
        <Paper>
            <Grid container m={2} spacing={2}>
                {grid}
            </Grid>
        </Paper>
    
    )
}

