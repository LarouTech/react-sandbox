import { Button, SxProps, Theme } from '@mui/material';
import React from 'react';
import { AuthTextField } from '../AuthTextField';
import EmailIcon from '@mui/icons-material/Email';
import LockIcon from '@mui/icons-material/Lock';
import { ForgetPasswordState } from '../reducers/ForgetPasswordStateReducer';
import DialpadIcon from '@mui/icons-material/Dialpad';

interface ForgetPasswordProps {
  setForgetPasswordFormState: (event: React.BaseSyntheticEvent) => void;
  forgetPasswordState: ForgetPasswordState;
  onGenerateCode: () => void;
}

export const ForgetPassword = (props: ForgetPasswordProps) => {
  const onInputChangeHandler = (event: React.BaseSyntheticEvent) => {
    props.setForgetPasswordFormState(event);
  };

  const onFocusBack = (event: React.BaseSyntheticEvent) => {
    event.target.focus();
  };

  const onGenerateCodeHandler = (event: React.BaseSyntheticEvent) => {
    props.onGenerateCode();
  };

  const iconStyle: SxProps<Theme> = {
    height: '1.6rem',
    width: '1.6rem',
    display: props.forgetPasswordState.isCodeGenerated ? 'contents' : 'none'
  };

  return (
    <div style={{ marginTop: '4rem', width: '100%' }}>
      <AuthTextField
        name="email"
        onChangeInputHanlder={onInputChangeHandler}
        fieldState={props.forgetPasswordState.email}
        onFocusBack={onFocusBack}
        errorMessage="Please enter a valid email address"
        icon={<EmailIcon sx={iconStyle} />}
        isDisabled={props.forgetPasswordState.isCodeGenerated ? true : false}
        style={{
          fontWeight: props.forgetPasswordState.isCodeGenerated
            ? 600
            : undefined
        }}
      ></AuthTextField>

      <Button
        disabled={props.forgetPasswordState.email?.isValid ? false : true}
        onClick={onGenerateCodeHandler}
        sx={{
          fontSize: '1.4rem',
          marginBottom: '3rem',
          width: '100%',
          display: props.forgetPasswordState.isCodeGenerated ? 'none' : null
        }}
        variant="contained"
        color="info"
        type="button"
      >
        generate code
      </Button>

      <div
        style={{
          display: props.forgetPasswordState.isCodeGenerated
            ? 'contents'
            : 'none'
        }}
      >
        <AuthTextField
          isDisabled={props.forgetPasswordState.isCodeGenerated ? false : true}
          name="code"
          onChangeInputHanlder={onInputChangeHandler}
          fieldState={props.forgetPasswordState.code}
          onFocusBack={onFocusBack}
          errorMessage="Please enter a valid code"
          icon={<DialpadIcon sx={iconStyle} />}
          inputProps={{ maxLength: 6, minLength: 6 }}
        ></AuthTextField>

        <AuthTextField
          name="password"
          type="password"
          isDisabled={props.forgetPasswordState.isCodeGenerated ? false : true}
          onChangeInputHanlder={onInputChangeHandler}
          fieldState={props.forgetPasswordState.password}
          onFocusBack={onFocusBack}
          errorMessage="Please enter a valid password"
          icon={<LockIcon sx={iconStyle} />}
        ></AuthTextField>
      </div>
    </div>
  );
};
