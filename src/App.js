import React, { useState, useContext } from "react";
import "./App.css";
import "rbx/index.css";

import parking from "./assets/local_parking-24px.svg";
import elevator from "./assets/elevator.svg";
// import ramp from "./assets/ramp.svg";

import { Card, Image, Column, Button, Media, Title, Modal, Delete, Content } from "rbx";

class Location {
  constructor(street, city, state, country, zip, geodata) {
    this.street = street;
    this.city = city;
    this.state = state;
    this.country = country;
    this.zip = zip;
    this.geodata = geodata;
  }
}

class Geodata {
  constructor(type, coordinates) {
    this.type = type;
    this.coordinates = coordinates;
  }
}

class Coordinates {
  constructor(latitude, longitude) {
    this.latitide = latitude;
    this.longitude = longitude;
  }
}

class Size {
  constructor(length, width, height) {
    this.length = length;
    this.width = width;
    this.height = height;
  }
}

class Attributes {
  constructor(hasLock, hasElevator, hasRamp) {
    this.hasLock = hasLock;
    this.hasElevator = hasElevator;
    this.hasRamp = hasRamp;
  }
}

class Listing {

  constructor(nameString, location, size, time, attributes, image) {
    this.nameString = nameString;
    this.location = location;
    this.size = size;
    this.time = time;
    this.attributes = attributes;
    this.image = image;
  }
}

const TestData = [new Listing("Old Orchard Apt", "./assets/Images/apt.jpg", "10104 Old Orchard Ct", "Skokie", "IL", "USA", 60076, 10, 15, 6, new Date(2020, 5, 10, 12, 0, 0, 0), null),
new Listing("The Best Closet", "./assets/Images/closet.jpg", "160 Steeples Blvd", "Indianapolis", "IN", "USA", 46222, 2, 2, 8, new Date(2020, 1, 24, 6, 30, 0, 0), null),
  new Listing("Under The Sink", "./assets/Images/underthesink.jpg", "1600 Monticello Ave", "Norfolk", "VA", "USA", 23510, 4, 2, 2, new Date(2020, 2, 6, 15, 0, 0, 0), null),
  new Listing("Spare Bedroom", "./assets/Images/sparebedroom.jpg", "737 Colfax St", "Evanston", "IL", "USA", 60201, 10, 10, 10, new Date(2021, 11, 19, 20, 30, 0, 0), null),
  new Listing("Cellar", "./assets/Images/cellar.jpg", "4065 Dunbarton Cir", "San Ramon", "CA", "USA", 94583, 20, 10, 5, new Date(2020, 1, 1, 0, 0, 0, 0), null),
  new Listing("TOP QUALITY Cellar by BESTCELLARS", "./assets/Images/dingycellar.jpg", "3187 Reeves Dr", "Melvindale", "MI", "USA", 48122, 50, 50, 5, new Date(2019, 4, 5, 16, 8, 0, 0), null),
  new Listing("Storage Unit", "./assets/Images/storageunit.jpg", "2850 N Pulaski Rd", "Chicago", "IL", "USA", 60641, 8, 8, 10, new Date(2020, 1, 4, 0, 0, 0, 0), null),
  new Listing("Back Room", "./assets/Images/storeroom.jpg", "5023 Conrad St", "Skokie", "IL", "USA", 60077, 10, 10, 8, new Date(2020, 1, 15, 8, 30, 0, 0), null),
  new Listing("Miniature Storage", "./assets/Images/mousehole.jpg", "2145 Sheridan Rd", "Evanston", "IL", "USA", 60208, 1, 2, 1, new Date(2020, 1, 14, 12, 0, 0, 0), null)];

const JSONTestData = JSON.stringify(TestData);

const ListingContext = React.createContext();

function sizeCalculator(sizeObject) {

  var volume = sizeObject.length * sizeObject.width * sizeObject.height;
  console.log(volume);

  if(volume > 125) {
    if(volume > 1000) {
      return "Large";
    }

    return "Medium";
  }

  return "Small";
}

function App() {

  const [currListing, updateCurrListing] = useState(null);
  function updateListing(newListing) {
    updateCurrListing(newListing);
  }

  return (
    <ListingContext.Provider value={{currListing, updateListing}}>
      <div className="App" width="100%" height="100%" opacity="0.99">
        <input z-index="0"></input>
        <DetailView/>
        <ListingList/>
      </div>
    </ListingContext.Provider>
  );
};

