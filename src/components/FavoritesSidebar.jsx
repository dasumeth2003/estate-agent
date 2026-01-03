import React from 'react';

// FavoritesSidebar Component - Manages favorite properties
function FavoritesSidebar({ 
  favorites, 
  onRemove, 
  onClear, 
  onView, 
  onDragOver, 
  onDrop,
  onDragStart 
}) {

  const handleImageError = (e) => {
    (e.target.src = `${process.env.PUBLIC_URL}/images/placeholder.jpg`)
  };

  return (
    <div className="favorites-sidebar">
      {/* Header with Clear Button */}
      <div className="favorites-header">
        <h3 className="favorites-title">
          ❤️ Favorites ({favorites.length})
        </h3>
        {favorites.length > 0 && (
          <button onClick={onClear} className="clear-button">
            Clear All
          </button>
        )}
      </div>

      {/* Drop Zone */}
      <div
        onDragOver={onDragOver}
        onDrop={onDrop}
        className="favorites-dropzone"
      >
        {favorites.length === 0 ? (
          <p className="favorites-empty">
            Drag properties here or click ❤️ to add favorites
          </p>
        ) : (
          <div className="favorites-list">
            {favorites.map((property) => (
              <div
                key={property.id}
                draggable
                onDragStart={(e) => onDragStart(e, property, 'favorites')}
                className="favorite-item"
              >
                <img
                  src={property.images[0]}
                  alt={property.location}
                  className="favorite-image"
                  onError={handleImageError}
                />
                <div className="favorite-info">
                  <p className="favorite-price">
                    £{property.price.toLocaleString()}
                  </p>
                  <p className="favorite-location">
                    {property.location.substring(0, 30)}...
                  </p>
                  <div className="favorite-actions">
                    <button
                      onClick={() => onView(property)}
                      className="favorite-view"
                    >
                      View
                    </button>
                    <button
                      onClick={() => onRemove(property.id)}
                      className="favorite-remove"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default FavoritesSidebar;