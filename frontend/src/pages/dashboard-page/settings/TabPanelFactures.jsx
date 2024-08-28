import React, { useState, useEffect } from 'react';
import {
  Box, Typography, Divider, Grid, IconButton
} from '@mui/material';
import { AgGridReact } from 'ag-grid-react';
import GetAppIcon from '@mui/icons-material/GetApp';
import DownloadIcon from '@mui/icons-material/Download';
import { CircularProgress } from '@mui/material';
import { getInvoices } from '../../../services/serviceInvoices';


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
  const [error, setError] = useState(null);

  const handleInvoices = async () => {
    const response = await getInvoices();
    if (response.statut) {
      setRowData(response.invoices);
    }else{
      setError(response.message);
    }
  };


  const handleDownloadClick = async (invoiceId) => {
    setLoadingStates(prevState => ({ ...prevState, [invoiceId]: 'download' }));
    setTimeout(() => {
        handleDownload(invoiceId);
    }, 1000);

    setLoadingStates(prevState => ({ ...prevState, [invoiceId]: false }));
    };


    const columnDefs = [
      { 
        headerName: 'Titre', 
        field: '_id', 
        sortable: true,
        resizable: true,
        flex: 2,
        cellStyle: { textAlign: 'left', fontWeight: 'bold', color: '#4A4A4A' },
      },
      { 
        headerName: 'Date', 
        field: 'date', 
        sortable: true,
        filter: "agDateColumnFilter",
        resizable: true,
        flex: 1,
        cellStyle: { textAlign: 'left', color: '#4A4A4A' },
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
        headerClass: 'custom-header'
      },
      { 
        headerName: 'Montant', 
        field: 'amount', 
        sortable: true,
        resizable: true,
        flex: 1,
        cellStyle: { textAlign: 'right', color: '#4A4A4A' },
        headerClass: 'custom-header',
        valueFormatter: (params) => {
          return new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' }).format(params.value);
        },
      },
      { 
        headerName: 'Statut', 
        field: 'status', 
        sortable: true,
        resizable: true,
        flex: 1,
        cellStyle: params => ({
          textAlign: 'center',
          color: params.value === 'Actif' ? 'green' : 'red',
          fontWeight: 'bold',
        }),
        headerClass: 'custom-header'
      },
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
        flex: 1,
        cellStyle: { textAlign: 'center' },
        headerClass: 'custom-header'
      },
    ];


    

  // Simulate fetching data from a database (MongoDB document in your image)
  useEffect(() => {
    handleInvoices();
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
        {error && <Typography variant="body1" color="error">{error}</Typography>}
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
