import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { toast } from "react-toastify";

function Signup() {
const navigate = useNavigate();
const { login } = useAuth();

const [form, setForm] = useState({
name: "",
email: "",
password: "",
});

const submit = (e) => {
e.preventDefault();

```
if (
  !form.name ||
  !form.email ||
  !form.password
) {
  toast.error("All fields required");
  return;
}

login(form.email);

toast.success(
  "Account created successfully"
);

navigate("/dashboard");
```

};

return (
<div
style={{
height: "100vh",
display: "flex",
justifyContent: "center",
alignItems: "center",
background: "#f5f5f5",
}}
>
<div
className="card"
style={{
width: "420px",
padding: "30px",
}}
> <h2>Create Account</h2>

```
    <p
      style={{
        color: "#666",
        marginTop: "10px",
      }}
    >
      Manage customer credit records easily
    </p>

    <form
      onSubmit={submit}
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "15px",
        marginTop: "20px",
      }}
    >
      <input
        className="form-control"
        placeholder="Name"
        value={form.name}
        onChange={(e) =>
          setForm({
            ...form,
            name: e.target.value,
          })
        }
      />

      <input
        className="form-control"
        placeholder="Email"
        value={form.email}
        onChange={(e) =>
          setForm({
            ...form,
            email: e.target.value,
          })
        }
      />

      <input
        className="form-control"
        type="password"
        placeholder="Password"
        value={form.password}
        onChange={(e) =>
          setForm({
            ...form,
            password: e.target.value,
          })
        }
      />

      <button className="btn-primary">
        Sign Up
      </button>
    </form>

    <p
      style={{
        marginTop: "20px",
        textAlign: "center",
      }}
    >
      Already have an account?{" "}
      <Link to="/">
        Login
      </Link>
    </p>
  </div>
</div>
);
}

export default Signup;
