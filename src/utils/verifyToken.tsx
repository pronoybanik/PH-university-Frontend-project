import { jwtDecode } from "jwt-decode";
import React from "react";

const verifyToken = (token: string) => {
  return jwtDecode(token);
};

export default verifyToken;
