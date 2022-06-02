import validator from 'validator';

export interface ValidateState {
    email?: {
        value?: string;
        isValid?: boolean;
    };
    code?: {
        value?: string;
        isValid?: boolean;
    };
    password?: {
        value?: string;
        isValid?: boolean;
    };
    isFormValid: boolean;
    submitted: boolean,
}

export interface ValidateFormActions {
    type: ValidateFormActionsType;
    value?: string | boolean;
    inputField?: string;
    signupEmail?: string;
}

export enum ValidateFormActionsType {
    'ON_INPUT_CHANGE' = 'ON_INPUT_CHANGE',
    'ON_SUBMIT_PASSWORD' = 'ON_SUBMIT_PASSWORD',
    'RESET_FORM' = 'RESET_FORM'
}

export const validateInitState = (signupEmail: string): ValidateState => {
    return {
        email: {
            value: signupEmail,
            isValid: true
        },
        password: {
            value: '',
            isValid: false
        },
        code: {
            value: '',
            isValid: null!
        },
        isFormValid: false,
        submitted: false,
    }

}

export const validateFormReducer = (state: ValidateState, action: ValidateFormActions) => {

    let verifyer;
    switch (action.inputField) {
        case 'email':
            verifyer = validator.isEmail(action.value?.toString()!);
            break;
        case 'password':
            verifyer = validator.isStrongPassword(action.value?.toString()!);
            break;
        case 'code':
            verifyer = validator.isNumeric(action.value?.toString()!) && validator.isLength(action.value?.toString()!, { min: 6, max: 6 });
            break
        default:
            break;
    }

    switch (action.type) {
        case ValidateFormActionsType.ON_INPUT_CHANGE:

            const newState: ValidateState = {
                ...state,
                [action.inputField!]: {
                    value: action.value,
                    isValid: verifyer
                }
            };

            if (newState.email?.isValid && newState.code?.isValid) {
                newState.isFormValid = true;
            }

            return newState;

        case ValidateFormActionsType.ON_SUBMIT_PASSWORD:
            console.log('on sub login')
            return {
                ...state,
                [action.inputField!]: action.value
            } as ValidateState

        case ValidateFormActionsType.RESET_FORM:
            console.log('reset')
            return {
                ...validateInitState
            } as ValidateState


        default:
            return state;
    }
};