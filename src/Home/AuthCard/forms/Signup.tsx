import {
  Checkbox,
  FormControlLabel,
  SxProps,
  Theme,
  Typography
} from '@mui/material';
import EmailIcon from '@mui/icons-material/Email';
import LockIcon from '@mui/icons-material/Lock';
import React, { useState } from 'react';
import { SignupState } from '../reducers/SignupFormStateReducer';
import { AuthTextField } from '../AuthTextField';

export interface SignupProps {
  setSignupFormState: (event: React.BaseSyntheticEvent) => void;
  signupFormState: SignupState;
}

export const Signup = (props: SignupProps): JSX.Element => {
  const onChangeInputHandler = (event: React.BaseSyntheticEvent): void => {
    props.setSignupFormState(event);
  };

  const onFocusBack = (event: React.BaseSyntheticEvent) => {
    event.target.focus();
  };

  const iconStyle: SxProps<Theme> = {
    height: '1.6rem',
    width: '1.6rem'
  };

  return (
    <div style={{ marginTop: '4rem' }}>
      <AuthTextField
        name="email"
        onChangeInputHanlder={onChangeInputHandler}
        fieldState={props.signupFormState.email}
        onFocusBack={onFocusBack}
        errorMessage="Please enter a valid email address"
        icon={<EmailIcon sx={iconStyle} />}
      ></AuthTextField>

      <AuthTextField
        name="password"
        onChangeInputHanlder={onChangeInputHandler}
        fieldState={props.signupFormState.password}
        onFocusBack={onFocusBack}
        errorMessage="Please enter a valid password"
        icon={<LockIcon sx={iconStyle} />}
        type="password"
      ></AuthTextField>

      <FormControlLabel
        onChange={onChangeInputHandler}
        checked={props.signupFormState.terms?.value}
        control={
          <Checkbox
            sx={{ marginLeft: '.5rem', fontSize: '2rem' }}
            id="terms"
            size="medium"
          />
        }
        label={
          <Typography style={{ fontSize: '1.4rem' }}>
            Please accept the Terms & Services
          </Typography>
        }
      />
    </div>
  );
};
