import React, { useEffect, useState } from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import { Box, Avatar, IconButton } from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import "../../assets/styles/stylesAgDataGrid.css";
import { getAllFiles, getFolderFiles } from '../../services/serviceFiles';
import RenderIcon from './RenderIcon';

const FilesTable = ({ rootFolder, filesUpdated, folder }) => {
  console.log("rootFolder", rootFolder);
  console.log("folder", folder);
  const [rowData, setRowData] = useState([]);

  const handleFiles = async () => {
    const files =  rootFolder ?  await getAllFiles(rootFolder.owner) : await getFolderFiles(folder._id);


    let totalSizeInBytes = 0;
    console.log("files", files);

    // Convertir la taille des fichiers en Ko, Mo, Go et calculer la taille totale
   files && files.forEach((file) => {
      totalSizeInBytes += file.length; // Ajouter la taille de chaque fichier en octets

      // Formater la taille de chaque fichier individuellement
      let fileSize = file.length;
      let i = 0;
      const byteUnits = ['octets', 'Ko', 'Mo', 'Go', 'To', 'Po', 'Eo', 'Zo', 'Yo'];

      while (fileSize >= 1024 && i < byteUnits.length - 1) {
        fileSize /= 1024;
        i++;
      }

      file.fileSize = `${fileSize.toFixed(2)} ${byteUnits[i]}`;
    });

    setRowData(files);
  };


  const columnDefs = [
    {
      headerName: "Titre du document",
      field: "filename",
      sortable: true,
      filter: "agTextColumnFilter",
      resizable: true,
      flex: 2,
      cellStyle: { textAlign: 'left' },
      cellRenderer: (params) => (
        <Box display="flex" alignItems="center" sx={{fontWeight : "600"}}>
          <Avatar sx={{ bgcolor: "#f5f5f5", color: "#000", mr: 2}}>
            {<RenderIcon type={params.data.filename.split(".").slice(-1)[0]} />}
          </Avatar>
          {params.value}
        </Box>
      ),
    },
    {
      headerName: "Date de création",
      field: "uploadDate",
      sortable: true,
      filter: "agDateColumnFilter",
      resizable: true,
      flex: 1,
      cellStyle: { textAlign: 'left' },
      filterParams: {
        comparator: (filterLocalDateAtMidnight, cellValue) => {
          const cellDate = new Date(cellValue);
          if (cellDate < filterLocalDateAtMidnight) {
            return -1;
          } else if (cellDate > filterLocalDateAtMidnight) {
            return 1;
          } else {
            return 0;
          }
        }
      }
    },
    {
      headerName: "Taille du fichier",
      field: "fileSize",
      sortable: true,
      filter: "agNumberColumnFilter",
      resizable: true,
      flex: 1,
      cellStyle: { textAlign: 'left' },
    },
    {
      headerName: "Dossier",
      field: "parentFolderName",
      sortable: true,
      filter: true,
      resizable: true,
      flex: 2,
      cellStyle: { textAlign: 'left' }
    },
    {
      headerName: "",
      field: "options",
      cellRenderer: () => (
        <IconButton>
          <MoreVertIcon />
        </IconButton>
      ),
      width: 50,
      sortable: false,
      filter: false,
      resizable: false,
      cellStyle: { textAlign: 'left' },
    },
  ];

  useEffect(() => {
    handleFiles();
  }, [rootFolder, filesUpdated]);

  return (
    <div className="ag-theme-alpine" style={{ height: '100%', width: '100%', padding: '16px' }}>
      <AgGridReact
        columnDefs={columnDefs}
        rowData={rowData}
        defaultColDef={{
          sortable: true,
          filter: true,
          resizable: true,
        }}
        pagination={true}
        paginationPageSize={10}
        suppressRowClickSelection={true}
        rowSelection="none"
        rowHeight={55}
      />
    </div>
  );
};

export default FilesTable;
