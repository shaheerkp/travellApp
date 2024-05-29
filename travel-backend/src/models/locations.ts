import mongoose, { Schema } from "mongoose";

const FavouritePlaceSchema = new Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
});


export const locationsSchema = new Schema({
  location: { type: String, required: true, unique: true },
  favourite: [FavouritePlaceSchema],
});



export const Location=mongoose.model('Location',locationsSchema)



// {location: Erreré, Ethiopia},
//       favorite:[
//       {name: Lake Afrera, description: A salt lake known for its beautiful landscape and hot springs, popular for its unique geological features and the nearby salt mining activities.},
//       {name: Erta Ale, description: An active basaltic shield volcano famous for its persistent lava lake, providing an extraordinary and thrilling experience for visitors.},
//       {name: Dallol, description: A hydrothermal field known for its otherworldly landscape with colorful hot springs, acidic pools, and salt formations, making it a fascinating destination for adventurous travelers.},
//       {name: Semera, description: The capital of the Afar Region, offering insights into the culture and daily life of the Afar people, with opportunities to explore local markets and cuisine.}
//       ]