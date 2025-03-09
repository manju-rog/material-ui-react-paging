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
  Button,
} from "@mui/material";

const PaginatedData = () => {
  const [data, setData] = useState([]);
  const [currentAnchor, setCurrentAnchor] = useState(0);
  const [limit, setLimit] = useState(25);
  const [nextAnchor, setNextAnchor] = useState(null);
  const [anchorStack, setAnchorStack] = useState([0]);
  const [totalRecords, setTotalRecords] = useState(0);

  useEffect(() => {
    // Initial data load with anchor 0
    fetchData(0, limit, "init");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // This function fetches data given an anchor, limit, and navigation direction.
  const fetchData = async (anchor, limit, direction) => {
    try {
      const response = await axios.get(
        `http://localhost:8080/api/entities?anchorId=${anchor}&limit=${limit}`
      );
      const result = response.data;
      setData(result.data || []);
      setTotalRecords(result.totalRecords || 0);

      if (direction === "next") {
        // For "next", push the anchor used for this call onto the stack
        setAnchorStack(prev => [...prev, anchor]);
        // Update currentAnchor to the new nextAnchor returned by the API
        setCurrentAnchor(result.nextAnchor || 0);
      } else if (direction === "prev") {
        // For "prev", we already update the anchor stack in the handler.
        setCurrentAnchor(anchor);
      } else if (direction === "init") {
        // Initial load: set currentAnchor from the API result
        setCurrentAnchor(result.nextAnchor || 0);
      }
      setNextAnchor(result.nextAnchor || null);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  // "Next" simply calls fetchData with the current anchor.
  const handleNext = () => {
    if (nextAnchor) {
      fetchData(currentAnchor, limit, "next");
    }
  };

  // "Previous" now pops the last anchor off the stack and uses the new last value.
  const handlePrevious = () => {
    if (anchorStack.length > 1) {
      const newStack = [...anchorStack];
      newStack.pop(); // remove the current page's anchor
      const previousAnchor = newStack[newStack.length - 1] || 0;
      setAnchorStack(newStack);
      fetchData(previousAnchor, limit, "prev");
    }
  };

  const handleChangeRowsPerPage = (event) => {
    const newLimit = parseInt(event.target.value, 10);
    setLimit(newLimit);
    // Reset pagination when limit changes
    setAnchorStack([0]);
    setCurrentAnchor(0);
    fetchData(0, newLimit, "init");
  };

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
      
      {/* Custom navigation buttons and updated pagination footer */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "0 16px",
        }}
      >
        <div>
          <Button onClick={handlePrevious} disabled={anchorStack.length <= 1}>
            Previous
          </Button>
          <Button onClick={handleNext} disabled={!nextAnchor}>
            Next
          </Button>
        </div>
        <TablePagination
          component="div"
          count={totalRecords}
          page={0} // dummy page number since we're using anchor-based navigation
          onPageChange={() => {}}
          rowsPerPage={limit}
          onRowsPerPageChange={handleChangeRowsPerPage}
          rowsPerPageOptions={[5, 10, 25, 50]}
          // UPDATED: simplified label (removed anchor info)
          labelDisplayedRows={() =>
            `Showing ${data.length} records of ${totalRecords}`
          }
        />
      </div>
    </Paper>
  );
};

export default PaginatedData;
