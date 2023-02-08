import { AppBar, CssBaseline, Stack, Toolbar } from "@mui/material";
import {React, useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import NightlightIcon from '@mui/icons-material/Nightlight';
import { darkTheme, themeContext, whiteTheme } from "../../App";


const pages = ['4InARow', 'Pricing', 'Support'];
const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];



function MyNav()
{
    const [anchorElNav, setAnchorElNav] = useState(null);
    const [userBox, setUserBox] = useState(<Button variant="contained" color="secondary" href="login">Login</Button>);
    const navigate = useNavigate();
    const themeContext1 = useContext(themeContext)

    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);
    };
    

    const handleCloseNavMenu = (event, page) => {
        setAnchorElNav(null);
        navigate("/"+page)
    };


    return (
        <AppBar position="fixed" sx={{background: 'transparent', boxShadow: 'none'}}>
        <Container maxWidth="xl">
            <Toolbar disableGutters>
            <AdbIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
            <Typography
                variant="h6"
                noWrap
                component="a"
                href="/"
                sx={{
                mr: 2,
                display: { xs: 'none', md: 'flex' },
                fontFamily: 'monospace',
                fontWeight: 700,
                letterSpacing: '.3rem',
                color: 'inherit',
                textDecoration: 'none',
                }}
            >
                LOGO
            </Typography>

            <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleOpenNavMenu}
                color="inherit"
                >
                <MenuIcon />
                </IconButton>
                <Menu
                id="menu-appbar"
                anchorEl={anchorElNav}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                }}
                keepMounted
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'left',
                }}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
                sx={{
                    display: { xs: 'block', md: 'none' },
                }}
                >
                {pages.map((page) => (
                    <MenuItem key={page} onClick={event => handleCloseNavMenu(event, page)}>
                        <Typography textAlign="center">{page}</Typography>
                    </MenuItem>
                ))}
                </Menu>
            </Box>
            <AdbIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
            <Typography
                variant="h5"
                noWrap
                component="a"
                href=""
                sx={{
                mr: 2,
                display: { xs: 'flex', md: 'none' },
                flexGrow: 1,
                fontFamily: 'monospace',
                fontWeight: 700,
                letterSpacing: '.3rem',
                color: 'inherit',
                textDecoration: 'none',
                }}
            >
                LOGO
            </Typography>
            <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                {pages.map((page) => (
                <Button
                    key={page}
                    onClick={event => handleCloseNavMenu(event, page)}
                    sx={{ my: 2, color: 'white', display: 'block' }}
                >
                    {page}
                </Button>
                ))}
            </Box>
            <Stack direction="row" spacing={1}>
            <IconButton color="default" aria-label="dark mode" onClick={() => {
                let theme = themeContext1.theme==whiteTheme?darkTheme:whiteTheme
                themeContext1.setTheme(theme)
                if(theme==darkTheme)
                    localStorage.setItem("theme", "darkTheme")
                else
                    localStorage.removeItem("theme")
                }}>
                {themeContext1.theme.palette.mode === 'dark' ? <Brightness7Icon /> : <NightlightIcon />}
            </IconButton>
            </Stack>
            </Toolbar>
        </Container>
        </AppBar>
        )
}


export default MyNav