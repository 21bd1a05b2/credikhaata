import { useState } from "react";
import Navbar from "../components/Navbar";
import CustomerCard from "../components/CustomerCard";
import { useCredit } from "../context/CreditContext";
import { getBalance, isOverdue } from "../utils/helpers";
import { toast } from "react-toastify";

function Dashboard() {
  const {
    customers,
    loans,
    addCustomer,
    darkMode,
  } = useCredit();

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]:
        e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      !form.name.trim() ||
      !form.email.trim() ||
      !form.phone.trim()
    ) {
      toast.error(
        "Please fill all fields"
      );
      return;
    }

    addCustomer(
      form.name,
      form.email,
      form.phone
    );

    toast.success(
      "Customer added"
    );

    setForm({
      name: "",
      email: "",
      phone: "",
    });
  };

  const totalCustomers =
    customers.length;

  const overdueCustomers =
    customers.filter(
      (customer) =>
        loans.some(
          (loan) =>
            loan.customerId ===
              customer.id &&
            isOverdue(loan)
        )
    ).length;

  const totalOutstanding =
    loans.reduce(
      (sum, loan) =>
        sum + getBalance(loan),
      0
    );

  return (
    <div
      className={
        darkMode
          ? "dark-mode"
          : ""
      }
    >
      <div className="page-container">
        <Navbar />

        <h2>Dashboard</h2>

        {/* Stats */}

        <div className="stats-grid">
          <div className="stat-card">
            <h3>
              Total Customers
            </h3>
            <p>
              {totalCustomers}
            </p>
          </div>

          <div className="stat-card">
            <h3>
              Overdue Customers
            </h3>
            <p>
              {overdueCustomers}
            </p>
          </div>

          <div className="stat-card">
            <h3>
              Outstanding
            </h3>
            <p>
              ₹
              {totalOutstanding}
            </p>
          </div>
        </div>

        {/* Add Customer */}

        <div
          className="card"
          style={{
            marginTop: "20px",
          }}
        >
          <h3>Add Customer</h3>

          <form
            onSubmit={
              handleSubmit
            }
          >
            <div
              className="form-row"
              style={{
                marginTop:
                  "15px",
              }}
            >
              <input
                className="form-control"
                placeholder="Name"
                name="name"
                value={
                  form.name
                }
                onChange={
                  handleChange
                }
              />

              <input
                className="form-control"
                placeholder="Email"
                name="email"
                value={
                  form.email
                }
                onChange={
                  handleChange
                }
              />

              <input
                className="form-control"
                placeholder="Phone"
                name="phone"
                value={
                  form.phone
                }
                onChange={
                  handleChange
                }
              />
            </div>

            <button
              className="btn-primary"
              style={{
                marginTop:
                  "15px",
              }}
            >
              Save Customer
            </button>
          </form>
        </div>

        {/* Customer Cards */}

        <div
          className="customer-list"
          style={{
            marginTop: "20px",
          }}
        >
          {customers.map(
            (customer) => {
              const customerLoans =
                loans.filter(
                  (
                    loan
                  ) =>
                    loan.customerId ===
                    customer.id
                );

              const outstanding =
                customerLoans.reduce(
                  (
                    sum,
                    loan
                  ) =>
                    sum +
                    getBalance(
                      loan
                    ),
                  0
                );

              const overdue =
                customerLoans.some(
                  (
                    loan
                  ) =>
                    isOverdue(
                      loan
                    )
                );

              const nextLoan =
                customerLoans
                  .filter(
                    (
                      loan
                    ) =>
                      getBalance(
                        loan
                      ) > 0
                  )
                  .sort(
                    (
                      a,
                      b
                    ) =>
                      new Date(
                        a.dueDate
                      ) -
                      new Date(
                        b.dueDate
                      )
                  )[0];

              return (
                <CustomerCard
                  key={
                    customer.id
                  }
                  customer={
                    customer
                  }
                  outstanding={
                    outstanding
                  }
                  dueDate={
                    nextLoan
                      ?.dueDate ||
                    "N/A"
                  }
                  overdue={
                    overdue
                  }
                />
              );
            }
          )}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;