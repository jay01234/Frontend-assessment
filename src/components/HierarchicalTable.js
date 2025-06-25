import React from "react";
import HierarchicalTableRow from "./HierarchicalTableRow";
import { calculateSubtotal } from "../utils/calculations.js";
import {
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
} from "@mui/material";

const HierarchicalTable = ({ data }) => {
  const grandTotal = data.reduce((sum, row) => sum + calculateSubtotal(row), 0);

  return (
    <Table
      sx={{
        width: "100%",
        backgroundColor: "#fff",
        borderRadius: 2,
        boxShadow: 1,
        overflow: "hidden",
        mt: 2,
      }}
    >
      <TableHead>
        <TableRow sx={{ backgroundColor: "#004d99" }}>
          <TableCell sx={{ color: "white", fontWeight: 600, fontSize: 15 }}>
            Label
          </TableCell>
          <TableCell sx={{ color: "white", fontWeight: 600, fontSize: 15 }}>
            Value
          </TableCell>
          <TableCell sx={{ color: "white", fontWeight: 600, fontSize: 15 }}>
            Input
          </TableCell>
          <TableCell sx={{ color: "white", fontWeight: 600, fontSize: 15 }}>
            Allocation %
          </TableCell>
          <TableCell sx={{ color: "white", fontWeight: 600, fontSize: 15 }}>
            Allocation Val
          </TableCell>
          <TableCell sx={{ color: "white", fontWeight: 600, fontSize: 15 }}>
            Variance %
          </TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {data.map((row) => (
          <HierarchicalTableRow key={row.id} row={row} level={0} />
        ))}
        <TableRow
          sx={{
            fontWeight: "bold",
            backgroundColor: "#e6f2ff",
            color: "#003366",
          }}
        >
          <TableCell sx={{ fontWeight: "bold", color: "#003366" }}>
            Grand Total
          </TableCell>
          <TableCell sx={{ fontWeight: "bold", color: "#003366" }}>
            {grandTotal}
          </TableCell>
          <TableCell colSpan={4}></TableCell>
        </TableRow>
      </TableBody>
    </Table>
  );
};

export default HierarchicalTable;
