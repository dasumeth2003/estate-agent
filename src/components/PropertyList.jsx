import React from 'react';
import PropertyCard from './PropertyCard';

/* PropertyList Component - Displays grid of properties*/
function PropertyList({ 
  properties, 
  onViewProperty, 
  onAddToFavorites, 
  favorites,
  onDragStart 
}) {
  return (
    <div className="property-list-container">
      <h2 className="results-title">
        {properties.length} Properties Found
      </h2>
      
      {properties.length === 0 ? (
        <div className="no-results">
          <p>No properties match your search criteria.</p>
          <p>Try adjusting your filters.</p>
        </div>
      ) : (
        <div className="property-grid">
          {properties.map((property) => (
            <PropertyCard
              key={property.id}
              property={property}
              onView={() => onViewProperty(property)}
              onFavorite={() => onAddToFavorites(property)}
              isFavorite={favorites.some(f => f.id === property.id)}
              onDragStart={(e) => onDragStart(e, property, 'results')}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default PropertyList;