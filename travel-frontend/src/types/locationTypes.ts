export interface Favourite {
    name: string;
    description: string;
    _id:string
  }
  
  export interface Location {
    location: string;
    favourite: Favourite[];
  }