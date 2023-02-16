import { Button, CircularProgress, Grid, Paper, Typography } from "@mui/material";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";

const url = "http://192.168.1.23:3001"

export default function FourInARow(){
    const [clientId, setClientId] = useState(null);
    const [data,setData] = useState([['x','o','x','x','x','o','o','o'],['x','o','x','x','x','o','o','o'],['x','o','x','x','x','o','o','o'],['x','o','x','x','x','o','o','o'],['x','o','x','x','x','o','o','o'],['x','o','x','x','x','o','o','o'],['x','o','x','x','x','o','o','o'],['x','o','x','x','x','o','o','o']])
    const [grid,setGrid] = useState(<CircularProgress />)
    const [activePlayer, setActivePlayer] = useState('x')
    const [winner,setWinner] = useState('')
    const [listener,setListener] = useState('')
    const [yourTurn, setYourTurn] = useState(false)
    const [prevTurn, setPrevTurn] = useState(true)

    useEffect(()=>{
        console.log(yourTurn)
        if(!yourTurn && prevTurn)
        {
            console.log("start listener")
            setPrevTurn(yourTurn)
            const listen = setInterval(()=>{httpGet("/TicTacToe/game",{})},1000)
            setListener(listen)
            return clearInterval(listener);
        }
        else if(yourTurn && !prevTurn)
        {
            console.log("end listener")
            setPrevTurn(yourTurn)
            clearInterval(listener)
        }
            
    },[yourTurn])

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
        httpGet("/TicTacToe/game",{x:x-1})
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
                if(response.clientId!="")
                    setClientId(response.clientId)
                setData(response.board)
                setYourTurn(response.yourTurn)
                setActivePlayer(response.activePlayer)
                if(response.winner!='')
                {
                    setYourTurn(false)
                    setWinner(response.winner+" won")
                }
                else
                    setWinner("")

            } );
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
                <Button onClick={()=>{httpGet("/TicTacToe/game",{newGame:true})}}>New Game</Button>
            </Paper>
        </React.Fragment>
    )
}

