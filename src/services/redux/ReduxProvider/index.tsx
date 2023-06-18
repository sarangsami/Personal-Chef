import React from "react";
import { Provider } from "react-redux";
import { store } from "../store";
import { ChildrenType } from "types";

const ReduxProvider = (props: ChildrenType) => {
  const { children } = props;
  return <Provider store={store}>{children}</Provider>;
};

export default ReduxProvider;
