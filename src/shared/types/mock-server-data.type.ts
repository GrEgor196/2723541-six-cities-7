import { Amenity } from './amenity.enum.js';
import { City } from './city.type.js';
import { HousingType } from './housing-type.enum.js';
import { User } from './user.type.js';

export type MockServerData = {
  titles : string[];
  descriptions : string[];
  postDates : string[];
  cities : City[];
  previewImages : string[];
  images : string[];
  housingTypes : HousingType[];
  amenities : Amenity[];
  users : User[];
};

