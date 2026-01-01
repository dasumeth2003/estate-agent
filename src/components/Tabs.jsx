import React, { useState } from 'react';

/* Tabs Component - Tabbed interface for property details*/
function Tabs({ property }) {
  const [activeTab, setActiveTab] = useState('description');

  const handleImageError = (e) => {
    console.log('Image failes to load: ', e.target.src);
    e.target.src = '/images/placeholder.jpg';
  }

  return (
    <div className="tabs-container">
      {/* Tab Headers */}
      <div className="tabs-header">
        <button
          onClick={() => setActiveTab('description')}
          className={`tab-button ${activeTab === 'description' ? 'active' : ''}`}
          type="button"
        >
          📝 Description
        </button>
        <button
          onClick={() => setActiveTab('floorplan')}
          className={`tab-button ${activeTab === 'floorplan' ? 'active' : ''}`}
          type="button"
        >
          📐 Floor Plan
        </button>
        <button
          onClick={() => setActiveTab('map')}
          className={`tab-button ${activeTab === 'map' ? 'active' : ''}`}
          type="button"
        >
          🗺️ Map
        </button>
      </div>

      {/* Tab Content */}
      <div className="tabs-content">
        {activeTab === 'description' && (
          <div className="tab-panel">
            <h3>Property Description</h3>
            <p className="description-text">{property.longDescription}</p>
            <div className="property-info">
              <p><strong>Added:</strong> {property.added.month} {property.added.day}, {property.added.year}</p>
              <p><strong>Tenure:</strong> {property.tenure}</p>
            </div>
          </div>
        )}

        {activeTab === 'floorplan' && (
          <div className="tab-panel">
            <h3>Floor Plan</h3>
            <img
              src={property.floorPlan}
              alt="Floor Plan"
              className="floorplan-image"
              onError={handleImageError}
            />
          </div>
        )}

        {activeTab === 'map' && (
          <div className="tab-panel">
            <h3>Location</h3>
            <div className="map-placeholder">
              <div className="map-content">
                <p className="map-icon">📍</p>
                <p className="map-location">{property.location}</p>
                <p className="map-note">Google Maps would be embedded here</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Tabs;