export const onError = (status: number, message: string) => {
  const error = { status, message };
  throw error;
};
