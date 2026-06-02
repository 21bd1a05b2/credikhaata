import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

const CreditContext = createContext();

export const CreditProvider = ({
  children,
}) => {
  const [customers, setCustomers] =
    useState(
      JSON.parse(
        localStorage.getItem("customers")
      ) || []
    );

  const [loans, setLoans] = useState(
    JSON.parse(
      localStorage.getItem("loans")
    ) || []
  );

  const [darkMode, setDarkMode] =
    useState(
      JSON.parse(
        localStorage.getItem("darkMode")
      ) || false
    );

  useEffect(() => {
    localStorage.setItem(
      "customers",
      JSON.stringify(customers)
    );
  }, [customers]);

  useEffect(() => {
    localStorage.setItem(
      "loans",
      JSON.stringify(loans)
    );
  }, [loans]);

  useEffect(() => {
    localStorage.setItem(
      "darkMode",
      JSON.stringify(darkMode)
    );
  }, [darkMode]);

  const addCustomer = (
    name,
    email,
    phone
  ) => {
    const newCustomer = {
      id: Date.now().toString(),
      name,
      email,
      phone,
    };

    setCustomers((prev) => [
      ...prev,
      newCustomer,
    ]);
  };

  const deleteCustomer = (id) => {
    setCustomers((prev) =>
      prev.filter(
        (customer) =>
          customer.id !== id
      )
    );

    setLoans((prev) =>
      prev.filter(
        (loan) =>
          loan.customerId !== id
      )
    );
  };

  const addLoan = (
    customerId,
    item,
    amount,
    dueDate
  ) => {
    const loan = {
      id: Date.now().toString(),
      customerId,
      item,
      amount: Number(amount),
      dueDate,
      repayments: [],
    };

    setLoans((prev) => [
      ...prev,
      loan,
    ]);
  };

  const addRepayment = (
    loanId,
    amount,
    date
  ) => {
    setLoans((prev) =>
      prev.map((loan) =>
        loan.id === loanId
          ? {
              ...loan,
              repayments: [
                ...loan.repayments,
                {
                  id:
                    Date.now().toString(),
                  amount:
                    Number(amount),
                  date,
                },
              ],
            }
          : loan
      )
    );
  };

  const toggleTheme = () =>
    setDarkMode((prev) => !prev);

  return (
    <CreditContext.Provider
      value={{
        customers,
        loans,
        darkMode,
        toggleTheme,
        addCustomer,
        deleteCustomer,
        addLoan,
        addRepayment,
      }}
    >
      {children}
    </CreditContext.Provider>
  );
};

export const useCredit = () =>
  useContext(CreditContext);