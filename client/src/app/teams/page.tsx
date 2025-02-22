"use client";
import { useGetTeamsQuery } from "@/state/api";
import { useAppSelector } from "../redux";
import {
  DataGrid,
  GridColDef,
  GridToolbarContainer,
  GridToolbarExport,
} from "@mui/x-data-grid";
import { dataGridClassNames, dataGridSxStyles } from "@/lib/utils";
import Header from "@/components/Header/Header";
import { useState } from "react";

const CustomToolbar = () => (
  <GridToolbarContainer className="toolbar flex gap-2">
    <GridToolbarExport />
  </GridToolbarContainer>
);

const columns: GridColDef[] = [
  { field: "id", headerName: "Team ID", width: 100 },
  { field: "teamName", headerName: "Team Name", width: 150 },
  { field: "productOwner", headerName: "Product Owner", width: 150 },
  {
    field: "projectManager",
    headerName: "Project Manager",
    width: 150,
  },
];

const Teams = () => {
  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: 10,
  });

  const { data, isLoading, isError } = useGetTeamsQuery({
    page: paginationModel.page + 1,
    limit: paginationModel.pageSize,
  });

  console.log(data);
  const isDarkMode = useAppSelector((state) => state.global.isDarkMode);

  if (isLoading) return <div>Loading...</div>;
  if (isError || !data?.teams) return <div>Error fetching teams</div>;

  return (
    <div className="flex w-full flex-col p-8">
      <Header name="Teams" />
      <div style={{ minHeight: 350, width: "100%" }}>
        <DataGrid
          rows={data?.teams || []}
          columns={columns}
          rowCount={data?.total || 0}
          paginationMode="server"
          paginationModel={paginationModel}
          onPaginationModelChange={setPaginationModel}
          pageSizeOptions={[5, 10, 20]}
          slots={{ toolbar: CustomToolbar }}
          className={dataGridClassNames}
          sx={dataGridSxStyles(isDarkMode)}
        />
      </div>
    </div>
  );
};

export default Teams;
