import React from "react";
import { useNavigate } from "react-router-dom";

const Logo: React.FC = () => {
  const navigate = useNavigate();

  return (
    <p onClick={() => navigate("/")} className="flex cursor-pointer logo">
      CarConnect.
    </p>
  );
};

export default Logo;
