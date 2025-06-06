import React from "react";
import { Pagination as MuiPagination } from "@mui/material";

const Pagination = ({ total, page, onPageChange, itemsPerPage = 9 }) => {
  const handleChange = (_, value) => onPageChange(value);

  return (
    <div className="flex justify-center mt-4">
      <MuiPagination
        count={Math.ceil(total / itemsPerPage)}
        page={page}
        onChange={handleChange}
      />
    </div>
  );
};

export default Pagination;
