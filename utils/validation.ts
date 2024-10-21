export const isEmailValid = (enteredEmail: string) => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(enteredEmail);
};

export const isPWValid = (enteredPW: string) => {
  return enteredPW.length >= 8;
};
