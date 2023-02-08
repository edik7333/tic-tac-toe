import { Button, Grid, Paper, Typography } from "@mui/material";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";

const url = "http://127.0.0.1:3001"

export default function FourInARow(){
    const [data,setData] = useState([['x','o','x','x','x','o','o','o'],['x','o','x','x','x','o','o','o'],['x','o','x','x','x','o','o','o'],['x','o','x','x','x','o','o','o'],['x','o','x','x','x','o','o','o'],['x','o','x','x','x','o','o','o'],['x','o','x','x','x','o','o','o'],['x','o','x','x','x','o','o','o']])
    const [grid,setGrid] = useState()
    const [activePlayer, setActivePlayer] = useState('x')
    const [winner,setWinner] = useState('')

    useEffect(()=>{
        let tempGrid = []
        let tempRow = []

        for(var x=0;x<data[0].length;x++)
        {
            tempRow.push(<Grid id={""+(x+1)} item xs={1} height={40}> <Button onClick={()=>{handleClick(x)}} variant="text">{x+1}</Button></Grid>)
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

    const handleClick = (who,x)=>{
        if(who!='')
            return
        httpGet("/TicTacToe/game",{x:x})
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
                setActivePlayer(response.yourTurn==true?'x':'o')
                if(response.winner!='')
                    setWinner(response.winner+" won")

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
            </Paper>
        </React.Fragment>
    )
}

