import { useRef, useState } from 'react';
import AttachmentsUI from './AttachmentsUI';

function Attachments({ attachments, onChange }) {
  const fileInputRef = useRef();
  const [isDragOver, setIsDragOver] = useState(false);
  const [uploadProgress, setUploadProgress] = useState({});

  const handleFileUpload = (files) => {
    const fileArray = Array.from(files);
    const newAttachments = fileArray.map((file, index) => ({
      id: Math.max(0, ...attachments.map(a => a.id)) + index + 1,
      name: file.name,
      size: file.size,
      type: getFileType(file),
      file: file, // Store file object for actual upload
    }));
    
    onChange([...attachments, ...newAttachments]);
    
    // Simulate upload progress
    newAttachments.forEach(attachment => {
      simulateUpload(attachment.id);
    });
  };

  const handleInputChange = (e) => {
    if (e.target.files?.length) {
      handleFileUpload(e.target.files);
    }
  };

  const handleDeleteAttachment = (id) => {
    onChange(attachments.filter(a => a.id !== id));
    // Remove from upload progress
    setUploadProgress(prev => {
      const newProgress = { ...prev };
      delete newProgress[id];
      return newProgress;
    });
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragOver(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragOver(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragOver(false);
    
    if (e.dataTransfer.files?.length) {
      handleFileUpload(e.dataTransfer.files);
    }
  };

  const getFileType = (file) => {
    if (file.type.startsWith('image/')) return 'image';
    if (file.type.startsWith('video/')) return 'video';
    if (file.type.includes('pdf')) return 'pdf';
    if (file.type.includes('word') || file.name.endsWith('.doc') || file.name.endsWith('.docx')) return 'document';
    if (file.type.includes('sheet') || file.name.endsWith('.xls') || file.name.endsWith('.xlsx')) return 'spreadsheet';
    return 'document';
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const simulateUpload = (attachmentId) => {
    let progress = 0;
    const interval = setInterval(() => {
      progress += Math.random() * 30;
      if (progress >= 100) {
        progress = 100;
        clearInterval(interval);
        setUploadProgress(prev => {
          const newProgress = { ...prev };
          delete newProgress[attachmentId];
          return newProgress;
        });
      } else {
        setUploadProgress(prev => ({
          ...prev,
          [attachmentId]: progress
        }));
      }
    }, 200);
  };

  const openFileBrowser = () => {
    fileInputRef.current?.click();
  };

  return (
    <AttachmentsUI
      attachments={attachments}
      isDragOver={isDragOver}
      uploadProgress={uploadProgress}
      fileInputRef={fileInputRef}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      onInputChange={handleInputChange}
      onDeleteAttachment={handleDeleteAttachment}
      onOpenFileBrowser={openFileBrowser}
      formatFileSize={formatFileSize}
    />
  );
}

export default Attachments;