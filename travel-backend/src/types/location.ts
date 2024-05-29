export interface Favourite {
    name: string;
    description: string;
  }
  
  export interface Location {
    location: string;
    favourite: Favourite[];
  }