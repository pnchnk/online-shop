import React from "react";
//nav
import { useNavigate } from "react-router-dom";

//auth
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

//components
import Form from "../components/form/Form";
import Header from "../components/header/Header";

//redux
import { useAppDispatch } from "../store/hooks";
import { setUser } from "../store/slice/userSlice";

function Registration() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleReg = (email: string, password: string) => {
    const auth = getAuth();
    createUserWithEmailAndPassword(auth, email, password)
      .then(({ user }) => {
        dispatch(
          setUser({
            email: user.email,
            id: user.uid,
            token: user.getIdToken,
          })
        );
        navigate("/");
      })
      .catch(console.error);
  };
  return (
    <>
      <Header title="Sign up" />
      <div className="container">
        <div className="d-flex flex-column vh-100 pt-5">
          <Form title={"Sign Up"} handleClick={handleReg} />
        </div>
      </div>
    </>
  );
}

export default Registration;
