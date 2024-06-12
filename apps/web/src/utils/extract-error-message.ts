export const extractErrorMessage = (error: string) => {
  const regex = /^\[.*?\]\s*(.*)$/;
  const match = error.match(regex);
  return match ? match[1] : error;
};
