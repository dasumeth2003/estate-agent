import React from 'react';

// PropertyCard Component - Displays individual property preview
function PropertyCard({ property, onView, onFavorite, isFavorite, onDragStart }) {
  const handleImageError = (e) => {
    console.log('Image failed to load: ', e.target.src);
    e.target.src = "/images/placeholder.jpg";
  }
  
  return (
    <div
      draggable // Makes the card draggable
      onDragStart={onDragStart}
      className="property-card"
    >
      {/* Property Image */}
      <img
        src={`/${property.images[0]}`}
        alt={property.location}
        className="property-image"
        onError={handleImageError}
      />
      
      <div className="property-content">
        {/* Price and Favorite Button Row */}
        <div className="property-header">
          <h3 className="property-price">
            £{property.price.toLocaleString()}
          </h3>
          <button
            onClick={(e) => {
              e.stopPropagation(); // Prevent card click event
              onFavorite();
            }}
            className={`favorite-button ${isFavorite ? 'active' : ''}`}
            title={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
          >
            ❤️
          </button>
        </div>
        
        {/* Location */}
        <p className="property-location">
          📍 {property.location}
        </p>
        
        {/* Property Details */}
        <div className="property-details">
          <span className="detail-item">
            🏠 {property.type}
          </span>
          <span className="detail-item">
            🛏️ {property.bedrooms} bed
          </span>
        </div>
        
        {/* Short Description */}
        <p className="property-description">
          {property.description.substring(0, 100)}...
        </p>
        
        {/* View Details Button */}
        <button onClick={onView} className="view-button">
          View Details
        </button>
      </div>
    </div>
  );
}

export default PropertyCard;