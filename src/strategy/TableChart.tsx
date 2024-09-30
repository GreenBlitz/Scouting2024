import { DataGrid, GridColDef } from "@mui/x-data-grid";
import Paper from "@mui/material/Paper";
import React, { useEffect } from "react";

const columnSSs: GridColDef[] = [
  { field: "id", headerName: "ID", width: 70 },
  { field: "firstName", headerName: "First name", width: 130 },
  { field: "lastName", headerName: "Last name", width: 130 },
  {
    field: "age",
    headerName: "Age",
    type: "number",
    width: 90,
  },
  {
    field: "fullName",
    headerName: "Full name",
    description: "This column has a value getter and is not sortable.",
    sortable: false,
    width: 160,
  },
];

const rows = [
  { id: 1, lastName: "Snow", firstName: "Jon", age: 35 },
  { id: 2, lastName: "Lannister", firstName: "Cersei", age: 42 },
  { id: 3, lastName: "Lannister", firstName: "Jaime", age: 45 },
  { id: 4, lastName: "Stark", firstName: "Arya", age: 16 },
  { id: 5, lastName: "Targaryen", firstName: "Daenerys", age: null },
  { id: 6, lastName: "Melisandre", firstName: null, age: 150 },
  { id: 7, lastName: "Clifford", firstName: "Ferrara", age: 44 },
  { id: 8, lastName: "Frances", firstName: "Rossini", age: 36 },
  { id: 9, lastName: "Roxie", firstName: "Harvey", age: 65 },
];

const paginationModel = { page: 0, pageSize: 5 };

interface TableChartProps {
  matches: Record<string, string>[];
  idName: string;
}

const TableChart: React.FC<TableChartProps> = ({ matches, idName }) => {
  const table: Record<string, string[]> = {};
  matches.forEach((match) => {
    Object.entries(match).forEach(([key, value]) => {
      if (!table[key]) table[key] = [value];
      table[key] = [...table[key], value];
    });
  });

  const columns: GridColDef[] = Object.keys(table).map((header) => {
    return { field: header, headerName: header, width: 130 };
  });

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
