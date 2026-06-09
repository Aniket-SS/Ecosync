import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import LogActivity from '../pages/LogActivity';
import { ACTIVITIES } from '../data/constants';

describe('LogActivity Component Coverage', () => {
  const mockSetLogs = vi.fn();
  const mockSetDailyTarget = vi.fn();

  const mockLogs = [
    {
      id: 12345,
      activityId: ACTIVITIES[0].id,
      category: ACTIVITIES[0].category,
      quantity: 10,
      unit: ACTIVITIES[0].unit,
      co2e: 10 * ACTIVITIES[0].factor,
      date: '2023-10-01'
    }
  ];

  const defaultProps = {
    logs: mockLogs,
    setLogs: mockSetLogs,
    dailyTarget: 4,
    setDailyTarget: mockSetDailyTarget,
    isDark: true
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders the component and history correctly', () => {
    render(<LogActivity {...defaultProps} />);
    expect(screen.getByText('Log an activity')).toBeInTheDocument();
    // Verify our mock log rendered
    expect(screen.getByText(/1 logged activities/i)).toBeInTheDocument();
  });

  it('submits a new activity and updates logs state', () => {
    render(<LogActivity {...defaultProps} />);
    
    const amountInput = screen.getByLabelText(/Amount/i);
    const submitBtn = screen.getByRole('button', { name: /Add to log/i });
    
    // Simulate user typing a valid amount
    fireEvent.change(amountInput, { target: { value: '15' } });
    fireEvent.click(submitBtn);
    
    // Should pass an array with the new item + the old mock item
    expect(mockSetLogs).toHaveBeenCalledTimes(1);
    expect(mockSetLogs).toHaveBeenCalledWith(
      expect.arrayContaining([
        expect.objectContaining({
          quantity: 15,
          activityId: ACTIVITIES[0].id
        })
      ])
    );
  });

  it('prevents form submission if amount is invalid', () => {
    render(<LogActivity {...defaultProps} />);
    
    const amountInput = screen.getByLabelText(/Amount/i);
    const submitBtn = screen.getByRole('button', { name: /Add to log/i });
    
    // Simulate empty string
    fireEvent.change(amountInput, { target: { value: '' } });
    fireEvent.click(submitBtn);
    
    // Simulate negative string
    fireEvent.change(amountInput, { target: { value: '-5' } });
    fireEvent.click(submitBtn);
    
    expect(mockSetLogs).not.toHaveBeenCalled();
  });

  it('clears all logs when Clear All is clicked', () => {
    render(<LogActivity {...defaultProps} />);
    
    const clearAllBtn = screen.getByRole('button', { name: /Clear all logs/i });
    fireEvent.click(clearAllBtn);
    
    // Expect it to pass an empty array to setLogs
    expect(mockSetLogs).toHaveBeenCalledWith([]);
  });

  it('deletes an individual log when the trash icon is clicked', () => {
    render(<LogActivity {...defaultProps} />);
    
    // Find the specific delete button for the mock activity
    const deleteBtn = screen.getByLabelText(new RegExp(`Delete ${ACTIVITIES[0].label} log`, 'i'));
    fireEvent.click(deleteBtn);
    
    // Since our mock array only had 1 item, filtering it out should result in an empty array
    expect(mockSetLogs).toHaveBeenCalledWith([]);
  });

  it('saves a new daily target correctly', () => {
    render(<LogActivity {...defaultProps} />);
    
    const targetInput = screen.getByLabelText(/Target \(kg CO2e per day\)/i);
    const saveTargetBtn = screen.getByRole('button', { name: /Save goal/i });
    
    fireEvent.change(targetInput, { target: { value: '5.5' } });
    fireEvent.click(saveTargetBtn);
    
    expect(mockSetDailyTarget).toHaveBeenCalledWith(5.5);
  });

  it('clears the daily target back to default (4)', () => {
    render(<LogActivity {...defaultProps} />);
    
    const clearTargetBtn = screen.getByRole('button', { name: /^Clear$/i });
    fireEvent.click(clearTargetBtn);
    
    expect(mockSetDailyTarget).toHaveBeenCalledWith(4);
  });
});