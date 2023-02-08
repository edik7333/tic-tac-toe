import { Typography } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import FourInARow from "../components/games/four_in_a_row";

export default function FourInARowPage(){
    return(
        <Box width={"100%"} height={"100vh"} sx={{backgroundColor:'primary'}} 
        display="flex"
        justifyContent="center"
        alignItems="center">
            <Box>
                <Typography variant="h2">
                    4 In A Row
                </Typography>
                <FourInARow/>
            </Box>
            
        </Box>
        
    )
}