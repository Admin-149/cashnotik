export const formatBalance = (num: number, precision?: number): string => {
  const balance = num ?? 0;
  return balance
    .toFixed(precision !== undefined ? precision : 2)
    .toString()
    .replace(/[.]/g, ',')
    .replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 ');
};
