import { useNavigate } from "react-router-dom";
import { Fragment } from "react/jsx-runtime";

export const ErrorPage = () => {
  const navegate = useNavigate();
  function onClik() {
    navegate("/");
  }

  return (
    <>
      <p>Page not found</p>
      <button onClick={onClik}>Volver al home</button>
    </>
  );
};
