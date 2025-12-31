import React, { useState, useEffect } from 'react';
import SearchForm from './components/searchForm';
import PropertyList from './components/PropertyList';
import PropertyDetails from './components/PropertyDetails';
import FavoritesSidebar from './components/FavoritesSidebar';
import propertiesData from './data/properties.json';
import './App.css';

function App() {
  // State Management
  const [allProperties] = useState(propertiesData.properties);
  const [filteredProperties, setFilteredProperties] = useState(propertiesData.properties);
  const [favorites, setFavorites] = useState([]);
  const [selectedProperty, setSelectedProperty] = useState(null);
  const [showDetails, setShowDetails] = useState(false);

  // Search filter state
  const [filters, setFilters] = useState({
    type: 'any',
    minPrice: '',
    maxPrice: '',
    minBedrooms: '',
    maxBedrooms: '',
    postcode: '',
    afterDate: '',
    beforeDate: ''
  });

  /**
   * Convert month name to number for date comparison
   */
  const getMonthNumber = (monthName) => {
    const months = {
      'January': 0, 'February': 1, 'March': 2, 'April': 3,
      'May': 4, 'June': 5, 'July': 6, 'August': 7,
      'September': 8, 'October': 9, 'November': 10, 'December': 11
    };
    return months[monthName] || 0;
  };

  /**
   * Search Handler - Filters properties based on ALL search criteria
   */
  const handleSearch = () => {
    let results = [...allProperties];

    // Filter by property type
    if (filters.type !== 'any') {
      results = results.filter(
        p => p.type.toLowerCase() === filters.type.toLowerCase()
      );
    }

    // Filter by minimum price
    if (filters.minPrice && filters.minPrice !== '') {
      results = results.filter(
        p => p.price >= parseInt(filters.minPrice)
      );
    }

    // Filter by maximum price
    if (filters.maxPrice && filters.maxPrice !== '') {
      results = results.filter(
        p => p.price <= parseInt(filters.maxPrice)
      );
    }

    // Filter by minimum bedrooms
    if (filters.minBedrooms && filters.minBedrooms !== '') {
      results = results.filter(
        p => p.bedrooms >= parseInt(filters.minBedrooms)
      );
    }

    // Filter by maximum bedrooms
    if (filters.maxBedrooms && filters.maxBedrooms !== '') {
      results = results.filter(
        p => p.bedrooms <= parseInt(filters.maxBedrooms)
      );
    }

    // Filter by postcode area (first part of postcode)
    if (filters.postcode && filters.postcode !== '') {
      results = results.filter(
        p => p.postcode.toLowerCase().startsWith(filters.postcode.toLowerCase())
      );
    }

    // Filter by date added (after date)
    if (filters.afterDate && filters.afterDate !== '') {
      const afterDate = new Date(filters.afterDate);
      results = results.filter(p => {
        const propertyDate = new Date(
          p.added.year,
          getMonthNumber(p.added.month),
          p.added.day
        );
        return propertyDate >= afterDate;
      });
    }

    // Filter by date added (before date) - for date range
    if (filters.beforeDate && filters.beforeDate !== '') {
      const beforeDate = new Date(filters.beforeDate);
      results = results.filter(p => {
        const propertyDate = new Date(
          p.added.year,
          getMonthNumber(p.added.month),
          p.added.day
        );
        return propertyDate <= beforeDate;
      });
    }

    setFilteredProperties(results);
  };

  /* Add property to favorites (with duplicate prevention) */
  const handleAddToFavorites = (property) => {
    // Check if already in favorites
    if (!favorites.find(f => f.id === property.id)) {
      setFavorites([...favorites, property]);
    }
  };

  /* Remove property from favorites */
  const handleRemoveFavorite = (propertyId) => {
    setFavorites(favorites.filter(f => f.id !== propertyId));
  };

  /* Clear all favorites with confirmation */
  const handleClearFavorites = () => {
    if (window.confirm('Are you sure you want to clear all favorites?')) {
      setFavorites([]);
    }
  };

  /* View property details */
  const handleViewProperty = (property) => {
    setSelectedProperty(property);
    setShowDetails(true);
  };

  /* Close property details and go back to search */
  const handleBackToSearch = () => {
    setShowDetails(false);
    setSelectedProperty(null);
  };

  /*Toggle favorite status from details page*/
  const handleToggleFavoriteFromDetails = () => {
    if (selectedProperty) {
      if (favorites.find(f => f.id === selectedProperty.id)) {
        handleRemoveFavorite(selectedProperty.id);
      } else {
        handleAddToFavorites(selectedProperty);
      }
    }
  };

  /* Drag and Drop Handlers*/
  const handleDragStart = (e, property, source) => {
    e.dataTransfer.setData('property', JSON.stringify(property));
    e.dataTransfer.setData('source', source);
  };

  const handleDragOver = (e) => {
    e.preventDefault(); // Allow drop
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const property = JSON.parse(e.dataTransfer.getData('property'));
    const source = e.dataTransfer.getData('source');
    
    // Add to favorites if dragged from results
    if (source === 'results') {
      handleAddToFavorites(property);
    }
  };

  return (
    <div className="app">
      {/* Header */}
      <header className="app-header">
        <div className="header-content">
          <h1 className="app-title">🏡 Estate Agent</h1>
          <p className="app-subtitle">Find your dream property</p>
        </div>
      </header>

      {/* Main Content */}
      <main className="app-main">
        {!showDetails ? (
          <>
            {/* Search Page */}
            <div className="main-content">
              {/* Search Form */}
              <SearchForm
                filters={filters}
                setFilters={setFilters}
                onSearch={handleSearch}
              />

              {/* Property Results */}
              <PropertyList
                properties={filteredProperties}
                onViewProperty={handleViewProperty}
                onAddToFavorites={handleAddToFavorites}
                favorites={favorites}
                onDragStart={handleDragStart}
              />
            </div>

            {/* Favorites Sidebar */}
            <aside className="favorites-sidebar">
              <FavoritesSidebar
                favorites={favorites}
                onRemove={handleRemoveFavorite}
                onClear={handleClearFavorites}
                onView={handleViewProperty}
                onDragOver={handleDragOver}
                onDrop={handleDrop}
                onDragStart={handleDragStart}
              />
            </aside>
          </>
        ) : (
          // Property Details Page
          <div className="details-page">
            <PropertyDetails
              property={selectedProperty}
              onBack={handleBackToSearch}
              onFavorite={handleToggleFavoriteFromDetails}
              isFavorite={favorites.some(f => f.id === selectedProperty.id)}
            />
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="app-footer">
        <p>&copy; 2025 Estate Agent App. Dasuntha Samarasinghe</p>
      </footer>
    </div>
  );
}

export default App;