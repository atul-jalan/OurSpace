import { render, fireEvent } from '@testing-library/react';
import React from 'react';
import App from './App';

test('useless test', () => {
  expect(true).toBe(true)
});

it ('pressing the buttton opens the new screen', () => {
  const {getByTestId} = render(<App />)
  const testThing = getByTestId('filterButton')
  fireEvent.click(testThing)
  const otherThing = getByTestId('filterView')
  expect(otherThing).toBeInTheDocument();
})