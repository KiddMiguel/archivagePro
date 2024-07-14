// src/pages/APIRest.js
import React, { useEffect, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import { Container, Box, Typography, Paper, Link } from '@mui/material';

const APIRest = () => {
  const [content, setContent] = useState('');

  useEffect(() => {
    fetch('/README.md')
      .then((response) => response.text())
      .then((text) => setContent(text));
  }, []);

  return (
    <Container sx={{ display: 'flex', flexDirection: 'row', marginTop: '20px' }}>
      <Box sx={{ width: '25%', paddingRight: '20px' }}>
        <Paper elevation={3} sx={{ padding: '20px', height: '100%' }}>
          <Typography variant="h6" gutterBottom>
            Navigation
          </Typography>
          <ul>
            <li><Link href="#introduction" color="inherit">Introduction</Link></li>
            <li><Link href="#architecture" color="inherit">Architecture</Link></li>
            <li><Link href="#endpoints" color="inherit">Endpoints</Link></li>
            <li><Link href="#authentication" color="inherit">Authentication</Link></li>
            <li><Link href="#installation" color="inherit">Installation</Link></li>
            <li><Link href="#usage" color="inherit">Usage</Link></li>
          </ul>
        </Paper>
      </Box>
      <Box sx={{ width: '75%' }}>
        <Paper elevation={3} sx={{ padding: '20px' }}>
          <ReactMarkdown components={{
            h1: ({node, ...props}) => <Typography variant="h4" component="h1" gutterBottom sx={{ fontWeight: 'bold', marginTop: '20px' }} {...props} />,
            h2: ({node, ...props}) => <Typography variant="h5" component="h2" gutterBottom sx={{ fontWeight: 'bold', marginTop: '20px' }} {...props} />,
            h3: ({node, ...props}) => <Typography variant="h6" component="h3" gutterBottom sx={{ fontWeight: 'bold', marginTop: '15px' }} {...props} />,
            p: ({node, ...props}) => <Typography variant="body1" gutterBottom {...props} />,
            ul: ({node, ...props}) => <Box component="ul" sx={{ paddingLeft: '20px' }} {...props} />,
            li: ({node, ...props}) => <Typography variant="body2" component="li" sx={{ marginBottom: '10px' }} {...props} />
          }}>{content}</ReactMarkdown>
        </Paper>
      </Box>
    </Container>
  );
};

export default APIRest;
