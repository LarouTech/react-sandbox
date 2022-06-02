import { InputAdornment, InputBaseComponentProps, TextField } from '@mui/material';

interface AuthTextFieldProps {
  name: string;
  onChangeInputHanlder: (event: React.BaseSyntheticEvent) => void;
  onFocusBack: (event: React.BaseSyntheticEvent) => void;
  fieldState: any;
  errorMessage?: string;
  icon: JSX.Element;
  type?: React.HTMLInputTypeAttribute;
  isDisabled?: boolean;
  overideValue?: string;
  inputProps?: InputBaseComponentProps;
  style?: React.CSSProperties
}

export const AuthTextField = (props: AuthTextFieldProps) => {
  return (
    <TextField
      disabled={props.isDisabled ? props.isDisabled : false}
      FormHelperTextProps={{ style: { fontSize: '1.1rem' } }}
      onChange={props.onChangeInputHanlder}
      value={props.overideValue ? props.overideValue : props.fieldState?.value}
      onMouseOver={props.onFocusBack}
      error={props.fieldState?.value ? !props.fieldState?.isValid : null!}
      helperText={
        props.fieldState?.value
          ? !props.fieldState?.isValid
            ? props.errorMessage
            : null
          : null!
      }
      type={props.type ? props.type : 'text'}
      sx={{
        width: '100%',
        marginBottom: '3rem',
        
      }}
      required={true}
      size="medium"
      variant="outlined"
      id={props.name}
      placeholder={props.name.charAt(0).toUpperCase() + props.name.slice(1)}
      inputProps={{ style: { fontSize: 14, ...props.style, cursor: props.isDisabled ? 'not-allowed': undefined }, ...props.inputProps }}
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">{props.icon}</InputAdornment>
        )
      }}
    ></TextField>
  );
};
