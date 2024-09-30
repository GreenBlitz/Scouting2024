import { DataGrid, GridColDef } from "@mui/x-data-grid";
import Paper from "@mui/material/Paper";
import React from "react";

const paginationModel = { page: 0, pageSize: 5 };

interface TableChartProps {
  matches: Record<string, string>[];
  calculations?: Record<string,(match: Record<string,string>) => string>;
  idName: string;
}

const TableChart: React.FC<TableChartProps> = ({ matches, idName, calculations}) => {
  const table: Record<string, string[]> = {};
  matches.forEach((match) => {
    Object.entries(match).forEach(([key, value]) => {
      if (!table[key]) table[key] = [];
      table[key] = [...table[key], value];
    });
  });

  const columns: GridColDef[] = Object.keys(table).map((header) => {
    return { field: header, headerName: header, width: 130 };
  });

  const rows = matches.map((match) => {})

  return (
    <Paper sx={{ height: 400, width: "100%" }}>
      <DataGrid
        rows={matches}
        columns={columns}
        initialState={{ pagination: { paginationModel } }}
        pageSizeOptions={[5, 10]}
        sx={{ border: 0 }}
        getRowId={(row) => row[idName]}
      />
    </Paper>
  );
};

export default TableChart;
