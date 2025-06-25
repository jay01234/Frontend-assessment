import React from "react";
import { TextField, Button, TableCell } from "@mui/material";

const HierarchicalTableControl = ({ input, setInput, onPercent, onValue }) => {
  return (
    <>
      <TableCell>
        <TextField
          type="number"
          size="small"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          variant="outlined"
          inputProps={{
            style: { padding: "8px 10px" },
            min: 0,
          }}
          fullWidth
        />
      </TableCell>
      <TableCell>
        <Button
          variant="contained"
          color="primary"
          onClick={onPercent}
          size="small"
        >
          %
        </Button>
      </TableCell>
      <TableCell>
        <Button
          variant="contained"
          color="secondary"
          onClick={onValue}
          size="small"
        >
          Val
        </Button>
      </TableCell>
    </>
  );
};

export default HierarchicalTableControl;
