import { useContext } from 'react';
import { AppConfig } from '../config';
import { AuthCard } from './AuthCard/AuthCard';
import CARD_METADATA from './AuthCard/AuthCard.metadata';
import { AuthContext, AuthContextProps } from './AuthCard/AuthContext';
import classes from './Home.module.scss';

interface HomeProps {
  getAuthState: (context: AuthContextProps) => void;
}

export const Home = (props: HomeProps): JSX.Element => {
  const authState = useContext(AuthContext);

  const onGetAuthStateHandler = (context: AuthContextProps) => {
    props.getAuthState(context);
  };

  return (
    <div className={classes.container}>
      <AuthCard
        cognito={{region: AppConfig.cognito.region, clientId: AppConfig.cognito.clientId}}
        getAuthState={onGetAuthStateHandler}
        content={CARD_METADATA}
      ></AuthCard>
    </div>
  );
};
