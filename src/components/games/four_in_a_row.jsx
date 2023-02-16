import { Button, CircularProgress, Grid, Paper, Typography } from "@mui/material";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";

const url = "http://192.168.1.35:3001"

export default function FourInARow(){
    const [data,setData] = useState([['x','o','x','x','x','o','o','o'],['x','o','x','x','x','o','o','o'],['x','o','x','x','x','o','o','o'],['x','o','x','x','x','o','o','o'],['x','o','x','x','x','o','o','o'],['x','o','x','x','x','o','o','o'],['x','o','x','x','x','o','o','o'],['x','o','x','x','x','o','o','o']])
    const [grid,setGrid] = useState(<CircularProgress />)
    const [activePlayer, setActivePlayer] = useState('x')
    const [winner,setWinner] = useState('')

    useEffect(()=>{
        initUpdates("/4InARow/events",{})
    },[])

    useEffect(()=>{
        let tempGrid = []
        let tempRow = []

        for(var x=0;x<data[0].length;x++)
        {
            tempRow.push(<Grid id={""+(x+1)} item xs={1} height={40}> <Button value={x+1} onClick={(event)=>{handleClick(event.target.value)}} variant="text">{x+1}</Button></Grid>)
        }
        tempGrid.push(
            <Grid container item xs={12} columns={8}>{tempRow}</Grid>
        )

        for(var y=0;y<data.length;y++)
        {
            tempRow = []
            for(var x=0;x<data[0].length;x++)
            {
                const dataXY = data[x][y]
                const color = dataXY=='x'?"error":"primary"
                tempRow.push(<Grid id={""+(y*3)+(x+1)} item xs={1} height={40}><Typography color={color}>{dataXY}</Typography></Grid>)
            }
            tempGrid.push(
                <Grid container item xs={12} columns={8}>{tempRow}</Grid>
            )
            
        }
        setGrid(tempGrid)
    }
    ,[data])

    const handleClick = (x)=>{
        console.log("test "+x)
        httpGet("/4InARow/game",{x:x-1})
    }
    
    function httpGet(path,params)
    {
        const options = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify( params ),
        };
        fetch( url+path, options )
            .then( response => response.json() )
            .then( response => {
            } );
    }

    function initUpdates(path,params)
    {

        const eventSource = new EventSource(url+path);
        // Log connection open event
        eventSource.addEventListener('open', () => {
            console.log('Connection opened!');
        });

        // Log received message event
        eventSource.addEventListener('message', (event) => {
            const response = JSON.parse(event.data);
                setData(response.board)
                setActivePlayer(response.activePlayer)
                if(response.winner!='')
                {
                    setWinner(response.winner+" won")
                }
                else
                    setWinner("")
        });

        // Log connection error event
        eventSource.addEventListener('error', () => {
            console.log('Error occurred!');
        });
    
        // Cleanup function to close the connection on unmount
        return () => {
            eventSource.close();
        };
    }

    return(
        <React.Fragment>
            <Typography variant="h6">
                {activePlayer} now plays
            </Typography>
            <Typography color={'secondary'}>
                {winner}
            </Typography>
            <Paper>
                <Grid container m={2} spacing={2}>
                    {grid}
                </Grid>
                <Button onClick={()=>{httpGet("/4InARow/game",{newGame:true})}}>New Game</Button>
            </Paper>
        </React.Fragment>
    )
}

