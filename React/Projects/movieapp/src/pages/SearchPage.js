import React from "react";
import { useLocation } from "react-router-dom";

const SearchPage = () => {
  const location = useLocation( )
  return (
    <div>
      <h1>SearchPage</h1>
    </div>
  );
};

export default SearchPage;
