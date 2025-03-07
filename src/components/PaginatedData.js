import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TablePagination,
  IconButton,
} from "@mui/material";
import { KeyboardArrowLeft, KeyboardArrowRight } from "@mui/icons-material";

const PaginatedData = () => {
  const [data, setData] = useState([]);
  const [currentAnchor, setCurrentAnchor] = useState(0);
  const [limit, setLimit] = useState(25);
  const [nextAnchor, setNextAnchor] = useState(null);
  const [anchorStack, setAnchorStack] = useState([0]);
  const [page, setPage] = useState(0);

  useEffect(() => {
    // Initial data load with anchor 0
    fetchData(0, limit, "init");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchData = async (anchor, limit, direction) => {
    try {
      const response = await axios.get(
        `http://localhost:8080/api/entities?anchorId=${anchor}&limit=${limit}`
      );
      const result = response.data;
      setData(result.data || []);

      if (direction === "next") {
        // Save the current anchor to allow going back later
        setAnchorStack((prev) => [...prev, currentAnchor]);
        setCurrentAnchor(result.nextAnchor || 0);
        setPage((prev) => prev + 1);
      } else if (direction === "prev") {
        // Remove the last anchor from the stack and use the previous value
        const newStack = [...anchorStack];
        newStack.pop();
        const newAnchor = newStack[newStack.length - 1] || 0;
        setAnchorStack(newStack);
        setCurrentAnchor(newAnchor);
        setPage((prev) => prev - 1);
      }
      setNextAnchor(result.nextAnchor || null);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleChangePage = (event, newPage) => {
    if (newPage > page) {
      // Move to next page only if there is a valid next anchor
      if (nextAnchor) {
        fetchData(currentAnchor, limit, "next");
      }
    } else if (newPage < page) {
      fetchData(currentAnchor, limit, "prev");
    }
  };

  const handleChangeRowsPerPage = (event) => {
    const newLimit = parseInt(event.target.value, 10);
    setLimit(newLimit);
    // Reset pagination when limit changes
    setAnchorStack([0]);
    setCurrentAnchor(0);
    setPage(0);
    fetchData(0, newLimit, "init");
  };

  // For TablePagination, we compute a dummy count.
  // This is only for display since the total count is unknown.
  const count = page * limit + data.length + (nextAnchor ? 1 : 0);

  return (
    <Paper sx={{ width: "100%", overflow: "hidden" }}>
      <TableContainer sx={{ maxHeight: 500 }}>
        <Table stickyHeader aria-label="entities table">
          <TableHead>
            <TableRow>
              <TableCell><strong>ID</strong></TableCell>
              <TableCell><strong>Name</strong></TableCell>
              <TableCell><strong>Created At</strong></TableCell>
              <TableCell><strong>Payload</strong></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((item) => (
              <TableRow hover key={item.id}>
                <TableCell>{item.id}</TableCell>
                <TableCell>{item.name}</TableCell>
                <TableCell>{item.createdAt || "N/A"}</TableCell>
                <TableCell>{item.payload || "N/A"}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        component="div"
        count={count}
        page={page}
        onPageChange={handleChangePage}
        rowsPerPage={limit}
        onRowsPerPageChange={handleChangeRowsPerPage}
        rowsPerPageOptions={[5, 10, 25, 50]}
        labelDisplayedRows={() => `Page ${page + 1}`}
        ActionsComponent={(subprops) => (
          <TablePaginationActions
            {...subprops}
            nextAnchor={nextAnchor}
            anchorStack={anchorStack}
          />
        )}
      />
    </Paper>
  );
};

const TablePaginationActions = (props) => {
  const { page, onPageChange, nextAnchor, anchorStack } = props;

  const handleBackButtonClick = (event) => {
    onPageChange(event, page - 1);
  };

  const handleNextButtonClick = (event) => {
    onPageChange(event, page + 1);
  };

  return (
    <div style={{ flexShrink: 0, marginLeft: 8 }}>
      <IconButton
        onClick={handleBackButtonClick}
        disabled={anchorStack.length <= 1}
        aria-label="previous page"
      >
        <KeyboardArrowLeft />
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={!nextAnchor}
        aria-label="next page"
      >
        <KeyboardArrowRight />
      </IconButton>
    </div>
  );
};

export default PaginatedData;
