import React, { useState, useEffect, useContext } from "react";

import "./App.css";
import "rbx/index.css";
import "./assets/styles/views.css"
import "./assets/styles/calendar.css";

import add from "./assets/icons/add.png";

import { Button, PageLoader, Column } from "rbx";

import ListingList from "./components/Listing.js"
import DetailView from "./components/DetailView.js";
import FilterView from "./components/FilterView.js";
import ContactView from "./components/ContactView.js"

import { ListingContext, FilterContext } from "./components/Contexts.js";
const allListings = require('./listings.json')

const App = () => {

  const [currListing, updateCurrListing] = useState(null);
  const [listingList, updateList] = useState(allListings);
  
  const [currFilter, updateFilter] = useState({ minDistance: 0, maxDistance: 2147483646, minSize: 0, maxSize: 2147483646, minPrice: 0, maxPrice: 2147483646, minRating: 0, maxRating: 2147483646, filterParking: false, filterRamp: false, filterElevator: false, filterLock: false });
  
  const [contactViewOpen, toggleContactView] = useState(false);
  const [filterViewOpen, toggleFilterViewOpen] = useState(false);

  const pageNum = 1
  const listPerPage = 10

  useEffect(() => {
    function getListingsData() {
      console.log(currFilter)
      fetch('https://rocky-savannah-43190.herokuapp.com/get_listings', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ latitude: 42.055984, longitude: -87.675171, listingsPerPage: listPerPage, pageNumber: pageNum, ...currFilter })
      })
        .then(response => response.json())
        .then(response => {
          updateList(response.listings);
        });
    }
    getListingsData();
  });

  const updateAll = (newListing) => {
  	/*
        BACKEND: ADD CODE HERE TO SET UP PUSHING NEW LISTINGS TO REMOTE DB
    */
    updateList([newListing].concat(listingList))
  }
  
  if(listingList.length === 0) return (<PageLoader active={true} color="light"></PageLoader>)


  return (
    <ListingContext.Provider value={{ currListing, updateCurrListing, listingList, updateAll, contactViewOpen, toggleContactView }}>
      <div className="App" width="100%" height="100%" opacity="0.99">
        <ListingList />
        <DetailView />
        <ContactView />
        <FilterContext.Provider value={{ currFilter, updateFilter, filterViewOpen, toggleFilterViewOpen }}>
          <FilterView/>
          <BottomBar></BottomBar>
        </FilterContext.Provider>
      </div>
    </ListingContext.Provider>
  );
};

const BottomBar = () => {
  const { toggleFilterViewOpen } = useContext(FilterContext);

  return (
    <div style={{height: "4vh", width: "100%", border:"10px", backgroundColor:"grey", position: "fixed", top: "96vh"}}>
      <Column.Group size="one-half">
        <Button data-testid="filterButton" data-cy="filterButton" style={{width:"50%", top:"1vh"}} onClick={() => {
          toggleFilterViewOpen(true); setTimeout(function () { document.getElementById("filterView").classList.add("show") }, 0);
        }}>
          FILTER
        </Button>
        <Button style={{width:"50%", top:"1vh"}}>
          <img alt='some text' src={add} style={{width:"2.5vh"}}/>
        </Button>
      </Column.Group>
    </div>
  )
}

export default App;
