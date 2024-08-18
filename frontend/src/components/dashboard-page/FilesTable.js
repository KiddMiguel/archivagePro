import React from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import { Box, Avatar, IconButton } from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import "../../assets/styles/stylesAgDataGrid.css";
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import ArticleIcon from '@mui/icons-material/Article';
import ImageIcon from '@mui/icons-material/Image';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import MusicVideoIcon from '@mui/icons-material/MusicVideo';
import JavascriptIcon from '@mui/icons-material/Javascript';
import PhpIcon from '@mui/icons-material/Php';
import VideoLibraryIcon from '@mui/icons-material/VideoLibrary';

const FilesTable = () => {
    const renderIcon = (type) => {
        switch (type.toUpperCase()) {
          case "PDF":
            return <PictureAsPdfIcon sx={{ fontSize: "25px", color: "tomato" }} />;
          case "DOC":
            return <ArticleIcon sx={{ fontSize: "25px", color: "#00a8e8" }} />;
          case "DOCX":
            return <ArticleIcon sx={{ fontSize: "25px", color: "blue" }} />;
          case "IMAGE":
            return <ImageIcon sx={{ fontSize: "25px", color: "green" }} />;
          case "PNG":
            return <ImageIcon sx={{ fontSize: "25px", color: "green" }} />;
          case "JPG":
            return <ImageIcon sx={{ fontSize: "25px", color: "green" }} />;
          case "JPEG":
            return <ImageIcon sx={{ fontSize: "25px", color: "green" }} />;
          case "MP3":
            return <MusicVideoIcon sx={{ fontSize: "25px", color: "purple" }} />;
          case "JS":
            return <JavascriptIcon sx={{ fontSize: "45px", color: "#fdc500" }} />;
         case "PHP":
            return <PhpIcon sx={{ fontSize: "35px", color: "#8892bf" }} />;
         case "JSX":
            return <JavascriptIcon sx={{ fontSize: "45px", color: "#fdc500" }} />;
        case "MP4" : 
            return <VideoLibraryIcon sx={{ fontSize: "25px", color: "#c1121f" }} />;
          default:
            return <InsertDriveFileIcon sx={{ fontSize: "25px", color: "gray" }} />;
        }
      };

  const columnDefs = [
    {
      headerName: "Titre du document",
      field: "name",
      sortable: true,
      filter: "agTextColumnFilter",
      resizable: true,
      flex: 2,
      cellStyle: { textAlign: 'left' },
      cellRenderer: (params) => (
        <Box display="flex" alignItems="center" sx={{fontWeight : "600"}}>
          <Avatar sx={{ bgcolor: "#f5f5f5", color: "#000", mr: 2}}>
          {renderIcon(params.data.type)}
          </Avatar>
          {params.value}
        </Box>
      ),
    },
    {
      headerName: "Date de création",
      field: "dateCreation",
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
      field: "dossier",
      sortable: true,
      filter: true,
      resizable: true,
      flex: 2,
      cellStyle: { textAlign: 'left' },
      cellRenderer: (params) => (
        <Box display="flex">
          {params.value.map((member, i) => (
            <Avatar
              key={i}
              src={member}
              sx={{ width: 24, height: 24, marginLeft: i > 0 ? '-8px' : 0 }}
            />
          ))}
        </Box>
      ),
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

  const rowData = [
    {
      type: "mp4",
      name: "UX Gemastik",
      dateCreation: "Tue, 15 Aug 2023",
      fileSize: "892 MB",
      dossier: ["member1.jpg", "member2.jpg", "member3.jpg"]
    },
    {
        type: "mp3",
      name: "Task Summary",
      dateCreation: "Sun, 13 Aug 2023",
      fileSize: "430 MB",
      dossier: ["member4.jpg", "member5.jpg", "member6.jpg"]
    },
    {
        type: "svg",
      name: "Illustration SVG",
      dateCreation: "Mon, 07 Aug 2023",
      fileSize: "122 MB",
      dossier: ["member7.jpg", "member8.jpg"]
    },
    {
        type: "js",
      name: "Transactions",
      dateCreation: "Wed, 24 Jul 2023",
      fileSize: "999 MB",
      dossier: ["member9.jpg", "member10.jpg", "member11.jpg"]
    },
    {
        type: "ppt",
      name: "Pitch Deck",
      dateCreation: "Sat, 22 Jun 2023",
      fileSize: "192 MB",
      dossier: ["member12.jpg", "member13.jpg"]
    },
    {
        type: "pdf",
      name: "Additional Document 1",
      dateCreation: "Wed, 05 Jul 2023",
      fileSize: "1 GB",
      dossier: ["member14.jpg", "member15.jpg"]
    },
    {
        type: "pdf",
      name: "Additional Document 1",
      dateCreation: "Wed, 05 Jul 2023",
      fileSize: "1 GB",
      dossier: ["member14.jpg", "member15.jpg"]
    },
    {
        type: "JPG",
      name: "Additional Document 1",
      dateCreation: "Wed, 05 Jul 2023",
      fileSize: "1 GB",
      dossier: ["member14.jpg", "member15.jpg"]
    },
    {
        type: "pdf",
      name: "Additional Document 1",
      dateCreation: "Wed, 05 Jul 2023",
      fileSize: "1 GB",
      dossier: ["member14.jpg", "member15.jpg"]
    },
    {
        type: "pdf",
      name: "Additional Document 1",
      dateCreation: "Wed, 05 Jul 2023",
      fileSize: "1 GB",
      dossier: ["member14.jpg", "member15.jpg"]
    },
    {
        type: "doc",
      name: "Additional Document 2",
      dateCreation: "Fri, 09 Jun 2023",
      fileSize: "560 MB",
      dossier: ["member16.jpg", "member17.jpg"]
    }
  ];

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
        // Augmenter la taille des lignes
        rowHeight={55}
      />
    </div>
  );
};

export default FilesTable;
