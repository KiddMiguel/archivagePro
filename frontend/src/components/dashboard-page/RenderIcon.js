import React from 'react';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import ArticleIcon from '@mui/icons-material/Article';
import ImageIcon from '@mui/icons-material/Image';
import MusicVideoIcon from '@mui/icons-material/MusicVideo';
import JavascriptIcon from '@mui/icons-material/Javascript';
import PhpIcon from '@mui/icons-material/Php';
import VideoLibraryIcon from '@mui/icons-material/VideoLibrary';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';

const RenderIcon = ({ type }) => {
  const commonStyles = { fontSize: "25px" };

  switch (type.toUpperCase()) {
    case "PDF":
      return <PictureAsPdfIcon sx={{ ...commonStyles, color: "tomato" }} />;
    case "DOC":
    case "DOCX":
      return <ArticleIcon sx={{ ...commonStyles, color: type === "DOC" ? "#00a8e8" : "blue" }} />;
    case "IMAGE":
    case "PNG":
    case "JPG":
    case "JPEG":
      return <ImageIcon sx={{ ...commonStyles, color: "green" }} />;
    case "MP3":
      return <MusicVideoIcon sx={{ ...commonStyles, color: "purple" }} />;
    case "JS":
    case "JSX":
      return <JavascriptIcon sx={{ fontSize: "45px", color: "#fdc500" }} />;
    case "PHP":
      return <PhpIcon sx={{ fontSize: "35px", color: "#8892bf" }} />;
    case "MP4":
      return <VideoLibraryIcon sx={{ ...commonStyles, color: "#c1121f" }} />;
    default:
      return <InsertDriveFileIcon sx={{ ...commonStyles, color: "gray" }} />;
  }
};

export default RenderIcon;
