import React from 'react';
import { Link } from 'react-router-dom';
import { useUser } from '../../context/user';
import axios from 'axios';

export default function HomePage() {
  const { userID, setUserID } = useUser();

  function submit(event) {
    const uid = `demo@${Math.random().toString(16).substr(2, 8)}`;
    event.preventDefault();
    axios.post("/auth/demo", {
      email: uid,
      password: "demo",
    }, { withCredentials: true })
      .then(result => {
        if (result.status === 200) {
          setUserID(result.data);
          window.location = "/calculator";
        }
      })
      .catch(err => {
        console.log(err);
      });
  }

  const demoLoginLink = (
    <div className="row">
      <div className="col-sm my-4">
        <form onSubmit={submit}>
          <p>Want to see how it works?</p>
          <button type="submit" name="submit" className="btn btn-primary btn-lg">Try the demo</button>
        </form>
      </div>
      <div className="col-sm my-4">
        <p>Already have an account?</p>
        <Link to="/login" className="btn btn-primary btn-lg" role="button">Log in here</Link>
      </div>
    </div>
  );

  const calcLink = (
    <>
      <p>Take me to the calculator!</p>
      <Link to="/calculator" className="btn btn-primary btn-lg" role="button">Price Calculator</Link>
    </>
  );

  return (
    <div className="container pt-5">
      <div className="jumbotron ">
        <h1 className="display-4">Welcome to Price Your Prints!</h1>
        <p className="lead">Print pricing made easy.</p>
        <hr className="my-4"/>
        { userID ? calcLink : demoLoginLink }
      </div>
    </div>
  );
}
