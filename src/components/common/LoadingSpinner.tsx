import React from 'react';

const LoadingSpinner: React.FC = () => {
  return (
    <div className="spinner-overlay"> 
      <div className="spinner-container">
        <div className="spinner" />
      </div>    
    </div>
  );
};

export default LoadingSpinner;
