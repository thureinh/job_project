import * as React from 'react';
import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import AppBar from '../components/AppBar';
import Toolbar from '../components/Toolbar';
import { useSelector, useDispatch } from 'react-redux';
import { selectUser, logoutAsync } from '../../features/loginSlice';
import { useNavigate } from 'react-router-dom';
import DashboardIcon from '@mui/icons-material/Dashboard';
import LogoutIcon from '@mui/icons-material/Logout';
import LoginIcon from '@mui/icons-material/Login';

const rightLink = {
  fontSize: 16,
  color: 'common.white',
  ml: 3,
};

function AppAppBar() {
  const userObj = useSelector(selectUser);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  return (
    <div>
      <AppBar position="fixed">
        <Toolbar sx={{ justifyContent: 'space-between' }}>
          <Box sx={{ flex: 1 }} />
          <Link
            variant="h6"
            underline="none"
            color="inherit"
            href="/"
            sx={{ fontSize: 24 }}
          >
            {'Bus Ticket System'}
          </Link>
          <Box sx={{ flex: 1, display: 'flex', justifyContent: 'flex-end' }}>
            {Object.keys(userObj).length === 0 ?
              (<Link
                color="inherit"
                variant="h6"
                underline="none"
                href="/sign-in"
                sx={rightLink}
              >
                <LoginIcon />
                {'Sign In'}
              </Link>)
              :
              (
                <React.Fragment>
                  <Link
                    color="inherit"
                    variant="h6"
                    underline="none"
                    href="/dashboard"
                    sx={rightLink}
                  >
                    <DashboardIcon />
                    {'Dashboard'}
                  </Link>
                  <Link
                    component="button"
                    color="inherit"
                    variant="h6"
                    underline="none"
                    onClick={() => {
                      dispatch(logoutAsync());
                      navigate('/');
                    }}
                    sx={rightLink}
                  >
                    <LogoutIcon />
                    {'Sign Out'}
                  </Link>
                </React.Fragment>
              )
            }
          </Box>
        </Toolbar>
      </AppBar>
      <Toolbar />
    </div>
  );
}

export default AppAppBar;
