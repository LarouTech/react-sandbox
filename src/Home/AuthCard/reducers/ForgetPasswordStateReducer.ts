import validator from 'validator';

export interface ForgetPasswordState {
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
    isCodeGenerated: boolean
}


export interface ForgetPasswordFormActions {
    type: ForgetPasswordActionsType,
    value?: string,
    inputField?: string
}

export enum ForgetPasswordActionsType {
    'ON_INPUT_CHANGE' = 'ON_INPUT_CHANGE',
    'ON_FORM_SUBMITTED' = 'ON_FORM_SUBMITTED',
    'RESET_FORM' = 'RESET_FORM',
    'CONFIRM_SENT' = 'CONFIRM_SENT'
}

export const initforgetPasswordState: ForgetPasswordState = {
    email: {
        value: '',
        isValid: null!
    },
    password: {
        value: '',
        isValid: null!
    },
    code: {
        value: '',
        isValid: null!
    },
    isFormValid: false,
    submitted: false,
    isCodeGenerated: false
};

export const forgetPasswordReducer = (state: ForgetPasswordState, action: ForgetPasswordFormActions) => {
    let verifyer;
    switch (action.inputField) {
        case 'email':
            verifyer = validator.isEmail(action.value!);
            break;
        case 'password':
            verifyer = validator.isStrongPassword(action.value!);
            break;
        case 'code':
            verifyer = validator.isNumeric(action.value?.toString()!) && validator.isLength(action.value?.toString()!, { min: 6, max: 6 });
            break
        default:
            break;
    }

    switch (action.type) {
        case ForgetPasswordActionsType.ON_INPUT_CHANGE:
            const newState = {
                ...state,
                [action.inputField!]: {
                    value: action.value,
                    isValid: verifyer
                }
            } as ForgetPasswordState

            if (newState.code?.value && newState.password?.value) {
                newState.isFormValid = true
            }

            return newState

        case ForgetPasswordActionsType.RESET_FORM:
            return { ...initforgetPasswordState } as ForgetPasswordState

        case ForgetPasswordActionsType.CONFIRM_SENT:
            console.log('sent')
            return {
                ...state,
                isCodeGenerated: true
            } as ForgetPasswordState

        case ForgetPasswordActionsType.ON_FORM_SUBMITTED:
            return {
                ...state,
                submitted: true
            } as ForgetPasswordState

        default:
            break;
    }

    return state
}

