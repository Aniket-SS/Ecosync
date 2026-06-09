import { describe, it, expect } from 'vitest';
import { ACTIVITIES, BENCHMARKS } from '../data/constants';

describe('Carbon Constants Data Integrity', () => {
  it('has a valid global average daily benchmark', () => {
    expect(BENCHMARKS.GLOBAL_AVG_DAILY).toBeGreaterThan(0);
    expect(typeof BENCHMARKS.GLOBAL_AVG_DAILY).toBe('number');
  });

  it('ensures all activities have required properties and valid factors', () => {
    ACTIVITIES.forEach(activity => {
      expect(activity).toHaveProperty('id');
      expect(activity).toHaveProperty('label');
      expect(activity).toHaveProperty('category');
      
      // Crucial: mathematically sound factors
      expect(activity).toHaveProperty('factor');
      expect(typeof activity.factor).toBe('number');
      expect(activity.factor).toBeGreaterThan(0); 
      
      expect(activity).toHaveProperty('unit');
    });
  });

  it('contains expected categories', () => {
    const categories = new Set(ACTIVITIES.map(a => a.category));
    expect(categories.has('Transport')).toBe(true);
    expect(categories.has('Home energy')).toBe(true);
    expect(categories.has('Diet')).toBe(true);
    expect(categories.has('Shopping')).toBe(true);
  });

  it('contains strictly unique IDs for React key rendering', () => {
    const ids = ACTIVITIES.map(a => a.id);
    const uniqueIds = new Set(ids);
    expect(uniqueIds.size).toBe(ids.length);
  });
});