const DetailView = () => {
  const { currListing, updateListing } = useContext(ListingContext);

  return (
    <div style={{width: "100%", height: "100%", margin: 0}}>
      <Modal active={currListing != null} closeOnBlur={true} style={{width: "100%", height: "100%", margin: 0}}>
        <Modal.Background />
        <Modal.Card>
          <Modal.Card.Body>
            <Content>
              <Button onClick={() => updateListing(null)}></Button>
              <Title>{currListing ? currListing.nameString : ""}</Title>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla
                accumsan, metus ultrices eleifend gravida, nulla nunc varius
                lectus, nec rutrum justo nibh eu lectus. Ut vulputate semper
                dui. Fusce erat odio, sollicitudin vel erat vel, interdum mattis
                neque.
              </p>
              <Title as="h2">Second level</Title>
              <p>
                Curabitur accumsan turpis pharetra{' '}
                <strong>augue tincidunt</strong> blandit. Quisque condimentum
                maximus mi, sit amet commodo arcu rutrum id. Proin pretium urna
                vel cursus venenatis. Suspendisse potenti. Etiam mattis sem
                rhoncus lacus dapibus facilisis. Donec at dignissim dui. Ut et
                neque nisl.
              </p>
            </Content>
          </Modal.Card.Body>
        </Modal.Card>
      </Modal>
    </div>
  );
};

function collapseDetailView() {
  
}

const StorageCard = ({listing}) => {
  const { currListing, updateListing } = useContext(ListingContext);
  
  return (
    <div style={{width:"90%", margin:"Auto", paddingTop: '20px'}} onClick={() => updateListing(listing)}>
      <Card style={{borderRadius:"8px"}}>
      <Card.Image>
        <Image.Container size="4by3">
          <Image src="https://i.pinimg.com/originals/6a/7c/fc/6a7cfc513ee281ac19ed5b25f17a9a5a.jpg" style={{borderRadius:"8px"}}/>
        </Image.Container>
      </Card.Image>

      <Card.Content style={{padding:"10px"}}>
        <table style={{width:"100%"}}>
          <tr>
            <th style={{width:"60%"}}>
              <div style={{fontSize:'14px', textAlign:"left", fontWeight:"normal"}}>
                <span style={{textTransform:'uppercase', fontWeight:"500", border:"1px solid black", borderRadius:"4px", padding:'4px', paddingTop:'0px', paddingBottom:'0px'}}>{sizeCalculator(listing.sizes)}</span>
                <span style={{paddingLeft:"4px"}}>Entire Basement</span>


              </div>
            </th>
            <th style={{width:"40%", textAlign:"right", fontWeight:"normal", fontSize:"15px"}}>
                

                <div style={{display:'inline-block'}}>
                  <span style={{color:'red'}}>&#9733;</span>4.37
                  <span style={{fontSize:"13px", paddingLeft:"2px"}}>(32)</span>
                </div>
            </th>
          </tr>
        </table>

          <div style={{fontSize:'24px', textAlign:"left", width:"100%", lineHeight:'28px'}}>{listing.nameString}
          <div style={{display:'inline-block', float:"right", marginTop:'5px'}}>
            
            <img style={{height:'22px'}} src={elevator}/>
            <img style={{height:'22px'}} src={parking}/>
          </div>
          
          </div>
          

          <table style={{width:"100%", marginTop:'10px'}}>
          <tr>
            <th style={{width:"60%"}}>
              <div style={{fontSize:'20px', textAlign:"left", fontWeight:"normal"}}>
                <span style={{fontWeight:"bold"}}>$2</span>/night
              </div>
            </th>
            <th style={{width:"40%", textAlign:"right", fontWeight:"normal", fontSize:"15px"}}>
              <div style={{fontSize:'16px', textAlign:"right", float:"right", fontWeight:"normal"}}>5 miles away</div>
              <br></br>
            </th>
          </tr>
        </table>
        
      </Card.Content>
    </Card>
    </div>
  );
};

const ListingList = () => {
  var Listings = JSON.parse(JSONTestData);
  var columnIds = [...Array(Listings.length).keys()];

  return (
    <div z-index="0" position="relative">
      <Column.Group multiline>
        {columnIds.map(i => (
          <Column key={i} size="one-quarter">
            <StorageCard listing={Listings[i]}/>
          </Column>
        ))}
      </Column.Group>
    </div>
  );
};

export default App;
