import React, { useContext } from "react";
import { render } from '@testing-library/react';
import ListingList from "./components/Listing.js"
const listingObjects = require('./listings.json')

it ('renders the items and displays the price per night', () => {
  const {getByTestId} = render(<ListingList />)
  const testThing = getByTestId('a-listing')
  expect(testThing).toBeInTheDocument()
});


