import React from "react";
import useGlobalHook from "./global-hooks";

import * as actions from "../actions";

const initialState = {
  currentPage: 0,
  photoList: [],
  error: '',
};

const useGlobal = useGlobalHook(React, initialState, actions);

export default useGlobal;