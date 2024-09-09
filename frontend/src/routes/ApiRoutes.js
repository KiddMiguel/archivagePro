import React from 'react';
import { Route, Navigate, Routes } from 'react-router-dom';
import MarkdownPage from '../pages/api-page/MarkdownPage';
import ApiRest from '../pages/api-page/ApiRest';

const ApiRoutes = () => (
        <Routes>
    <Route path="/api" element={<ApiRest />}>
      <Route index element={<Navigate to="introduction" replace />} />
      <Route path="introduction" element={<MarkdownPage markdownText="introduction.md" />} />
      <Route path="getting-started" element={<MarkdownPage markdownText="getting-started.md" />} />

      {/* Routes pour l'API utilisateur */}
      <Route path="user-api/register" element={<MarkdownPage markdownText="user-register.md" />} />
      <Route path="user-api/login" element={<MarkdownPage markdownText="user-login.md" />} />
      <Route path="user-api/update" element={<MarkdownPage markdownText="user-update.md" />} />
      <Route path="user-api/delete" element={<MarkdownPage markdownText="user-delete.md" />} />
      <Route path="user-api/getProfile" element={<MarkdownPage markdownText="user-getProfile.md" />} />
      <Route path="user-api/changePassword" element={<MarkdownPage markdownText="user-changePassword.md" />} />
      <Route path="user-api/getAll" element={<MarkdownPage markdownText="user-getAll.md" />} />

      {/* Routes pour l'API de facturation */}
      <Route path="billing-api/create" element={<MarkdownPage markdownText="create-invoice.md" />} />
      <Route path="billing-api/invoices" element={<MarkdownPage markdownText="get-invoices.md" />} />
      <Route path="billing-api/update" element={<MarkdownPage markdownText="update-invoice.md" />} />
      <Route path="billing-api/delete" element={<MarkdownPage markdownText="delete-invoice.md" />} />
      <Route path="billing-api/getAll" element={<MarkdownPage markdownText="get-all-invoices.md" />} />

      {/* Routes pour l'API de fichiers */}
      <Route path="files-api/create" element={<MarkdownPage markdownText="create-folder.md" />} />
      <Route path="files-api/delete" element={<MarkdownPage markdownText="delete-folder.md" />} />
      <Route path="files-api/update" element={<MarkdownPage markdownText="update-folder.md" />} />
      <Route path="files-api/getAll" element={<MarkdownPage markdownText="get-all-folders.md" />} />

      {/* Routes pour l'API de dossiers */}
      <Route path="folder-api/create" element={<MarkdownPage markdownText="create-folder.md" />} />
      <Route path="folder-api/delete" element={<MarkdownPage markdownText="delete-folder.md" />} />
      <Route path="folder-api/getAll" element={<MarkdownPage markdownText="get-all-folders.md" />} />

      {/* Route pour la FAQ */}
      

      <Route path="faq" element={<MarkdownPage markdownText="faq.md" />} />
    </Route>
  </Routes>

);

export default ApiRoutes;
