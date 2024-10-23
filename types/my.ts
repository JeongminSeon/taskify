export interface InputFieldProps {
  label: string;
  name: string;
  placeholder?: string;
  type?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  readOnly?: boolean;
  error?: boolean;
  errorMessage?: string;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
}

export interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
}
