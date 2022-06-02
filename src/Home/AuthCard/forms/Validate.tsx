import {
  SxProps,
  Theme
} from '@mui/material';
import EmailIcon from '@mui/icons-material/Email';
import LockIcon from '@mui/icons-material/Lock';
import DialpadIcon from '@mui/icons-material/Dialpad';
import { ValidateState } from '../reducers/ValidateCardStateReducer';
import { AuthTextField } from '../AuthTextField';

interface ValidateProps {
  setValidateFormState: (event: React.BaseSyntheticEvent) => void;
  validateFormState: ValidateState;
  signupEmail: string;
}

export const Validate = (props: ValidateProps): JSX.Element => {
  const onInputChangeHandler = (event: React.BaseSyntheticEvent) => {
    props.setValidateFormState(event);
  };

  const onFocusBack = (event: React.BaseSyntheticEvent) => {
    event.target.focus();
  };


  const iconStyle: SxProps<Theme> = {
    height: '1.6rem',
    width: '1.6rem'
  };

  return (
    <div style={{ marginTop: '4rem', width: '100%' }}>
      <AuthTextField
        name="email"
        onChangeInputHanlder={onInputChangeHandler}
        fieldState={props.validateFormState.email}
        onFocusBack={onFocusBack}
        errorMessage="Please enter a valid email address"
        icon={<EmailIcon sx={iconStyle} />}
        overideValue={props.signupEmail}
        isDisabled={true}
        style={{fontWeight: 600}} 
      ></AuthTextField>

      <AuthTextField
        name="code"
        onChangeInputHanlder={onInputChangeHandler}
        fieldState={props.validateFormState.email}
        onFocusBack={onFocusBack}
        errorMessage="Please enter a valid code"
        overideValue={props.validateFormState.code?.value}
        icon={<DialpadIcon sx={iconStyle} />}
        inputProps={{maxLength: 6, minLength: 6}}
      ></AuthTextField>

    </div>
  );
};
