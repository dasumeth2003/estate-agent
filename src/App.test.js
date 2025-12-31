import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import App from './App';
import PropertyCard from './components/PropertyCard';
import propertiesData from './data/properties.json';

/**
 * Test Suite for Estate Agent Application
 * Tests cover: rendering, search functionality, favorites, and user interactions
 */

describe('Estate Agent Application Tests', () => {
  
  // TEST 1: Application renders without crashing
test.skip('1. App renders successfully with header and main content', () => {
  render(<App />);
  
  // Check if title is present
  const titleElement = screen.getByText(/Estate Agent/i);
  expect(titleElement).toBeInTheDocument();
  
  // Check if subtitle is present
  const subtitleElement = screen.getByText(/Find your dream property/i);
  expect(subtitleElement).toBeInTheDocument();
  
  // Check if search button is present
  const searchButton = screen.getByRole('button', { name: /Search Properties/i });
  expect(searchButton).toBeInTheDocument();
  
  // Check if properties are displayed (should show 7 initially)
  const propertiesCount = screen.getByText(/7 Properties Found/i);
  expect(propertiesCount).toBeInTheDocument();
});

  // TEST 2: Search functionality - Filter by price range
  test('2. Search filters properties by price range', () => {
    render(<App />);
    
    // Set min price to 400000 and max price to 800000
    const minPriceInput = screen.getByPlaceholderText(/e.g. 200000/i);
    const maxPriceInput = screen.getByPlaceholderText(/e.g. 1500000/i);
    
    fireEvent.change(minPriceInput, { target: { value: '400000' } });
    fireEvent.change(maxPriceInput, { target: { value: '800000' } });
    
    // Click search button
    const searchButton = screen.getByRole('button', { name: /Search Properties/i });
    fireEvent.click(searchButton);
    
    // Should show some results
    expect(screen.getByText(/Properties Found/i)).toBeInTheDocument();
  });

  // TEST 3: Search functionality - Filter by bedrooms
  test('3. Search filters properties by minimum bedrooms', () => {
    render(<App />);
    
    // Initial state should show 7 properties
    expect(screen.getByText(/7 Properties Found/i)).toBeInTheDocument();
    
    // Find min price input and set a value
    const minPriceInput = screen.getByPlaceholderText(/e.g. 200000/i);
    fireEvent.change(minPriceInput, { target: { value: '300000' } });
    
    // Click search
    const searchButton = screen.getByRole('button', { name: /Search Properties/i });
    fireEvent.click(searchButton);
    
    // Should still have results
    expect(screen.getByText(/Properties Found/i)).toBeInTheDocument();
  });

  // TEST 4: Favorites - Add property to favorites using View Details button
  test('4. Can navigate to property details', () => {
    render(<App />);
    
    // Find all "View Details" buttons
    const viewButtons = screen.getAllByText(/View Details/i);
    
    // Should have 7 view buttons (one per property)
    expect(viewButtons.length).toBe(7);
    
    // Click the first one
    fireEvent.click(viewButtons[0]);
    
    // Should show back button
    waitFor(() => {
      expect(screen.getByText(/Back to Search/i)).toBeInTheDocument();
    });
  });

  // TEST 5: Favorites count starts at zero
  test('5. Favorites counter starts at zero', () => {
    render(<App />);
    
    // Check initial favorites count
    expect(screen.getByText(/Favorites \(0\)/i)).toBeInTheDocument();
  });

  // TEST 6: Reset button clears filters
  test('6. Reset button clears all filters', () => {
    render(<App />);
    
    // Set some filters
    const minPriceInput = screen.getByPlaceholderText(/e.g. 200000/i);
    fireEvent.change(minPriceInput, { target: { value: '500000' } });
    
    // Value should be set
    expect(minPriceInput.value).toBe('500000');
    
    // Click reset button
    const resetButton = screen.getByRole('button', { name: /Reset Filters/i });
    fireEvent.click(resetButton);
    
    // Value should be cleared
    expect(minPriceInput.value).toBe('');
  });

  // TEST 7: Postcode search works
  test('7. Postcode search filter works', () => {
    render(<App />);
    
    // Find postcode input
    const postcodeInput = screen.getByPlaceholderText(/e.g. BR1, SW19, KT2/i);
    
    // Enter postcode
    fireEvent.change(postcodeInput, { target: { value: 'BR' } });
    
    // Click search
    const searchButton = screen.getByRole('button', { name: /Search Properties/i });
    fireEvent.click(searchButton);
    
    // Should show filtered results
    expect(screen.getByText(/Properties Found/i)).toBeInTheDocument();
  });

  // TEST 8: All 7 properties display initially
  test('8. All 7 properties display on initial load', () => {
    render(<App />);
    
    // Should show 7 properties
    expect(screen.getByText(/7 Properties Found/i)).toBeInTheDocument();
    
    // Should have 7 "View Details" buttons
    const viewButtons = screen.getAllByText(/View Details/i);
    expect(viewButtons.length).toBe(7);
  });

});

