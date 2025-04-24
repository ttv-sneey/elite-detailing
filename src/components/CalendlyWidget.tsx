import React, { useEffect } from 'react';

interface CalendlyWidgetProps {
  url?: string;
  minWidth?: string;
  height?: string;
}

const CalendlyWidget: React.FC<CalendlyWidgetProps> = ({
  url = "https://calendly.com/arjunnatt99?hide_landing_page_details=1&hide_gdpr_banner=1&background_color=ffffff",
  minWidth = "320px",
  height = "700px"
}) => {
  useEffect(() => {
    // Load Calendly widget script
    const script = document.createElement('script');
    script.src = 'https://assets.calendly.com/assets/external/widget.js';
    script.async = true;
    document.body.appendChild(script);

    // Cleanup function to remove the script when component unmounts
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <div 
      className="calendly-inline-widget" 
      data-url={url}
      style={{ minWidth, height }}
    />
  );
};

export default CalendlyWidget; 