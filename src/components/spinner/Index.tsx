import React from "react";
import './styles.css';

function Index() {
  return (
    <div className="d-flex justify-content-center spinner">
      <div className="spinner-border" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
    </div>
  );
}

export default Index;
