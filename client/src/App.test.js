import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { render } from "@testing-library/react";
import Login from "./components/login/login";

test("renders content", () => {
  const { card } = render(<Login />);

  console.log(card);
});
