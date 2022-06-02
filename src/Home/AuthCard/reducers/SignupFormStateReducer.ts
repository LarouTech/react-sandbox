import validator from 'validator';

export interface SignupState {
  email?: {
    value?: string;
    isValid?: boolean;
  };
  password?: {
    value?: string;
    isValid?: boolean;
  };
  terms?: {
    value: boolean;
    isValid: boolean;
  };
  isFormValid: boolean;
  submitted: any
}

export interface SignupFormActions {
  type: SignupActionsType;
  value?: string;
  inputField?: string;
}

export enum SignupActionsType {
  'ON_INPUT_CHANGE' = 'ON_INPUT_CHANGE',
  'RESET_SIGNUP_FORM' = 'RESET_SIGNUP_FORM',
  'FORM_SUBMITTED' = 'FORM_SUBMITTED'
}

export const signupIntialState: SignupState = {
  email: null!,
  password: null!,
  terms: null!,
  isFormValid: false,
  submitted: false
};

export const signupStateReducer = (state: SignupState, action: SignupFormActions) => {
  let verifyer;
  switch (action.inputField) {
    case 'email':
      verifyer = validator.isEmail(action.value!);
      break;
    case 'password':
      verifyer = validator.isStrongPassword(action.value!);
      break;
    case 'terms':
      verifyer = action.value!;
      break;
    default:
      break;
  }
  switch (action.type) {
    case SignupActionsType.ON_INPUT_CHANGE:
      const newState = {
        ...state,
        [action.inputField!]: {
          value: action.value,
          isValid: verifyer
        }
      } as SignupState;

      if (
        newState.email?.isValid &&
        newState.password?.isValid &&
        newState.terms?.isValid
      ) {
        newState.isFormValid = true;
      }

      return newState;

    case SignupActionsType.RESET_SIGNUP_FORM:
      return { ...signupIntialState }

    case SignupActionsType.FORM_SUBMITTED:
      return {
        ...state,
        submitted: true
      } as SignupState

    default:
      return state;
  }
};