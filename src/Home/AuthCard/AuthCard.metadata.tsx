import LoginIcon from '@mui/icons-material/Login';
import SubscriptionsIcon from '@mui/icons-material/Subscriptions';
import DialpadIcon from '@mui/icons-material/Dialpad';
import { CardFormTypeEnum } from './reducers/AuthCardStateReducer';
import RestartAltIcon from '@mui/icons-material/RestartAlt';

export interface CardMetadata {
    title?: string;
    icon?: JSX.Element;
    content?: CardFormTypeEnum;
}

const CARD_METADATA: CardMetadata[] = [
  {
    title: 'login',
    content: CardFormTypeEnum.login,
    icon: <LoginIcon sx={{ fontSize: 40 }}> </LoginIcon>
  },
  {
    title: 'signup',
    content: CardFormTypeEnum.signup,
    icon: <SubscriptionsIcon sx={{ fontSize: 40 }}> </SubscriptionsIcon>
  },
  {
    title: 'reset password',
    content: CardFormTypeEnum.forgetPassword,
    icon: <RestartAltIcon sx={{ fontSize: 40 }}></RestartAltIcon>
  },
  {
    title: 'validate',
    content: CardFormTypeEnum.validate,
    icon: <DialpadIcon sx={{ fontSize: 40 }}></DialpadIcon>
  },

];

export default CARD_METADATA;
