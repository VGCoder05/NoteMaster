import { useState, useEffect } from "react";
import NoteMetadataUI from "./NoteMetadataUI";

function NoteMetadata({ created, lastModified }) {
  const [formattedCreated, setFormattedCreated] = useState("");
  const [formattedModified, setFormattedModified] = useState("");
  const [showFullDates, setShowFullDates] = useState(false);

  useEffect(() => {
    // Format dates for display
    setFormattedCreated(formatDate(created));
    setFormattedModified(formatDate(lastModified));
  }, [created, lastModified]);

  const formatDate = (dateString) => {
    if (!dateString) return "";

    // If it's already a relative time (like "2 hours ago"), return as is
    if (dateString.includes("ago") || dateString.includes("Just now")) {
      return dateString;
    }

    // Otherwise, format as a proper date
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      });
    } catch {
      return dateString;
    }
  };

  const getFullDateTime = (dateString) => {
    if (!dateString) return "";

    try {
      const date = new Date(dateString);
      return date.toLocaleString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      });
    } catch {
      return dateString;
    }
  };

  const toggleDateFormat = () => {
    setShowFullDates(!showFullDates);
  };

  return (
    <NoteMetadataUI
      formattedCreated={formattedCreated}
      formattedModified={formattedModified}
      showFullDates={showFullDates}
      onToggleDateFormat={toggleDateFormat}
      getFullDateTime={getFullDateTime}
      created={created}
      lastModified={lastModified}
    />
  );
}

export default NoteMetadata;
