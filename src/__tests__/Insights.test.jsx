import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import Insights from '../pages/Insights';

// Mock the global fetch API to prevent actual network requests during testing
global.fetch = vi.fn();

describe('Insights Component Coverage', () => {
  const mockLogs = [
    { id: 1, category: 'Transport', co2e: 15.5, quantity: 20, unit: 'miles', label: 'Driving' },
    { id: 2, category: 'Diet', co2e: 4.2, quantity: 1, unit: 'meal', label: 'Beef Burger' }
  ];

  beforeEach(() => {
    vi.clearAllMocks();
    // Inject a fake API key into the Vite test environment
    vi.stubEnv('VITE_GEMINI_API_KEY', 'fake-test-api-key-123');
  });

  afterEach(() => {
    vi.unstubAllEnvs();
  });

  it('renders default state correctly', () => {
    render(<Insights logs={mockLogs} dailyAverage={5} dailyTarget={4} />);
    expect(screen.getByText('Data Insights')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Generate Insight/i })).toBeInTheDocument();
  });

  it('blocks API call and shows warning if logs are empty', async () => {
    render(<Insights logs={[]} />);
    
    const btn = screen.getByRole('button', { name: /Generate Insight/i });
    fireEvent.click(btn);

    // Assert that the early return fired and the API was never called
    expect(global.fetch).not.toHaveBeenCalled();
    expect(screen.getByText(/Start logging your activities first/i)).toBeInTheDocument();
  });

  it('successfully fetches, sanitizes, and renders AI insight', async () => {
    // Mock a successful 200 OK response from the Gemini API
    const mockApiResponse = {
      candidates: [
        { content: { parts: [{ text: '<strong>Great job reducing emissions!</strong>' }] } }
      ]
    };
    
    global.fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => mockApiResponse
    });

    render(<Insights logs={mockLogs} dailyAverage={5} dailyTarget={4} />);
    
    const btn = screen.getByRole('button', { name: /Generate Insight/i });
    fireEvent.click(btn);

    // Verify loading state appears
    expect(screen.getByText(/Analyzing local database.../i)).toBeInTheDocument();
    expect(btn).toBeDisabled();

    // Wait for the async try block to resolve
    await waitFor(() => {
      expect(screen.getByText('AI Summary')).toBeInTheDocument();
    });

    // Assert fetch was called with the right URL and our fake key
    expect(global.fetch).toHaveBeenCalledTimes(1);
    expect(global.fetch).toHaveBeenCalledWith(
      expect.stringContaining('fake-test-api-key-123'),
      expect.any(Object)
    );

    // Assert that DOMPurify sanitized and rendered the HTML safely
    expect(screen.getByText('Great job reducing emissions!')).toBeInTheDocument();
  });

  it('gracefully handles missing API key', async () => {
    // Remove the API key to trigger the specific throw Error branch
    vi.stubEnv('VITE_GEMINI_API_KEY', '');
    
    render(<Insights logs={mockLogs} />);
    
    const btn = screen.getByRole('button', { name: /Generate Insight/i });
    fireEvent.click(btn);

    // Wait for the catch block to execute
    await waitFor(() => {
      expect(screen.getByText(/The AI service is currently unavailable or missing a valid API key/i)).toBeInTheDocument();
    });
    
    // API should not have been called
    expect(global.fetch).not.toHaveBeenCalled();
  });

  it('gracefully handles a 500 network error from Gemini API', async () => {
    // Mock a failed server response
    global.fetch.mockResolvedValueOnce({
      ok: false,
      status: 500
    });

    render(<Insights logs={mockLogs} />);
    
    const btn = screen.getByRole('button', { name: /Generate Insight/i });
    fireEvent.click(btn);

    // Wait for the catch block to catch the thrown response.ok error
    await waitFor(() => {
      expect(screen.getByText(/The AI service is currently unavailable/i)).toBeInTheDocument();
    });
  });
});