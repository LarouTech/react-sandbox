import React from "react";
import { AuthCardProps } from "../AuthCard";
import CARD_METADATA, { CardMetadata } from "../AuthCard.metadata";

export enum CardFormTypeEnum {
    'login' = 'login',
    'signup' = 'signup',
    'validate' = 'validate',
    'forgetPassword' = 'forgetPassword'
}

export interface CardState {
    matTabIndexValue?: number;
    cardHeaderTitle?: CardFormTypeEnum;
    headerIcon?: JSX.Element;
    cardContent?: CardMetadata[];
    isValidate: boolean,
    isForgotPassword: boolean
}

export interface CardStateActions {
    type: CardStateTypes;
    newMatTabIndex?: number;
    newContentArray?: CardMetadata[],
    event?: React.BaseSyntheticEvent
}

export enum CardStateTypes {
    'TAB_CHANGED' = 'TAB_CHANGED',
    'CHANGE_TO_VALIDATE' = 'CHANGE_TO_VALIDATE',
    'CANCEL_VALIDATE' = 'CANCEL_VALIDATE',
    'CHANGE_TO_FORGET_PASSWORD' = 'CHANGE_TO_FORGET_PASSWORD',
    'CANCEL_FORGOT_PASSWORD' = 'CANCEL_FORGOT_PASSWORD',
    'RESET_CARD' = 'RESET_CARD'
}

export const cardInitState = (props: AuthCardProps) => {
    return {
        isForgotPassword: false,
        cardHeaderTitle: CardFormTypeEnum.login,
        headerIcon: props.content[0].icon!,
        matTabIndexValue: 0,
        isValidate: false,
        cardContent: props.content.filter(
            (c) => c.content != CardFormTypeEnum.validate && c.content != CardFormTypeEnum.forgetPassword
        )
    } as CardState
};


export const authCardStateReducer = (state: CardState, action: CardStateActions) => {
    switch (action.type) {

        case CardStateTypes.RESET_CARD:
            return {
                ...state,
                cardContent: action.newContentArray?.filter(
                    (c) => c.content != CardFormTypeEnum.validate && c.content != CardFormTypeEnum.forgetPassword
                )
            } as CardState

        case CardStateTypes.TAB_CHANGED:
            return {
                ...state,
                matTabIndexValue: action.newMatTabIndex,
                headerIcon: state.cardContent![action.newMatTabIndex!].icon,
                cardHeaderTitle: state.cardContent![action.newMatTabIndex!]
                    .title as CardFormTypeEnum
            } as CardState;

        case CardStateTypes.CHANGE_TO_VALIDATE:
            return {
                ...state,
                cardContent: action.newContentArray,
                cardHeaderTitle: action.newContentArray![0].title as CardFormTypeEnum,
                matTabIndexValue: 0,
                headerIcon: action.newContentArray![0].icon,
                isValidate: true
            } as CardState;

        case CardStateTypes.CANCEL_VALIDATE:


            return {
                ...state,
                cardContent: action.newContentArray,
                cardHeaderTitle: action.newContentArray![0].title,
                headerIcon: action.newContentArray![0].icon,
                isValidate: false,
                matTabIndexValue: 0
            } as CardState

        case CardStateTypes.CHANGE_TO_FORGET_PASSWORD:
            return {
                ...state,
                cardContent: action.newContentArray,
                headerIcon: action.newContentArray![0].icon,
                cardHeaderTitle: action.newContentArray![0].title,
                isForgotPassword: true,
            } as CardState;

        case CardStateTypes.CANCEL_FORGOT_PASSWORD:

            console.log(action)

            return {
                ...state,
                cardContent: action.newContentArray,
                cardHeaderTitle: action.newContentArray![0].title,
                headerIcon: action.newContentArray![0].icon,
                isForgotPassword: false
            } as CardState


        default:
            return state;
    }

};