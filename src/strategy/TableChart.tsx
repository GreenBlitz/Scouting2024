import { DataGrid, GridColDef } from "@mui/x-data-grid";
import Paper from "@mui/material/Paper";
import React from "react";

const paginationModel = { page: 0, pageSize: 5 };

interface TableChartProps {
  matches: Record<string, string>[];
  calculations?: Record<string, (match: Record<string, string>) => string>;
  idName: string;
}

const TableChart: React.FC<TableChartProps> = ({
  matches,
  idName,
  calculations,
}) => {
  if (calculations) {
    matches.forEach((match) =>
      Object.entries(calculations).forEach(
        ([calculationName, calculationFunction]) =>
          (match[calculationName] = calculationFunction(match))
      )
    );
  }
  const columnNames: Set<string> = new Set<string>();
  matches.forEach((match) => {
    Object.keys(match).forEach((item) => columnNames.add(item));
  });

  const columns: GridColDef[] = [...columnNames.values()].map((columnName) => {
    return { field: columnName, headerName: columnName, width: 130 };
  });

  console.log(columnNames);

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
