import { InputAdornment, SxProps, TextField, Theme } from '@mui/material';
import EmailIcon from '@mui/icons-material/Email';
import LockIcon from '@mui/icons-material/Lock';
import React, { useRef } from 'react';
import { LoginState } from '../reducers/LoginFormStateReducer';
import { AuthTextField } from '../AuthTextField';

interface LoginProps {
  setLoginFormState: (event: React.BaseSyntheticEvent) => void;
  loginFormState: LoginState;
  onForgetPassword: () => void;
}

export const Login = (props: LoginProps): JSX.Element => {
  const onInputChangeHandler = (event: React.BaseSyntheticEvent) => {
    props.setLoginFormState(event);
  };

  const onFocusBack = (event: React.BaseSyntheticEvent) => {
    event.target.focus();
  };

  const onForgetPasswordHandler = () => {
    props.onForgetPassword();
  };

  const iconStyle: SxProps<Theme> = {
    height: '1.6rem',
    width: '1.6rem'
  };

  return (
    <div style={{ marginTop: '4rem' }}>
      <AuthTextField
        name="email"
        onChangeInputHanlder={onInputChangeHandler}
        fieldState={props.loginFormState.email}
        onFocusBack={onFocusBack}
        errorMessage="Please enter a valid email address"
        icon={<EmailIcon sx={iconStyle} />}
      ></AuthTextField>

      <AuthTextField
        name="password"
        onChangeInputHanlder={onInputChangeHandler}
        fieldState={props.loginFormState.password}
        onFocusBack={onFocusBack}
        errorMessage="Please enter a valid password"
        icon={<LockIcon sx={iconStyle} />}
        type="password"
      ></AuthTextField>

      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        <p
          onClick={onForgetPasswordHandler}
          style={{
            textTransform: 'capitalize',
            cursor: 'pointer',
            letterSpacing: '.1rem',
            fontSize: '1.4rem',
            borderBottom: '.1rem solid #9e9e9e',
            color: '#757575'
          }}
        >
          forget password
        </p>
      </div>
    </div>
  );
};
