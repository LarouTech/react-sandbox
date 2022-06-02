import { Login } from './forms/Login';
import Card from '@mui/material/Card';
import classes from './AuthCard.module.scss';
import {
  Button,
  CardActions,
  CardContent,
  CardHeader,
  Tab,
  Tabs
} from '@mui/material';
import React, { useReducer } from 'react';
import CARD_METADATA, { CardMetadata } from './AuthCard.metadata';
import GppGoodIcon from '@mui/icons-material/GppGood';
import TabPanel from './TabPanel';
import {
  authCardStateReducer,
  CardFormTypeEnum,
  cardInitState,
  CardStateTypes
} from './reducers/AuthCardStateReducer';
import CancelIcon from '@mui/icons-material/Cancel';
import {
  loginFormReducer,
  loginInitState
} from './reducers/LoginFormStateReducer';
import {
  signupIntialState,
  signupStateReducer
} from './reducers/SignupFormStateReducer';
import {
  validateFormReducer,
  validateInitState
} from './reducers/ValidateCardStateReducer';
import {
  confirmForgotPasswordEffect,
  confirmSignupEffect,
  forgotPasswordEffect,
  loginEffect,
  signupEffect
} from './effects/AuthEffects';
import { Signup } from './forms/Signup';
import { Validate } from './forms/Validate';
import {
  liftForgetPasswordState,
  liftLoginState,
  liftSignupState,
  liftValidateState,
  onCancelValidate,
  onChangeTab,
  onSubmit
} from './AuthCardEventHandlers';
import { AppCognitoConfig, AuthContextProps } from './AuthContext';
import {
  ForgetPasswordActionsType,
  forgetPasswordReducer,
  initforgetPasswordState
} from './reducers/ForgetPasswordStateReducer';
import { ForgetPassword } from './forms/ForgetPassword';

export interface AuthCardProps {
  content: CardMetadata[],
  getAuthState: (context: AuthContextProps) => void,
  cognito: AppCognitoConfig,
}

//create auth context

