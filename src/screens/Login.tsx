import React from "react";
//nav
import { useNavigate } from "react-router-dom";

//auth
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

//components
import Form from "../components/form/Form";
import Header from "../components/header/Header";

//redux
import { useAppDispatch } from "../store/hooks";
import { setUser } from "../store/slice/userSlice";

function Login() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  //@ts-ignore
  const handleLogin = (email: string, password: string) => {
    const auth = getAuth();
    signInWithEmailAndPassword(auth, email, password)
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
      <Header title="Sign in" />
      <div className="container">
        <div className="d-flex flex-column vh-100 pt-5">
          <Form title={"Sign In"} handleClick={handleLogin} />
        </div>
      </div>
    </>
  );
}

export default Login;
