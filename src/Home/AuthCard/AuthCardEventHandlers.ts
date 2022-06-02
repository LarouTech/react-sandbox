import React, { Dispatch } from "react";
import { CardMetadata } from "./AuthCard.metadata";
import { CardFormTypeEnum, CardState, CardStateActions, CardStateTypes } from "./reducers/AuthCardStateReducer";
import { ForgetPasswordActionsType, ForgetPasswordFormActions } from "./reducers/ForgetPasswordStateReducer";
import { LoginFormActions, LoginFormActionsType } from "./reducers/LoginFormStateReducer";
import { SignupActionsType, SignupFormActions, SignupState } from "./reducers/SignupFormStateReducer";
import { ValidateFormActions, ValidateFormActionsType } from "./reducers/ValidateCardStateReducer";

// export const formResetterController = (state: CardState, formDispatcher: { dispatchLoginFormState: Dispatch<LoginFormActions>, dispatchSignupFormState: Dispatch<SignupFormActions> }) => {
//     switch (state.cardHeaderTitle as CardFormTypeEnum) {
//         case CardFormTypeEnum.login:
//             formDispatcher.dispatchLoginFormState({
//                 type: LoginFormActionsType.RESET_LOGIN_FORM
//             });
//             break;
//         case CardFormTypeEnum.signup:
//             formDispatcher.dispatchSignupFormState({
//                 type: SignupActionsType.RESET_SIGNUP_FORM
//             });
//             break;
//         default:
//             break;
//     }
// }

export const onChangeTab = (event: React.BaseSyntheticEvent, content: CardMetadata[], newValue: number, dispatcher: Dispatch<CardStateActions>) => {
    if (content[newValue].title === 'validate') {
        dispatcher({
            type: CardStateTypes.CHANGE_TO_VALIDATE,
            newContentArray: content.filter((c) => c.title === 'validate'),
            newMatTabIndex: 0
        });
    }


    dispatcher({
        type: CardStateTypes.TAB_CHANGED,
        newMatTabIndex: newValue
    });

}

export const onCancelValidate = (content: CardMetadata[], dispatcher: Dispatch<CardStateActions>) => {
    dispatcher({
        type: CardStateTypes.CANCEL_VALIDATE,
        newContentArray: content.filter(
            (c) => c.content != CardFormTypeEnum.validate
        )
    });
}

export const onSubmit = (event: React.BaseSyntheticEvent, state: CardState, formDispatchers: { dispatchSignupFormState: Dispatch<SignupFormActions>, dispatchValidateFormState: Dispatch<ValidateFormActions>, dispatchLoginFormState: Dispatch<LoginFormActions>, dispatchForgetPasswordFormState: Dispatch<ForgetPasswordFormActions> }): void => {
    event.preventDefault();

    switch (state.cardHeaderTitle as CardFormTypeEnum) {
        case CardFormTypeEnum.signup:
            formDispatchers.dispatchSignupFormState({
                type: SignupActionsType.FORM_SUBMITTED
            });

            break;

        case CardFormTypeEnum.validate:
            formDispatchers.dispatchValidateFormState({
                type: ValidateFormActionsType.ON_SUBMIT_PASSWORD,
                inputField: 'submitted',
                value: true
            });

            break;

        case CardFormTypeEnum.login:
            formDispatchers.dispatchLoginFormState({
                type: LoginFormActionsType.ON_FORM_SUBMITTED
            })

            break;

        case 'reset password' as CardFormTypeEnum: {
            formDispatchers.dispatchForgetPasswordFormState({
                type: ForgetPasswordActionsType.ON_FORM_SUBMITTED
            })
        }

            break;

        default:
            break;
    }
}


export const liftLoginState = (event: React.BaseSyntheticEvent, dispatcher: Dispatch<LoginFormActions>) => {
    dispatcher({
        type: LoginFormActionsType.ON_INPUT_CHANGE,
        value: event.target.value,
        inputField: event.target.id
    });
}

export const liftSignupState = (event: React.BaseSyntheticEvent, dispatcher: Dispatch<SignupFormActions>) => {
    const value =
        event.target.id === 'terms' ? event.target.checked : event.target.value;

    dispatcher({
        type: SignupActionsType.ON_INPUT_CHANGE,
        value: value,
        inputField: event.target.id
    });
}

export const liftValidateState = (event: React.BaseSyntheticEvent, dispatcher: Dispatch<ValidateFormActions>, signupState: SignupState) => {
    dispatcher({
        type: ValidateFormActionsType.ON_INPUT_CHANGE,
        value: event.target.value,
        inputField: event.target.id,
        signupEmail: signupState.email?.value
    });
}

export const liftForgetPasswordState = (event: React.BaseSyntheticEvent, dispatcher: Dispatch<ForgetPasswordFormActions>) => {
    dispatcher({
        type: ForgetPasswordActionsType.ON_INPUT_CHANGE,
        value: event.target.value,
        inputField: event.target.id
    })
}