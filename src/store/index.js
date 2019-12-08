import React from "react";
import useGlobalHook from "./global-hooks";

import * as actions from "../actions";

const initialState = {
  photos: [],
  photosPage: 0,
  error: '',
};

const useGlobal = useGlobalHook(React, initialState, actions);

export default useGlobal;