import React, { Dispatch, useEffect } from 'react';
import { AuthCardProps } from '../AuthCard';
import {
  CardStateActions,
  CardStateTypes
} from '../reducers/AuthCardStateReducer';
import {
  SignupActionsType,
  SignupFormActions,
  SignupState
} from '../reducers/SignupFormStateReducer';
import {
  ValidateFormActions,
  ValidateFormActionsType,
  ValidateState
} from '../reducers/ValidateCardStateReducer';
import {
  LoginFormActions,
  LoginFormActionsType,
  LoginState
} from '../reducers/LoginFormStateReducer';
import { useNavigate } from 'react-router-dom';
import jwtDecode from 'jwt-decode';
import { AuthContextProps, intitAuthContext } from '../AuthContext';
import {
  ForgetPasswordActionsType,
  ForgetPasswordFormActions,
  ForgetPasswordState
} from '../reducers/ForgetPasswordStateReducer';
import CARD_METADATA, { CardMetadata } from '../AuthCard.metadata';
import {
  confirmForgotPassword,
  confirmSignup,
  forgotPassword,
  login,
  saveTokensToLocalStorage,
  signup
} from '../services/AuthService';

//USE EFFECT THAT EXECUTE CONGITO SIGNUP SEQUENCE
export const signupEffect = (
  state: SignupState,
  props: AuthCardProps,
  dispatcher: React.Dispatch<CardStateActions>,
  cardProps: AuthCardProps
): void => {
  return useEffect(() => {
    if (state.email?.value && state.password?.value) {
      signup(state.email.value!, state.password.value!, {region: cardProps.cognito.region, clientId: cardProps.cognito.clientId})
        .then(() => {
          dispatcher({
            type: CardStateTypes.CHANGE_TO_VALIDATE,
            newContentArray: props.content.filter(
              (c) => c.title === 'validate'
            ),
            newMatTabIndex: 0
          });
        })

        .catch((error: Error) => {
          console.log(error.message);
        });
    }
    return () => {};
  }, [state.submitted]);
};

//USE EFFECT TAHT EXECUTE COGNIOT CONFIRM SIGNUP SEQEUNCE AND LOGIN SEQUENCE ON CONFIRM SIGNUP SUCCESS
export const confirmSignupEffect = (
  state: ValidateState,
  signupState: SignupState,
  formDispatchers: {
    dispatchSignupFormState: Dispatch<SignupFormActions>;
    dispatchValidateFormState: Dispatch<ValidateFormActions>;
    dispatchLoginFormState: Dispatch<LoginFormActions>;
    dispatchCardState: Dispatch<CardStateActions>;
  },
  cardProps: AuthCardProps
): void => {
  const navigate = useNavigate();

  useEffect(() => {
    if (state.submitted) {
      confirmSignup(signupState.email?.value!, state.code?.value!, {region: cardProps.cognito.region, clientId: cardProps.cognito.clientId})
        .then(() => {
          login(signupState.email?.value!, signupState.password?.value!, {region: cardProps.cognito.region, clientId: cardProps.cognito.clientId})
            .then((data) => {
              saveTokensToLocalStorage(data.AuthenticationResult!);

              const decoded: any = jwtDecode(
                localStorage.getItem('AccessToken')!
              );

              cardProps.getAuthState({
                ...intitAuthContext,
                email: decoded['username'],
                sub: decoded['sub'],
                isAuth: true
              });

              return data;
            })
            .then((data) => {
              formDispatchers.dispatchLoginFormState({
                type: LoginFormActionsType.RESET_LOGIN_FORM
              });
            })
            .then((data) => {
              navigate('/lobby');
            })
            .catch((error: Error) => {
              console.log(error.message);
            });
        })
        .then(() => {
          formDispatchers.dispatchValidateFormState({
            type: ValidateFormActionsType.RESET_FORM
          });

          formDispatchers.dispatchCardState({
            type: CardStateTypes.CANCEL_VALIDATE,
            newContentArray: cardProps.content.filter(
              (c) => c.title != 'validate'
            ),
            newMatTabIndex: 0
          });

          formDispatchers.dispatchSignupFormState({
            type: SignupActionsType.RESET_SIGNUP_FORM
          });
        })

        .catch((error: Error) => {
          console.log(error.message);
        });
    }

    return () => {};
  }, [state.submitted]);
};

//USE EXECUTE COGNITO LOGIN SEQUENCE
export const loginEffect = (
  state: LoginState,
  dispatcher: Dispatch<LoginFormActions>,
  authProps: AuthCardProps
): void => {
  const navigate = useNavigate();

  return useEffect(() => {
    if (state.email?.value && state.password?.value) {
      login(state.email.value!, state.password.value, {
        region: authProps.cognito.region,
        clientId: authProps.cognito.clientId
      })
        .then((data) => {
          saveTokensToLocalStorage(data.AuthenticationResult!);

          const decoded: any = jwtDecode(localStorage.getItem('AccessToken')!);

          authProps.getAuthState({
            ...intitAuthContext,
            email: decoded['username'],
            sub: decoded['sub'],
            isAuth: true
          });

          return data;
        })
        .then((data) => {
          dispatcher({
            type: LoginFormActionsType.RESET_LOGIN_FORM
          });

          console.log(data);
        })
        .then((data) => {
          navigate('/lobby');
        })
        .catch((error: Error) => {
          console.log(error.message);
        });
    }

    return () => {};
  }, [state.submitted]);
};

//USE EFFECT COGNITO FORGOT PASSWORD SEQUENCE
export const forgotPasswordEffect = (state: ForgetPasswordState, cardProps: AuthCardProps): void => {
  return useEffect(() => {
    if (state.email?.value! && state.email.isValid)
      forgotPassword(state.email?.value!, {region: cardProps.cognito.region, clientId: cardProps.cognito.clientId}).then((data) => {});

    return () => {};
  }, [state.isCodeGenerated === true]);
};

//USE EFFECT COGNITO CONFIRM FORGOT PASSWORD SEQUENCE
export const confirmForgotPasswordEffect = (
  state: ForgetPasswordState,
  content: CardMetadata[],
  formDispatcher: {
    dispatchCardState: Dispatch<CardStateActions>;
    dispatchForgetPassword: Dispatch<ForgetPasswordFormActions>;
  },
  cardProps: AuthCardProps
): void => {
  return useEffect(() => {
    if (
      state.email?.isValid &&
      state.password?.isValid &&
      state.code?.isValid
    ) {
      confirmForgotPassword(
        state.email.value!,
        state.password.value!,
        state.code.value!,
        {region: cardProps.cognito.region, clientId: cardProps.cognito.clientId}
      ).then((data) => {
        formDispatcher.dispatchCardState({
          type: CardStateTypes.RESET_CARD,
          newContentArray: content
        });

        formDispatcher.dispatchForgetPassword({
          type: ForgetPasswordActionsType.RESET_FORM
        });
      });
    }

    return () => {};
  }, [state.submitted]);
};