export const AuthCard = (props: AuthCardProps): JSX.Element => {
  //LIFT FORMS STATES AND SET REDUCER
  const [loginFormState, dispatchLoginFormState] = useReducer(
    loginFormReducer,
    loginInitState!
  );

  const [signupFormState, dispatchSignupFormState] = useReducer(
    signupStateReducer,
    signupIntialState
  );

  const [validateFormState, dispatchValidateFormState] = useReducer(
    validateFormReducer,
    validateInitState(signupFormState.email?.value!)
  );

  const [forgetPasswordState, dispatchForgetPasswordFormState] = useReducer(
    forgetPasswordReducer,
    initforgetPasswordState
  );

  //INIT CARD USER REDUCER
  const [cardState, cardStateDispatch] = useReducer(
    authCardStateReducer,
    cardInitState(props)
  );

  //USE EFFECT BLOCK
  signupEffect(signupFormState, props, cardStateDispatch, props);

  confirmSignupEffect(
    validateFormState,
    signupFormState,
    {
      dispatchCardState: cardStateDispatch,
      dispatchLoginFormState: dispatchLoginFormState,
      dispatchSignupFormState: dispatchSignupFormState,
      dispatchValidateFormState: dispatchValidateFormState
    },
    props
  );

  loginEffect(loginFormState, dispatchLoginFormState, props);

  forgotPasswordEffect(forgetPasswordState, props);
  confirmForgotPasswordEffect(forgetPasswordState, props.content, {
    dispatchCardState: cardStateDispatch,
    dispatchForgetPassword: dispatchForgetPasswordFormState,
  }, props);

  //CHANGE TAB HANDLER
  const handleChangeTab = (
    event: React.BaseSyntheticEvent,
    newValue: number
  ): void => {
    onChangeTab(event, props.content, newValue, cardStateDispatch);
  };
  //CANCEL VALIDATE HANDLER
  const onCancelValidateClickHandler = (): void =>
    onCancelValidate(props.content, cardStateDispatch);

  //SUBMIT FORM HANDLER
  const onSubmitHandler = (event: React.BaseSyntheticEvent): void =>
    onSubmit(event, cardState, {
      dispatchSignupFormState: dispatchSignupFormState,
      dispatchValidateFormState: dispatchValidateFormState,
      dispatchLoginFormState: dispatchLoginFormState,
      dispatchForgetPasswordFormState: dispatchForgetPasswordFormState
    });

  //SET FORM STATE HANDLER - LIFT STATE
  const loginStateHandler = (event: React.BaseSyntheticEvent): void =>
    liftLoginState(event, dispatchLoginFormState);

  const signupStateHandler = (event: React.BaseSyntheticEvent): void =>
    liftSignupState(event, dispatchSignupFormState);

  const validateStateHandler = (event: React.BaseSyntheticEvent): void =>
    liftValidateState(event, dispatchValidateFormState, signupFormState);

  const forgetPasswordStateHandler = (event: React.BaseSyntheticEvent): void =>
    liftForgetPasswordState(event, dispatchForgetPasswordFormState);

  const onForgetPasswordHandler = () => {
    cardStateDispatch({
      type: CardStateTypes.CHANGE_TO_FORGET_PASSWORD,
      newContentArray: CARD_METADATA.filter((c) => c.title === 'reset password')
    });
  };

  const onGenerateCodeHanlder = () => {
    console.log(forgetPasswordState);
    dispatchForgetPasswordFormState({
      type: ForgetPasswordActionsType.CONFIRM_SENT
    });
  };

  //GENERATE FORM BASE ON FORM TYPE - SEE CardFormTypeEnum FOR FORM TYPE
  const generateCOntent = (formType: CardFormTypeEnum): JSX.Element => {
    switch (formType) {
      case CardFormTypeEnum.login:
        return (
          <Login
            loginFormState={loginFormState}
            setLoginFormState={loginStateHandler}
            onForgetPassword={onForgetPasswordHandler}
          ></Login>
        );

      case CardFormTypeEnum.signup:
        return (
          <Signup
            signupFormState={signupFormState}
            setSignupFormState={signupStateHandler}
          ></Signup>
        );

      case CardFormTypeEnum.validate:
        if (!signupFormState.email?.value) {
          return <></>;
        }
        return (
          <Validate
            validateFormState={validateFormState}
            setValidateFormState={validateStateHandler}
            signupEmail={signupFormState.email!.value!}
          ></Validate>
        );

      case CardFormTypeEnum.forgetPassword:
        return (
          <ForgetPassword
            forgetPasswordState={forgetPasswordState}
            setForgetPasswordFormState={forgetPasswordStateHandler}
            onGenerateCode={onGenerateCodeHanlder}
          ></ForgetPassword>
        );

      default:
        return <React.Fragment></React.Fragment>;
    }
  };

  //SET SUBMIT BUTTON STATE FOR SPECIFIC FORMS
  const setSubmitButtonState = () => {
    switch (cardState.cardHeaderTitle as CardFormTypeEnum) {
      case CardFormTypeEnum.login:
        return loginFormState.isFormValid;
      case CardFormTypeEnum.signup:
        return signupFormState.isFormValid;
      case CardFormTypeEnum.validate:
        return validateFormState.isFormValid;
      case 'reset password' as CardFormTypeEnum:
        return forgetPasswordState.isFormValid;
      default:
        break;
    }
  };

  //cancel forget password and return to login tab
  const onCancelForgotPasswordClickHandler = () => {
    cardStateDispatch({
      type: CardStateTypes.CANCEL_FORGOT_PASSWORD,
      newContentArray: cardInitState(props).cardContent
    });
    dispatchForgetPasswordFormState({
      type: ForgetPasswordActionsType.RESET_FORM
    });
  };

  //RETURN AUTHCARD JSX CODE
  return (
    <Card style={{ minHeight: '50rem' }} className={classes.container}>
      <CardHeader
        disableTypography={true}
        sx={{
          fontSize: '3rem',
          fontWeight: 500,
          letterSpacing: '.3rem',
          textTransform: 'capitalize',
          backgroundColor: 'var(--primary-blue)',
          color: 'var(--root-bg-color)'
        }}
        avatar={cardState.headerIcon}
        title={cardState.cardHeaderTitle}
      ></CardHeader>

      <form onSubmit={onSubmitHandler}>
        <CardContent className={classes['container__content']}>
          <Tabs value={cardState.matTabIndexValue} onChange={handleChangeTab}>
            {cardState.cardContent!.map((c) => {
              return (
                <Tab
                  sx={{ fontSize: '1.3rem' }}
                  key={Math.random() * 1000}
                  label={c.title}
                ></Tab>
              );
            })}
          </Tabs>

          {cardState.cardContent!.map((c) => {
            return (
              <TabPanel
                key={Math.random() * 1000}
                value={cardState.matTabIndexValue}
                index={cardState.cardContent!.indexOf(c)}
              >
                <div className={classes.content}>
                  {generateCOntent(c.content!)}
                </div>
              </TabPanel>
            );
          })}
        </CardContent>

        <CardActions className={classes['container__actions']}>
          <Button
            disabled={!setSubmitButtonState()}
            startIcon={<GppGoodIcon></GppGoodIcon>}
            sx={{ fontSize: '1.4rem' }}
            variant="contained"
            color="primary"
            type="submit"
          >
            {cardState.cardHeaderTitle}
          </Button>

          {!cardState.isValidate ? null : (
            <Button
              startIcon={<CancelIcon></CancelIcon>}
              sx={{ fontSize: '1.4rem' }}
              variant="contained"
              color="error"
              type="button"
              onClick={onCancelValidateClickHandler}
            >
              Cancel
            </Button>
          )}
          {!cardState.isForgotPassword ? null : (
            <Button
              startIcon={<CancelIcon></CancelIcon>}
              sx={{ fontSize: '1.4rem' }}
              variant="contained"
              color="error"
              type="button"
              onClick={onCancelForgotPasswordClickHandler}
            >
              Cancel
            </Button>
          )}
        </CardActions>
      </form>
    </Card>
  );
};
