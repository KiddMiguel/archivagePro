import React, { useState, useEffect } from 'react';
import {
  Box, Typography, Divider, Grid, IconButton
} from '@mui/material';
import { AgGridReact } from 'ag-grid-react';
import GetAppIcon from '@mui/icons-material/GetApp';
import DownloadIcon from '@mui/icons-material/Download';
import { CircularProgress } from '@mui/material';


const TabPanel = (props) => {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          {children}
        </Box>
      )}
    </div>
  );
};

const TabPanelSecurity = ({ selectedTab, index, user }) => {
  const [rowData, setRowData] = useState([]);
  const [loadingStates, setLoadingStates] = useState({});

  const handleDownloadClick = async (invoiceId) => {
    setLoadingStates(prevState => ({ ...prevState, [invoiceId]: 'download' }));
    setTimeout(() => {
        handleDownload(invoiceId);
    }, 1000);

    setLoadingStates(prevState => ({ ...prevState, [invoiceId]: false }));
    };


  const columnDefs = [
    { headerName: 'Titre', field: 'name', sortable: true, filter: true, resizable: true },
    { headerName: 'Date', field: 'date', sortable: true, filter: true, resizable: true },
    { headerName: 'Montant', field: 'amount', sortable: true, filter: true, resizable: true },
    { headerName: 'Statut', field: 'status', sortable: true, filter: true, resizable: true },
    { 
        headerName: "",
        field: "options",
        cellRenderer: (params) => {
          const isDownloading = loadingStates[params.data._id] === 'download';
  
          return (
            <Box display="flex" justifyContent="center" alignItems="center">
              <IconButton onClick={() => handleDownloadClick(params.data._id)} aria-label="download">
                {isDownloading ? (
                  <CircularProgress size={19} sx={{ color: 'grey', position: 'absolute' }} />
                ) : (
                  <DownloadIcon sx={{ color: 'grey', fontSize: "17px" }} />
                )}
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

  // Simulate fetching data from a database (MongoDB document in your image)
  useEffect(() => {
    const fetchedData = [
      {
        name: "Facture pour le service de stockage de fichiers, ArchiDrive Premium.",
        date: "2024-08-25T19:07:38.275+00:00",
        amount: 20,
        status: "paid",
      }
    ];
    setRowData(fetchedData);
  }, []);

  const handleDownload = (data) => {
    // Logic to handle downloading the invoice
    // This could be a fetch call to download the PDF or any other action
    console.log('Downloading invoice for:', data.name);
  };

  return (
    <TabPanel value={selectedTab} index={index}>
      <Typography variant="h6" align='left'>Factures</Typography>
      <Divider sx={{ my: 2 }} />
      
        <div className="ag-theme-alpine" style={{ height: '30vw', width: '100%', padding: '16px' }}>
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
    </TabPanel>
  );
};

export default TabPanelSecurity;
