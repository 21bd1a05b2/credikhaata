import Navbar from "../components/Navbar";

function CustomerDetails() {
  return (
    <div className="page-container">
      <Navbar />

      <h2>Ledger Customer</h2>

      <p>
        ledger@example.com
      </p>

      <div
        style={{
          display: "grid",
          gridTemplateColumns:
            "1fr 1fr",
          gap: "20px",
          marginTop: "25px"
        }}
      >
        <div className="card">
          <h4>Add Loan</h4>

          <input
            className="form-control"
            placeholder="Item Sold"
          />

          <br />

          <input
            className="form-control"
            placeholder="Amount"
          />

          <br />

          <input
            type="date"
            className="form-control"
          />

          <br />

          <button className="btn-primary">
            Add Loan
          </button>
        </div>

        <div className="card">
          <h4>
            Record Repayment
          </h4>

          <select
            className="form-control"
          >
            <option>
              Select Loan
            </option>
          </select>

          <br />

          <input
            className="form-control"
            placeholder="Amount"
          />

          <br />

          <input
            type="date"
            className="form-control"
          />

          <br />

          <button className="btn-primary">
            Save Repayment
          </button>
        </div>
      </div>
    </div>
  );
}

export default CustomerDetails;