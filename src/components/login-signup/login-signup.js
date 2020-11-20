import React from 'react';
import { Link } from 'react-router-dom';
import './login-signup.css';

export default function LoginSignup({title, inputs, submitForm, disable, login, error}) {
  const inputsMapped = inputs.map((i) => (
    <Input
      label={i.label}
      type={i.type}
      name={i.name}
      value={i.value}
      update={i.update}
    />
  ));

  return (
    <div className="login-signup">
      <h1>{title}</h1>
      <hr />
      <form onSubmit={submitForm}>
        {inputsMapped}
        <Submit disable={disable} />
        <ErrorMsg message={error} />
      </form>
      { login ? <SignupLink /> : <LoginLink /> }
    </div>
  );
}

const Input = ({label, type, name, value, update}) => (
  <div className="form-group">
    <label className="label">
      {label}
      <input
        className="form-control"
        type={type}
        name={name}
        value={value}
        onChange={e => update(e.target.value)}
        required
      />
    </label>
  </div>
);

const Submit = ({disable}) => (
  <div>
    <hr/>
    <button className="submit-button" type="submit" disabled={disable}>Submit</button>
  </div>
);

const ErrorMsg = ({message}) => (
  <p className="error">
    {message}
  </p>
);

const SignupLink = () => (
  <div>
    <p className="in-out">
      Don't have an account? {" "}
      <Link to="/register">Sign Up Here</Link>
    </p>
  </div>
);

const LoginLink = () => (
  <div>
    <p className="in-out">
      Already have an account? {" "}
      <Link to="/login">Log In Here</Link>
    </p>
  </div>
);
