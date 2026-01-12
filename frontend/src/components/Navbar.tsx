import React, { useContext } from 'react';
import { AppBar, Toolbar, Typography, IconButton, Menu, MenuItem, Switch } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { useNavigate } from 'react-router-dom';
import { ThemeContext } from '../context/ThemeContext'; // Import the ThemeContext

const Navbar: React.FC = () => {
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const navigate = useNavigate();

    const { themeMode, toggleTheme } = useContext(ThemeContext); // Use the ThemeContext

    const handleMenu = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = (path?: string) => {
        setAnchorEl(null);
        if (path) navigate(path);
    };

    return (
        <AppBar position="static" sx={{ bgcolor: themeMode === 'light' ? '#673ab7' : '#212121' }}>
            <Toolbar>
                <Typography
                    variant="h6"
                    onClick={() => navigate('/dashboard')}
                    sx={{
                        flexGrow: 1,
                        cursor: 'pointer',
                        color: themeMode === 'light' ? 'black' : 'white', // Change text color based on theme
                    }}
                >
                    🧠 AI Task Manager
                </Typography>

                <div>
                    <IconButton size="large" edge="end" color="inherit" onClick={handleMenu}>
                        <MenuIcon />
                    </IconButton>
                    <Menu anchorEl={anchorEl} open={open} onClose={() => handleClose()}>
                        <MenuItem onClick={() => handleClose('/profile')}>Profile</MenuItem>
                        <MenuItem onClick={() => handleClose('/tasks')}>Tasks</MenuItem>
                        <MenuItem onClick={() => handleClose('/logout')}>Logout</MenuItem>
                    </Menu>
                </div>

                {/* Theme Toggle Switch */}
                <div>
                    <Switch
                        checked={themeMode === 'dark'}
                        onChange={toggleTheme}
                        color="default"
                        inputProps={{ 'aria-label': 'theme toggle' }}
                    />
                </div>
            </Toolbar>
        </AppBar>
    );
};

export default Navbar;
