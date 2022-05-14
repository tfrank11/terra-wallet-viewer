import { CircularProgress } from "@mui/material";
import React from "react";

const Spinner = () => {
  return (
    <div className="h-100 w-100">
      <div className="w-fit h-fit absolute top-0 bottom-0 left-0 right-0 m-auto">
        <CircularProgress />
      </div>
    </div>
  );
};

export default Spinner;
