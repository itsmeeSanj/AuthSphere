import React, { useReducer } from "react";

type LoginState = {
  email: string;
  password: string;
};

type LoginAction =
  | {
      type: "UPDATE_FIELD";
      field: keyof LoginState;
      value: string;
    }
  | {
      type: "RESET_FORM";
    };

const initialState: LoginState = {
  email: "",
  password: "",
};

function reducer(state: LoginState, action: LoginAction): LoginState {
  switch (action.type) {
    case "UPDATE_FIELD":
      return {
        ...state,
        [action.field]: action.value,
      };

    case "RESET_FORM":
      return initialState;

    default:
      return state;
  }
}

function Login(): React.JSX.Element {
  const [state, dispatch] = useReducer(reducer, initialState);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;

    dispatch({
      type: "UPDATE_FIELD",
      field: name as keyof LoginState,
      value,
    });
  };

  function handleSubmit(e: React.SubmitEvent<HTMLFormElement>) {
    e.preventDefault();

    console.log("Login Data:", state);

    dispatch({ type: "RESET_FORM" });
  }

  return (
    <div style={{ maxWidth: "400px", margin: "40px auto" }}>
      <h2>Login</h2>

      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: "16px" }}>
          <label htmlFor='email'>Email</label>
          <input
            id='email'
            type='email'
            name='email'
            value={state.email}
            onChange={handleChange}
            placeholder='Enter your email'
            style={{
              display: "block",
              width: "100%",
              padding: "10px",
              marginTop: "6px",
            }}
          />
        </div>

        <div style={{ marginBottom: "16px" }}>
          <label htmlFor='password'>Password</label>
          <input
            id='password'
            type='password'
            name='password'
            value={state.password}
            onChange={handleChange}
            placeholder='Enter your password'
            style={{
              display: "block",
              width: "100%",
              padding: "10px",
              marginTop: "6px",
            }}
          />
        </div>

        <button type='submit' style={{ padding: "10px 16px" }}>
          Login
        </button>
      </form>
    </div>
  );
}

export default Login;
