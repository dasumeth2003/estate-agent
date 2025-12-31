import React from 'react';
import ImageGallery from './ImageGallery';
import Tabs from './Tabs';

/* Shows: image gallery, property info, tabs with description/floor plan/map*/
function PropertyDetails({ property, onBack, onFavorite, isFavorite }) {
  
  // Error handling - property not found
  if (!property) {
    return (
      <div className="error-container">
        <div className="error-content">
          <h2>❌ Property Not Found</h2>
          <p>The property you're looking for doesn't exist.</p>
          <button onClick={onBack} className="back-button">
            ← Back to Search
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="property-details-container">
      {/* Back Button */}
      <button onClick={onBack} className="back-button">
        ← Back to Search
      </button>

      <div className="property-details-content">
        {/* Main Property Header */}
        <div className="property-header-details">
          <div className="header-left">
            <h1 className="details-price">£{property.price.toLocaleString()}</h1>
            <p className="details-location">
              📍 {property.location}
            </p>
            <p className="details-postcode">
              Postcode Area: <strong>{property.postcode}</strong>
            </p>
          </div>
          
          <div className="header-right">
            <button
              onClick={onFavorite}
              className={`favorite-button-large ${isFavorite ? 'active' : ''}`}
              title={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
            >
              {isFavorite ? '❤️ Saved' : '🤍 Save Property'}
            </button>
          </div>
        </div>

        {/* Image Gallery */}
        <ImageGallery images={property.images} alt={property.location} />

        {/* Short Description */}
        <div className="property-summary">
          <h2>Property Overview</h2>
          <p>{property.description}</p>
        </div>

        {/* Property Key Features */}
        <div className="property-features">
          <div className="feature">
            <span className="feature-icon">🏠</span>
            <div className="feature-text">
              <strong>Type</strong>
              <p>{property.type}</p>
            </div>
          </div>
          
          <div className="feature">
            <span className="feature-icon">🛏️</span>
            <div className="feature-text">
              <strong>Bedrooms</strong>
              <p>{property.bedrooms} Bedroom{property.bedrooms !== 1 ? 's' : ''}</p>
            </div>
          </div>
          
          <div className="feature">
            <span className="feature-icon">📜</span>
            <div className="feature-text">
              <strong>Tenure</strong>
              <p>{property.tenure}</p>
            </div>
          </div>
          
          <div className="feature">
            <span className="feature-icon">📅</span>
            <div className="feature-text">
              <strong>Added</strong>
              <p>{property.added.month} {property.added.day}, {property.added.year}</p>
            </div>
          </div>
        </div>

        {/* Tabbed Content - Description, Floor Plan, Map */}
        <Tabs property={property} />

        {/* Contact Section */}
        <div className="contact-section">
          <h3>Interested in this property?</h3>
          <div className="contact-buttons">
            <button className="contact-button primary">
              📧 Contact Agent
            </button>
            <button className="contact-button secondary">
              📞 Request Viewing
            </button>
            <button className="contact-button secondary">
              📄 Download Details
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PropertyDetails;