import { useNavigate } from "react-router-dom";
import { useCredit } from "../context/CreditContext";
import { toast } from "react-toastify";

function CustomerCard({
  customer,
  outstanding,
  dueDate,
  overdue,
}) {
  const navigate = useNavigate();

  const { deleteCustomer } =
    useCredit();

  const handleDelete = (e) => {
    e.stopPropagation();

    if (
      window.confirm(
        "Delete this customer?"
      )
    ) {
      deleteCustomer(customer.id);

      toast.success(
        "Customer deleted"
      );
    }
  };

  return (
    <div
      className="card customer-card"
      style={{
        cursor: "pointer",
      }}
      onClick={() =>
        navigate(
          `/customer/${customer.id}`
        )
      }
    >
      <div className="customer-info">
        <h3>{customer.name}</h3>

        <p>{customer.email}</p>

        <p>{customer.phone}</p>

        <p>
          <strong>
            Outstanding:
          </strong>{" "}
          ₹{outstanding}
        </p>

        <p>
          <strong>
            Next Due:
          </strong>{" "}
          {dueDate || "N/A"}
        </p>

        <span
          className={`status-badge ${
            overdue
              ? "overdue"
              : "uptodate"
          }`}
        >
          {overdue
            ? "Overdue"
            : "Up-to-date"}
        </span>
      </div>

      <button
        onClick={handleDelete}
        className="btn-primary"
        style={{
          background: "#dc3545",
          width: "auto",
          padding:
            "10px 15px",
        }}
      >
        Delete
      </button>
    </div>
  );
}

export default CustomerCard;