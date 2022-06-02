import validator from 'validator';

export interface LoginState {
    email?: {
        value?: string;
        isValid?: boolean;
    };
    password?: {
        value?: string;
        isValid?: boolean;
    };
    isFormValid: boolean;
    submitted: boolean
}

export interface LoginFormActions {
    type: LoginFormActionsType;
    value?: string;
    inputField?: string;
}

export enum LoginFormActionsType {
    'ON_INPUT_CHANGE' = 'ON_INPUT_CHANGE',
    'RESET_LOGIN_FORM' = 'RESET_LOGIN_FORM',
    'ON_FORM_SUBMITTED' = 'ON_FORM_SUBMITTED'
}

export const loginInitState: LoginState = {
    email: {
        value: '',
        isValid: null!
    },
    password: {
        value: '',
        isValid: null!
    },
    isFormValid: false,
    submitted: false
};

export const loginFormReducer = (state: LoginState, action: LoginFormActions) => {

    let verifyer;
    switch (action.inputField) {
        case 'email':
            verifyer = validator.isEmail(action.value!);
            break;
        case 'password':
            verifyer = validator.isStrongPassword(action.value!);
            break;
        default:
            break;
    }

    switch (action.type) {
        case LoginFormActionsType.ON_INPUT_CHANGE:
            const newState: LoginState = {
                ...state,
                [action.inputField!]: {
                    value: action.value,
                    isValid: verifyer
                }
            };

            if (newState.email?.isValid && newState.password?.isValid) {
                newState.isFormValid = true;
            }

            return newState;

        case LoginFormActionsType.RESET_LOGIN_FORM:
            return { ...loginInitState }

        case LoginFormActionsType.ON_FORM_SUBMITTED:
            return {
                ...state,
                submitted: true
            } as LoginState

        default:
            return state;
    }
};
