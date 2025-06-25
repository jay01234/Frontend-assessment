import React, { useState } from "react";
import HierarchicalTableControl from "./HierarchicalTableControl";
import {
  calculateSubtotal,
  distributeToChildren,
  calculateVariance,
} from "../utils/calculations.js";
import { TableRow, TableCell, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { setData } from "../store";

const HierarchicalRow = ({ row, level }) => {
  const [input, setInput] = useState("");
  const data = useSelector((state) => state.hierarchical.data);
  const dispatch = useDispatch();

  const updateData = (id, newValue, type) => {
    const recursiveUpdate = (nodes) =>
      nodes.map((node) => {
        if (node.id === id) {
          let updatedNode = { ...node };
          if (type === "val") {
            updatedNode.value = newValue;
          } else if (type === "percent") {
            updatedNode.value = node.value + (node.value * newValue) / 100;
          }

          if (updatedNode.children) {
            updatedNode.children = distributeToChildren(
              updatedNode.children,
              updatedNode.value
            );
          }

          return updatedNode;
        }

        if (node.children) {
          return {
            ...node,
            children: recursiveUpdate(node.children),
          };
        }

        return node;
      });

    dispatch(setData(recursiveUpdate(data)));
  };

  const value = row.children ? calculateSubtotal(row) : row.value;
  const variance = calculateVariance(row.originalValue, value);

  return (
    <>
      <TableRow>
        <TableCell sx={{ pl: `${level * 4}px` }}>
          <Typography variant="body1">{row.label}</Typography>
        </TableCell>
        <TableCell>
          {typeof value === "number" ? value.toFixed(2) : "—"}
        </TableCell>

        <HierarchicalTableControl
          input={input}
          setInput={setInput}
          onPercent={() => {
            const val = parseFloat(input);
            if (!isNaN(val)) updateData(row.id, val, "percent");
          }}
          onValue={() => {
            const val = parseFloat(input);
            if (!isNaN(val)) updateData(row.id, val, "val");
          }}
        />

        <TableCell>{variance}%</TableCell>
      </TableRow>
      {row.children &&
        row.children.map((child) => (
          <HierarchicalRow key={child.id} row={child} level={level + 1} />
        ))}
    </>
  );
};

export default HierarchicalRow;
