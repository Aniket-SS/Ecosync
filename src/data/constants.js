import { Car, Zap, Utensils, ShoppingBag } from 'lucide-react';

export const BENCHMARKS = {
  GLOBAL_AVG_DAILY: 10.96, 
};

export const ACTIVITIES = [
  { id: 'petrol_car', label: 'Petrol car', category: 'Transport', factor: 0.17, unit: 'km', icon: Car, color: 'bg-sky-500', desc: 'Average petrol car, per km driven.' },
  { id: 'ev', label: 'Electric car', category: 'Transport', factor: 0.05, unit: 'km', icon: Car, color: 'bg-sky-500', desc: 'Battery electric vehicle, per km.' },
  { id: 'bus', label: 'Bus', category: 'Transport', factor: 0.1, unit: 'km', icon: Car, color: 'bg-sky-500', desc: 'Average local bus, per km.' },
  { id: 'train', label: 'Train', category: 'Transport', factor: 0.035, unit: 'km', icon: Car, color: 'bg-sky-500', desc: 'National rail, per km.' },
  { id: 'flight', label: 'Short-haul flight', category: 'Transport', factor: 0.246, unit: 'km', icon: Car, color: 'bg-sky-500', desc: 'Short-haul flight, per km.' },
  { id: 'electricity', label: 'Electricity', category: 'Home energy', factor: 0.4, unit: 'kWh', icon: Zap, color: 'bg-amber-500', desc: 'Grid-average electricity per kWh.' },
  { id: 'gas', label: 'Natural gas', category: 'Home energy', factor: 0.18, unit: 'kWh', icon: Zap, color: 'bg-amber-500', desc: 'Average natural gas per kWh.' },
  { id: 'beef_lamb', label: 'Beef / lamb meal', category: 'Diet', factor: 6.6, unit: 'meals', icon: Utensils, color: 'bg-emerald-500', desc: 'Ruminant meat per serving.' },
  { id: 'poultry_pork', label: 'Poultry / pork meal', category: 'Diet', factor: 1.8, unit: 'meals', icon: Utensils, color: 'bg-emerald-500', desc: 'Poultry or pork per serving.' },
  { id: 'vegetarian', label: 'Vegetarian meal', category: 'Diet', factor: 0.9, unit: 'meals', icon: Utensils, color: 'bg-emerald-500', desc: 'Vegetarian meal per serving.' },
  { id: 'vegan', label: 'Vegan meal', category: 'Diet', factor: 0.7, unit: 'meals', icon: Utensils, color: 'bg-emerald-500', desc: 'Plant-based meal per serving.' },
  { id: 'clothing', label: 'New clothing item', category: 'Shopping', factor: 15, unit: 'items', icon: ShoppingBag, color: 'bg-purple-500', desc: 'Average new garment.' },
  { id: 'electronics', label: 'Electronics spend', category: 'Shopping', factor: 0.5, unit: 'USD', icon: ShoppingBag, color: 'bg-purple-500', desc: 'Spend-based estimate per $1.' }
];