import { Button } from '@mui/material';
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../Home/AuthCard/AuthContext';
import { logout } from '../Home/AuthCard/services/AuthService';
import classes from './Lobby.module.scss';

interface LobbyProps {}


export const Lobby = (props: LobbyProps) => {
  const authState = useContext(AuthContext);
  const navigate = useNavigate()

  const onLogoutHandler = (event: React.BaseSyntheticEvent): void => {
    logout()
    authState.setAuthState()!
    navigate('/')
  };

  return (
    <div className={classes.container}>
      LOBBY
      <Button
        onClick={onLogoutHandler}
        variant="contained"
        sx={{ fontSize: '1.6rem', marginTop: '2rem' }}
        size="large"
      >
        Logout
      </Button>
    </div>
  );
};
