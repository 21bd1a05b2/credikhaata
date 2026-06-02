export const getBalance = (
  loan
) => {
  const paid =
    loan.repayments.reduce(
      (sum, rep) =>
        sum + rep.amount,
      0
    );

  return loan.amount - paid;
};

export const isOverdue = (
  loan
) => {
  return (
    getBalance(loan) > 0 &&
    new Date() >
      new Date(loan.dueDate)
  );
};