import React, { useEffect, useState } from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import { Box, Avatar, IconButton, Menu, MenuItem } from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import FolderIcon from '@mui/icons-material/Folder';
import "../../assets/styles/stylesAgDataGrid.css";
import { deleteFile, downloadFile, getAllFiles, getFolderFiles } from '../../services/serviceFiles';
import RenderIcon from './RenderIcon';
import DownloadIcon from '@mui/icons-material/Download';
import DeleteIcon from '@mui/icons-material/Delete';
import { CircularProgress } from '@mui/material';

const FilesTable = ({ rootFolder, filesUpdated, folder }) => {
  const [rowData, setRowData] = useState([]);
  const [loadingDonwload, setLoadingDownload] = useState(false);
  const [loadingDelete, setLoadingDelete] = useState(false);

  const handleFiles = async () => {
    const files = rootFolder ? await getAllFiles(rootFolder.owner) : await getFolderFiles(folder._id);
    let totalSizeInBytes = 0;

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
      cellRenderer: (params) => {
        const fixedText = decodeURIComponent(escape(params.value));
        return (
          <Box display="flex" alignItems="center" sx={{ fontWeight: "600" }}>
            <Avatar sx={{ bgcolor: "#f5f5f5", color: "#000", mr: 2 }}>
              {<RenderIcon type={params.data.filename.split(".").slice(-1)[0]} />}
            </Avatar>
            {fixedText}
          </Box>
        );
      },
    },
    {
      headerName: "Date de création",
      field: "uploadDate",
      sortable: true,
      filter: "agDateColumnFilter",
      resizable: true,
      flex: 1,
      cellStyle: { textAlign: 'left' },
      valueFormatter: (params) => {
        if (params.value) {
          const date = new Date(params.value);
          return date.toLocaleDateString('fr-FR', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
          });
        } else {
          return ''; 
        }
      },
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
      field: "metadata.parentFolderName",
      sortable: true,
      filter: true,
      resizable: true,
      flex: 2,
      cellStyle: { textAlign: 'left' },
      valueGetter: (params) => {
        if (params.data.metadata) {
          const folderName = params.data.metadata.parentFolderName;
          // Check if the folder name starts with "root_"
          if (folderName.startsWith("root_")) {
            return "root";
          }
          return folderName; 
        }
        return '';
      },
      cellRenderer: (params) => {
        return (
          <Box display="flex" alignItems="center">
            <FolderIcon sx={{ color: '#1976d2', marginRight: 1 }} />
            {params.value}
          </Box>
        );
      }
    },
    {
      headerName: "",
      field: "options",
      cellRenderer: (params) => {
        const handleDownloadClick = async () => {
          setLoadingDownload(true);
          await downloadFile(params.data._id);
          setLoadingDownload(false);
        };
              
        const handleDeleteClick = async () => {
          setLoadingDelete(true);
          await deleteFile(params.data._id);
          setLoadingDelete(false);
        };

        return (
          <Box display="flex" justifyContent="center" alignItems="center"  >
            <IconButton onClick={handleDownloadClick} aria-label="download">
              {
                loadingDonwload ? (
                <CircularProgress size={19} sx={{ color: 'grey', position: 'absolute'}} />
                ) : (
                  <DownloadIcon sx={{ color: 'grey', fontSize : "17px" }} />
                )
              }
            </IconButton>
            <IconButton onClick={handleDeleteClick} aria-label="delete">
              {
                loadingDelete ? (
                <CircularProgress size={19} sx={{ color: 'grey', position: 'absolute'}} />
                ) : (
                  <DeleteIcon sx={{ color: 'grey', fontSize : "17px" }} />
                )
              }
            </IconButton>
          </Box>
        );
      },
      width: 70,
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
