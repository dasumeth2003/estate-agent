import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import App from './App';

/**
 * Test Suite for Estate Agent Application
 * Tests critical functionality including rendering, search, and favourites
 */

describe('Estate Agent Application Tests', () => {
  
  /**
   * Test 1: Application renders without crashing
   * Verifies the app component mounts successfully
   */
  test('renders the application without crashing', () => {
    render(<App />);
    const headerElement = screen.getByText(/Elite Estates/i);
    expect(headerElement).toBeInTheDocument();
  });

  /**
   * Test 2: Search form is displayed
   * Verifies all search form elements are present
   */
  test('displays search form with all required fields', () => {
    render(<App />);
    
    // Check for search button
    const searchButton = screen.getByText(/Search Properties/i);
    expect(searchButton).toBeInTheDocument();
    
    // Check for form labels
    expect(screen.getByText(/Property Type/i)).toBeInTheDocument();
    expect(screen.getByText(/Min Price/i)).toBeInTheDocument();
    expect(screen.getByText(/Max Price/i)).toBeInTheDocument();
    expect(screen.getByText(/Min Bedrooms/i)).toBeInTheDocument();
  });

  /**
   * Test 3: Search functionality displays results
   * Verifies that clicking search button shows property results
   */
  test('displays property results after search', async () => {
    render(<App />);
    
    // Click search button
    const searchButton = screen.getByText(/Search Properties/i);
    fireEvent.click(searchButton);
    
    // Wait for results to appear
    await waitFor(() => {
      const resultsHeading = screen.getByText(/Properties Found/i);
      expect(resultsHeading).toBeInTheDocument();
    });
  });

  /**
   * Test 4: Favourites sidebar is present
   * Verifies the favourites component renders
   */
  test('renders favourites sidebar', () => {
    render(<App />);
    
    const favouritesTitle = screen.getByText(/Saved Properties/i);
    expect(favouritesTitle).toBeInTheDocument();
  });

  /**
   * Test 5: Price input accepts numeric values
   * Verifies form validation for price inputs
   */
  test('price inputs accept numeric values', () => {
    render(<App />);
    
    const minPriceInput = screen.getByLabelText(/Min Price/i);
    
    // Type a value
    fireEvent.change(minPriceInput, { target: { value: '250000' } });
    
    // Verify value is set
    expect(minPriceInput.value).toBe('250000');
  });

  /**
   * Test 6: Application footer is rendered
   * Verifies footer component is present
   */
  test('renders application footer', () => {
    render(<App />);
    
    const footerText = screen.getByText(/Elite Estates. All rights reserved/i);
    expect(footerText).toBeInTheDocument();
  });

});