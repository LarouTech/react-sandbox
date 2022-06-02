import {
  AuthenticationResultType,
  CognitoIdentityProviderClient,
  ConfirmForgotPasswordCommand,
  ConfirmForgotPasswordCommandOutput,
  ConfirmSignUpCommand,
  ConfirmSignUpCommandOutput,
  ForgotPasswordCommand,
  ForgotPasswordCommandOutput,
  InitiateAuthCommand,
  InitiateAuthCommandOutput,
  SignUpCommand,
  SignUpCommandOutput
} from '@aws-sdk/client-cognito-identity-provider';
import { AppCognitoConfig } from '../AuthContext';

//COGNITO - SIGNUPCOMMAND
export const signup = async (
  email: string,
  password: string,
  config: AppCognitoConfig
): Promise<SignUpCommandOutput> => {
  const client = new CognitoIdentityProviderClient({
    region: config.region
  });

  const command = new SignUpCommand({
    ClientId: config.clientId,
    Username: email,
    Password: password,
    UserAttributes: [
      {
        Name: 'email',
        Value: email
      }
    ]
  });

  const response = await client.send(command);
  return response;
};

//COGNITO - CONFIRMSIGNUPCOMMAND
export const confirmSignup = async (
  email: string,
  code: string,
  config: AppCognitoConfig
): Promise<ConfirmSignUpCommandOutput> => {
  const client = new CognitoIdentityProviderClient({
    region: config.region
  });

  const command = new ConfirmSignUpCommand({
    ClientId: config.clientId,
    ConfirmationCode: code,
    Username: email
  });

  const response = await client.send(command);
  return response;
};

//COGNITO - INITAUTHCOMMAND (LOGIN)
export const login = async (
  email: string,
  password: string,
  config: AppCognitoConfig
): Promise<InitiateAuthCommandOutput> => {
  const client = new CognitoIdentityProviderClient({
    region: config.region
  });

  const command = new InitiateAuthCommand({
    ClientId: config.clientId,
    AuthFlow: 'USER_PASSWORD_AUTH',
    AuthParameters: {
      USERNAME: email,
      PASSWORD: password
    }
  });

  const response = await client.send(command);
  console.log(response);
  return response;
};

//COGNITO FORGOT PASSWORD COMMAND
export const forgotPassword = async (
  email: string,
  config: AppCognitoConfig
): Promise<ForgotPasswordCommandOutput> => {
  const client = new CognitoIdentityProviderClient({
    region: config.region
  });
  const command = new ForgotPasswordCommand({
    Username: email,
    ClientId: config.clientId
  });

  const response = await client.send(command);
  return response;
};

//COGNITO - CONFRIM FORGOT PASSWORD COMMAND
export const confirmForgotPassword = async (
  email: string,
  password: string,
  code: string,
  config: AppCognitoConfig
): Promise<ConfirmForgotPasswordCommandOutput> => {
  const client = new CognitoIdentityProviderClient({
    region: config.region
  });
  const command = new ConfirmForgotPasswordCommand({
    ClientId: config.clientId,
    Username: email,
    Password: password,
    ConfirmationCode: code
  });
  const response = await client.send(command);
  return response;
};

//COGNITO LOGOUT
export const logout = (): void => {
  removeTokenFromLocalStrorage();
};

export const saveTokensToLocalStorage = (
  tokens: AuthenticationResultType
): void => {
  localStorage.setItem('AccessToken', tokens.AccessToken!);
  localStorage.setItem('ExpiresIn', tokens.ExpiresIn!.toString());
  localStorage.setItem('IdToken', tokens.IdToken!);
  localStorage.setItem('RefreshToken', tokens.RefreshToken!);
  localStorage.setItem('TokenType', tokens.TokenType!);
};

export const removeTokenFromLocalStrorage = (): void => {
  localStorage.removeItem('AccessToken');
  localStorage.removeItem('ExpiresIn');
  localStorage.removeItem('IdToken');
  localStorage.removeItem('RefreshToken');
  localStorage.removeItem('TokenType');
};
