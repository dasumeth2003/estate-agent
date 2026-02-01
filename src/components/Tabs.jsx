import React, { useState } from 'react';

/* Tabs Component - Tabbed interface for property details*/
function Tabs({ property }) {
  const [activeTab, setActiveTab] = useState('description');

  const handleImageError = (e) => {
    console.log('Image failed to load: ', e.target.src);
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
          Description
        </button>
        <button
          onClick={() => setActiveTab('floorplan')}
          className={`tab-button ${activeTab === 'floorplan' ? 'active' : ''}`}
          type="button"
        >
         Floor Plan
        </button>
        <button
          onClick={() => setActiveTab('map')}
          className={`tab-button ${activeTab === 'map' ? 'active' : ''}`}
          type="button"
        >
          Location Map
        </button>
      </div>

      {/* Tab Content */}
      <div className="tabs-content">
        {/* Description Tab */}
        {activeTab === 'description' && (
          <div className="tab-panel">
            <h3>Property Description</h3>
            <p className="description-text">{property.longDescription}</p>
            <div className="property-info">
              <p><strong>Added:</strong> {property.added.month} {property.added.day}, {property.added.year}</p>
              <p><strong>Tenure:</strong> {property.tenure}</p>
              <p><strong>Property Type:</strong> {property.type}</p>
              <p><strong>Bedrooms:</strong> {property.bedrooms}</p>
            </div>
          </div>
        )}

        {/* Floor Plan Tab */}
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

        {/* Google Map Tab */}
        {activeTab === 'map' && (
          <div className="tab-panel">
            <h3> Map</h3>
            
            {/* Google Maps Interactive Section */}
            <div className="map-placeholder">
              <div className="map-content">
                <div className="map-icon">🗺️</div>
                <h4 className="map-location">{property.location}</h4>
                <p className="map-postcode">Postcode Area: {property.postcode}</p>
                
                {/* Google Maps Button */}
                <a 
                  href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(property.location)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="view-map-button"
                >
                  Open in Google Maps →
                </a>
              </div>
            </div>

          
          </div>
        )}
      </div>
    </div>
  );
}

export default Tabs;