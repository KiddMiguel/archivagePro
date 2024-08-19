import React, { useEffect } from 'react';
import MarkdownIt from 'markdown-it';
import highlightjs from 'markdown-it-highlightjs';
import 'highlight.js/styles/github.css';  
import './MarkdownStyles.css';

const MarkdownPage = ({ markdownText }) => {
    const [content, setContent] = React.useState('');
  
    const md = new MarkdownIt({
        html: true, 
        linkify: true, 
        typographer: true,
    }).use(highlightjs);

    // Utilisez markdownText comme dépendance du useEffect
    useEffect(() => {
        fetch('/markdown-doc/' + markdownText)
            .then(response => response.text())
            .then(text => setContent(text));
    }, [markdownText]); 

    const renderedHTML = md.render(content);

    return (
        <div
            className="markdown-content" // Applique la classe CSS ici
            dangerouslySetInnerHTML={{ __html: renderedHTML }}
        />
    );
};

export default MarkdownPage;
