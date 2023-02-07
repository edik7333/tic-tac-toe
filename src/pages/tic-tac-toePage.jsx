import { Typography } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import TicTacToe from "../components/games/tic-tac-toe";

export default function TicTacToePage(){
    return(
        <Box width={"100%"} height={"100vh"} sx={{backgroundColor:'primary'}} 
        display="flex"
        justifyContent="center"
        alignItems="center">
            <Box>
                <Typography variant="h2">
                    Tic Tac Toe
                </Typography>
                <TicTacToe/>
            </Box>
            
        </Box>
        
    )
}