import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BusinessService {

  constructor() { }
  
  getCategories(){
    return CATEGORIES;
  }

}

const CATEGORIES = [
  { value: 'HomeServices', text: 'Home Services' },
  { value: 'HomeCleaning', text: 'Home Cleaning' },
  { value: 'LocalServices', text: 'Local Services' },
  { value: 'CarpetCleaning', text: 'Carpet Cleaning' },
  { value: 'CarWash', text: 'Car Wash' },
  { value: 'Automotive', text: 'Automotive' },
  { value: 'AutoDetailing', text: 'Auto Detailing' },
  { value: 'Food', text: 'Food' },
  { value: 'Bakeries', text: 'Bakeries' },
  { value: 'CoffeeTea', text: 'Coffee & Tea' },
  { value: 'EventPlanningServices', text: 'Event Planning & Services' },
  { value: 'CardsStationery', text: 'Cards & Stationery' },
  { value: 'ArtsCrafts', text: 'Arts & Crafts' },
  { value: 'FlowersGifts', text: 'Flowers & Gifts' },
  { value: 'Shopping', text: 'Shopping' },
  { value: 'Restaurants', text: 'Restaurants' },
  { value: 'Pizza', text: 'Pizza' },
  { value: 'PoolHalls', text: 'Pool Halls' },
  { value: 'DiveBars', text: 'Dive Bars' },
  { value: 'Bars', text: 'Bars' },
  { value: 'Nightlife', text: 'Nightlife' },
  { value: 'VenuesEventSpaces', text: 'Venues & Event Spaces' },
  { value: 'PartyEventPlanning', text: 'Party & Event Planning' },
  { value: 'Chinese', text: 'Chinese' },
  { value: 'SpecialtyFood', text: 'Specialty Food' },
  { value: 'CandyStores', text: 'Candy Stores' },
  { value: 'FastFood', text: 'Fast Food' },
  { value: 'ChickenWings', text: 'Chicken Wings' },
  { value: 'InteriorDesign', text: 'Interior Design' },
  { value: 'OilChangeStations', text: 'Oil Change Stations' },
  { value: 'AutoRepair', text: 'Auto Repair' },
  { value: 'AutoPartsSupplies', text: 'Auto Parts & Supplies' },
  { value: 'ArtsEntertainment', text: 'Arts & Entertainment' },
  { value: 'HotDogs', text: 'Hot Dogs' },
  { value: 'AmericanTraditional', text: 'American (Traditional)' },
  { value: 'MusicVenues', text: 'Music Venues' },
  { value: 'HotelsTravel', text: 'Hotels & Travel' },
  { value: 'Hotels', text: 'Hotels' },]