export const isEmailValid = (enteredEmail: string) => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(enteredEmail);
};

export const isPWValid = (enteredPW: string) => {
  return enteredPW.length >= 8;
};

export const isSame = (str1: string, str2: string) => {
  return str1 === str2;
};

export const isEntered = (value: string) => {
  return value.length !== 0;
};
