import React from 'react';
import Select from 'react-select';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';


/* All form elements enhanced with React widgets for better UX */
function SearchForm({ filters, setFilters, onSearch }) {
  
  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch();
  };

  // Update filter state
  const updateFilter = (field, value) => {
    setFilters({
      ...filters,
      [field]: value
    });
  };

  // Options for property type select
  const propertyTypeOptions = [
    { value: 'any', label: 'Any Type' },
    { value: 'house', label: 'House' },
    { value: 'flat', label: 'Flat' }
  ];

  // Options for bedroom select
  const bedroomOptions = [
    { value: '', label: 'Any' },
    { value: '1', label: '1' },
    { value: '2', label: '2' },
    { value: '3', label: '3' },
    { value: '4', label: '4' },
    { value: '5', label: '5+' }
  ];

  // Custom styles for react-select
  const selectStyles = {
    control: (base) => ({
      ...base,
      borderColor: '#e5e7eb',
      boxShadow: 'none',
      '&:hover': {
        borderColor: '#667eea'
      }
    })
  };

  // Convert filter value to date object
  const getDateValue = (dateString) => {
    return dateString ? new Date(dateString) : null;
  };

  // Convert date object to string
  const setDateValue = (date) => {
    return date ? date.toISOString().split('T')[0] : '';
  };

  return (
    <form onSubmit={handleSubmit} className="search-form">
      <h2 className="search-title">🔍 Search Properties</h2>
      
      <div className="search-grid">
        
        {/* Property Type - React Select Widget */}
        <div className="form-group">
          <label htmlFor="type">Property Type</label>
          <Select
            id="type"
            value={propertyTypeOptions.find(opt => opt.value === filters.type)}
            onChange={(option) => updateFilter('type', option.value)}
            options={propertyTypeOptions}
            styles={selectStyles}
            className="react-select-container"
            classNamePrefix="react-select"
          />
        </div>

        {/* Min Price with Number Input */}
        <div className="form-group">
          <label htmlFor="minPrice">Min Price (£)</label>
          <input
            id="minPrice"
            type="number"
            value={filters.minPrice}
            onChange={(e) => updateFilter('minPrice', e.target.value)}
            placeholder="e.g. 200000"
            className="form-input"
            min="0"
            step="10000"
          />
        </div>

        {/* Max Price with Number Input */}
        <div className="form-group">
          <label htmlFor="maxPrice">Max Price (£)</label>
          <input
            id="maxPrice"
            type="number"
            value={filters.maxPrice}
            onChange={(e) => updateFilter('maxPrice', e.target.value)}
            placeholder="e.g. 1500000"
            className="form-input"
            min="0"
            step="10000"
          />
        </div>

        {/* Min Bedrooms - React Select Widget */}
        <div className="form-group">
          <label htmlFor="minBedrooms">Min Bedrooms</label>
          <Select
            id="minBedrooms"
            value={bedroomOptions.find(opt => opt.value === filters.minBedrooms)}
            onChange={(option) => updateFilter('minBedrooms', option.value)}
            options={bedroomOptions}
            styles={selectStyles}
            className="react-select-container"
            classNamePrefix="react-select"
            placeholder="Select minimum"
          />
        </div>

        {/* Max Bedrooms - React Select Widget */}
        <div className="form-group">
          <label htmlFor="maxBedrooms">Max Bedrooms</label>
          <Select
            id="maxBedrooms"
            value={bedroomOptions.find(opt => opt.value === filters.maxBedrooms)}
            onChange={(option) => updateFilter('maxBedrooms', option.value)}
            options={bedroomOptions}
            styles={selectStyles}
            className="react-select-container"
            classNamePrefix="react-select"
            placeholder="Select maximum"
          />
        </div>

        {/* Postcode Area - Enhanced Input */}
        <div className="form-group">
          <label htmlFor="postcode">Postcode Area</label>
          <input
            id="postcode"
            type="text"
            value={filters.postcode}
            onChange={(e) => updateFilter('postcode', e.target.value.toUpperCase())}
            placeholder="e.g. BR1, SW19, KT2"
            className="form-input"
            maxLength="6"
          />
          <small className="form-hint">Enter first part of postcode (e.g., BR5, SW19)</small>
        </div>

        {/* Date Added After - React DatePicker Widget */}
        <div className="form-group">
          <label htmlFor="afterDate">Added After Date</label>
          <DatePicker
            id="afterDate"
            selected={getDateValue(filters.afterDate)}
            onChange={(date) => updateFilter('afterDate', setDateValue(date))}
            dateFormat="dd/MM/yyyy"
            placeholderText="Select start date"
            className="form-input date-picker"
            isClearable
            showMonthDropdown
            showYearDropdown
            dropdownMode="select"
          />
        </div>

        {/* Date Added Before - React DatePicker Widget */}
        <div className="form-group">
          <label htmlFor="beforeDate">Added Before Date (Optional)</label>
          <DatePicker
            id="beforeDate"
            selected={getDateValue(filters.beforeDate)}
            onChange={(date) => updateFilter('beforeDate', setDateValue(date))}
            dateFormat="dd/MM/yyyy"
            placeholderText="Select end date"
            className="form-input date-picker"
            isClearable
            showMonthDropdown
            showYearDropdown
            dropdownMode="select"
            minDate={getDateValue(filters.afterDate)}
          />
          <small className="form-hint">Leave empty to search from "After Date" onwards</small>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="form-actions">
        <button type="submit" className="search-button">
          Search Properties
        </button>
        
        <button
          type="button"
          className="reset-button"
          onClick={() => setFilters({
            type: 'any',
            minPrice: '',
            maxPrice: '',
            minBedrooms: '',
            maxBedrooms: '',
            postcode: '',
            afterDate: '',
            beforeDate: ''
          })}
        >
          🔄 Reset Filters
        </button>
      </div>

      {/* Active Filters Display */}
      {(filters.type !== 'any' || filters.minPrice || filters.maxPrice || 
        filters.minBedrooms || filters.maxBedrooms || filters.postcode || 
        filters.afterDate || filters.beforeDate) && (
        <div className="active-filters">
          <h4>Active Filters:</h4>
          <div className="filter-tags">
            {filters.type !== 'any' && (
              <span className="filter-tag">Type: {filters.type}</span>
            )}
            {filters.minPrice && (
              <span className="filter-tag">Min: £{parseInt(filters.minPrice).toLocaleString()}</span>
            )}
            {filters.maxPrice && (
              <span className="filter-tag">Max: £{parseInt(filters.maxPrice).toLocaleString()}</span>
            )}
            {filters.minBedrooms && (
              <span className="filter-tag">Min Beds: {filters.minBedrooms}</span>
            )}
            {filters.maxBedrooms && (
              <span className="filter-tag">Max Beds: {filters.maxBedrooms}</span>
            )}
            {filters.postcode && (
              <span className="filter-tag">Postcode: {filters.postcode}</span>
            )}
            {filters.afterDate && (
              <span className="filter-tag">After: {new Date(filters.afterDate).toLocaleDateString()}</span>
            )}
            {filters.beforeDate && (
              <span className="filter-tag">Before: {new Date(filters.beforeDate).toLocaleDateString()}</span>
            )}
          </div>
        </div>
      )}
    </form>
  );
}

export default SearchForm;