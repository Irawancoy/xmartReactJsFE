import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';
import { useNavigate } from 'react-router-dom';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

// Daftar halaman yang akan ditampilkan di menu navigasi
const pages = ['Belanja', 'List'];

function Navbar() {
  const [anchorElNav, setAnchorElNav] = React.useState(null); // State untuk menu navigasi
  const [anchorElList, setAnchorElList] = React.useState(null); // State untuk submenu "List"
  const navigate = useNavigate();

  // Fungsi untuk membuka menu navigasi
  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  // Fungsi untuk menutup menu navigasi
  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  // Fungsi untuk membuka submenu "List"
  const handleOpenListMenu = (event) => {
    setAnchorElList(event.currentTarget);
  };

  // Fungsi untuk menutup submenu "List"
  const handleCloseListMenu = () => {
    setAnchorElList(null);
  };

  // Fungsi untuk menangani klik navigasi
  const handleNavClick = (page, event) => {
    if (page === 'List') {
      handleOpenListMenu(event); // Buka submenu "List" jika halaman "List" diklik
    } else {
      navigate(`/${page}`); // Arahkan ke halaman yang sesuai
      handleCloseNavMenu(); // Tutup menu navigasi
    }
  };

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          {/* Logo dan navigasi utama */}
          <Typography
            variant="h6"
            noWrap
            component="a"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
            onClick={() => navigate('/')}
          >
           XMART
          </Typography>

          {/* Menu navigasi untuk tampilan kecil */}
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
                <MenuItem key={page} onClick={(event) => handleNavClick(page, event)}>
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
            onClick={() => navigate('/')}
          >
            LOGO
          </Typography>
          {/* Menu navigasi untuk tampilan besar */}
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {pages.map((page) => (
              <Button
                key={page}
                onClick={(event) => handleNavClick(page, event)}
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
                {page}
              </Button>
            ))}
          </Box>
          {/* Ikon Pengguna */}
          <IconButton
            size="large"
            aria-label="account of current user"
            aria-controls="menu-list"
            aria-haspopup="true"
            onClick={() => navigate('/Customer')}
            color="inherit"
          >
            <AccountCircleIcon />
          </IconButton>
        </Toolbar>
      </Container>
      {/* Submenu untuk "List" */}
      <Menu
        id="menu-list"
        anchorEl={anchorElList}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        keepMounted
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
        open={Boolean(anchorElList)}
        onClose={handleCloseListMenu}
      >
        <MenuItem onClick={() => navigate('/ListCustomer')}>List Customer</MenuItem>
        <MenuItem onClick={() => navigate('/ListBarang')}>List Barang</MenuItem>
        <MenuItem onClick={() => navigate('/ListTransaksi')}>List Transaksi</MenuItem>
      </Menu>
    </AppBar>
  );
}

export default Navbar;
