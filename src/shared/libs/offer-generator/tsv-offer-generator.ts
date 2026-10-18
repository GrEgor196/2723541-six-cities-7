import dayjs from 'dayjs';
import { MockServerData } from '../../types/mock-server-data.type.js';
import { OfferGenerator } from './offer-generator.interface.js';
import { getRandomItems, generateRandomValue, getRandomItem } from '../../helpers/index.js';

const MIN_PRICE = 100;
const MAX_PRICE = 100000;

const MIN_ROOMS = 1;
const MAX_ROOMS = 8;

const MIN_GUESTS = 1;
const MAX_GUESTS = 10;

const MIN_RATING = 1;
const MAX_RATING = 5;
const RATING_DIGITS = 1;

const FIRST_WEEK_DAY = 1;
const LAST_WEEK_DAY = 7;

const IMAGES_COUNT = 6;

export class TSVOfferGenerator implements OfferGenerator {
  constructor(private readonly mockData: MockServerData) {}

  public generate(): string {
    const title = getRandomItem(this.mockData.titles);
    const description = getRandomItem(this.mockData.descriptions);
    const postDate = dayjs()
      .subtract(
        generateRandomValue(FIRST_WEEK_DAY, LAST_WEEK_DAY),
        'day'
      )
      .toISOString();
    const city = getRandomItem(this.mockData.cities);
    const previewImage = getRandomItem(this.mockData.previewImages);
    const images = Array.from(
      { length: IMAGES_COUNT },
      () => getRandomItem(this.mockData.images)
    ).join(';');
    const isPremium = getRandomItem([true, false]).toString();
    const isFavorite = getRandomItem([true, false]).toString();
    const rating = generateRandomValue(MIN_RATING, MAX_RATING, RATING_DIGITS).toString();
    const housingType = getRandomItem(this.mockData.housingTypes);
    const roomsCount = generateRandomValue(MIN_ROOMS, MAX_ROOMS).toString();
    const guestsCount = generateRandomValue(MIN_GUESTS, MAX_GUESTS).toString();
    const price = generateRandomValue(MIN_PRICE, MAX_PRICE).toString();
    const amenities = getRandomItems(this.mockData.amenities).join(';');
    const author = getRandomItem(this.mockData.users);

    return [
      title,
      description,
      postDate,
      city.name,
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
      author.name,
      author.email,
      author.avatar ?? '',
      author.password,
      author.type,
      city.location.latitude,
      city.location.longitude
    ].join('\t');
  }
}
