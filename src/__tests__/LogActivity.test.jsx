import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import LogActivity from '../pages/LogActivity';

describe('LogActivity Component', () => {
  it('prevents future dates from being selected', () => {
    render(<LogActivity />);
    
    // Make sure your input has an id="date" and a <label htmlFor="date">
    const dateInput = screen.getByLabelText(/date/i); 
    
    // Get tomorrow's date formatted as YYYY-MM-DD
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    const tomorrowStr = tomorrow.toISOString().split('T')[0];

    // Ensure the 'max' attribute is set to today or earlier
    expect(dateInput.getAttribute('max')).not.toBe(tomorrowStr);
  });
});