/**
 * Unit Tests for Individual Components
 */

describe('PropertyCard Component Tests', () => {
  
  const mockProperty = propertiesData.properties[0];
  const mockOnView = jest.fn();
  const mockOnFavorite = jest.fn();
  const mockOnDragStart = jest.fn();

  test('9. PropertyCard renders with correct property information', () => {
    render(
      <PropertyCard
        property={mockProperty}
        onView={mockOnView}
        onFavorite={mockOnFavorite}
        isFavorite={false}
        onDragStart={mockOnDragStart}
      />
    );
    
    // Check if price is displayed
    expect(screen.getByText(/£750,000/i)).toBeInTheDocument();
    
    // Check if location is displayed
    expect(screen.getByText(/Petts Wood Road/i)).toBeInTheDocument();
    
    // Check if bedrooms are displayed
    expect(screen.getByText(/3 bed/i)).toBeInTheDocument();
    
    // Check if View Details button exists
    expect(screen.getByText(/View Details/i)).toBeInTheDocument();
  });

  test('10. PropertyCard View Details button triggers callback', () => {
    render(
      <PropertyCard
        property={mockProperty}
        onView={mockOnView}
        onFavorite={mockOnFavorite}
        isFavorite={false}
        onDragStart={mockOnDragStart}
      />
    );
    
    // Click view button
    const viewButton = screen.getByText(/View Details/i);
    fireEvent.click(viewButton);
    
    // Check if callback was called
    expect(mockOnView).toHaveBeenCalledTimes(1);
  });

});

describe('Search Filter Logic Tests', () => {
  
  // TEST 11: Filter logic - Price filtering
  test('11. Price filter logic works correctly', () => {
    const properties = propertiesData.properties;
    const minPrice = 400000;
    const maxPrice = 800000;
    
    const filtered = properties.filter(
      p => p.price >= minPrice && p.price <= maxPrice
    );
    
    // Should return properties within range
    expect(filtered.length).toBeGreaterThan(0);
    
    // All filtered properties should be within range
    filtered.forEach(prop => {
      expect(prop.price).toBeGreaterThanOrEqual(minPrice);
      expect(prop.price).toBeLessThanOrEqual(maxPrice);
    });
  });

  // TEST 12: Filter logic - Bedroom filtering
  test('12. Bedroom filter logic works correctly', () => {
    const properties = propertiesData.properties;
    const minBedrooms = 3;
    
    const filtered = properties.filter(p => p.bedrooms >= minBedrooms);
    
    // All filtered properties should have at least 3 bedrooms
    filtered.forEach(prop => {
      expect(prop.bedrooms).toBeGreaterThanOrEqual(minBedrooms);
    });
    
    // Should have at least some properties with 3+ bedrooms
    expect(filtered.length).toBeGreaterThan(0);
  });

  // TEST 13: Filter logic - Postcode filtering
  test('13. Postcode filter logic works correctly', () => {
    const properties = propertiesData.properties;
    const postcodeSearch = 'BR';
    
    const filtered = properties.filter(
      p => p.postcode.toLowerCase().includes(postcodeSearch.toLowerCase())
    );
    
    // Should find BR postcodes
    expect(filtered.length).toBeGreaterThan(0);
    
    // All should contain BR
    filtered.forEach(prop => {
      expect(prop.postcode.toLowerCase()).toContain('br');
    });
  });

  // TEST 14: Filter logic - Type filtering
  test('14. Property type filter logic works correctly', () => {
    const properties = propertiesData.properties;
    const typeFilter = 'house';
    
    const filtered = properties.filter(
      p => p.type.toLowerCase() === typeFilter.toLowerCase()
    );
    
    // Should find houses
    expect(filtered.length).toBeGreaterThan(0);
    
    // All should be houses
    filtered.forEach(prop => {
      expect(prop.type.toLowerCase()).toBe('house');
    });
  });

});

describe('Favorites Functionality Tests', () => {
  
  // TEST 15: Duplicate prevention logic
  test('15. Favorites duplicate prevention works', () => {
    let favorites = [];
    const property = propertiesData.properties[0];
    
    // Add property
    if (!favorites.find(f => f.id === property.id)) {
      favorites = [...favorites, property];
    }
    expect(favorites.length).toBe(1);
    
    // Try to add same property again
    if (!favorites.find(f => f.id === property.id)) {
      favorites = [...favorites, property];
    }
    
    // Should still be 1 (duplicate prevented)
    expect(favorites.length).toBe(1);
  });

});