import { Offer } from '../types/offer.type.js';
import { Amenity } from '../types/amenity.enum.js';
import { CityName } from '../types/city-name.enum.js';
import { HousingType } from '../types/housing-type.enum.js';
import { UserType } from '../types/user-type.enum.js';

export function createOffer(offerData: string): Offer {
  const [
    title,
    description,
    postDate,
    cityName,
    previewImage,
    images,
    isPremium,
    isFavorite,
    rating,
    housingType,
    roomsCount,
    guestsCount,
    price,
    amenities,
    authorName,
    authorEmail,
    authorAvatar,
    authorPassword,
    authorType,
    latitude,
    longitude
  ] = offerData.replace('\n', '').split('\t');

  const location = {
    latitude: Number(latitude),
    longitude: Number(longitude)
  };

  const author = {
    name: authorName,
    email: authorEmail,
    avatar: authorAvatar,
    password: authorPassword,
    type: authorType as UserType
  };

  const city = {
    name: cityName as CityName,
    location
  };

  return {
    title,
    description,
    postDate: new Date(postDate),

    city,

    previewImage,
    images: images.split(';'),
    isPremium: isPremium === 'true',
    isFavorite: isFavorite === 'true',
    rating: Number(rating),
    housingType: housingType as HousingType,
    roomsCount: Number(roomsCount),
    guestsCount: Number(guestsCount),
    price: Number(price),
    amenities: amenities.split(';') as Amenity[],
    author,
    commentCount: 0,
    location
  };
}
