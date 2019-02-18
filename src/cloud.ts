import { RatingSet } from './constants/rate';
import { getUniqueRatingSets } from './util';

let db: any = null;

export function getDB() {
  if (!db) {
    wx.cloud.init({ traceUser: true });
    db = wx.cloud.database();
  }
  return db;
}

export function getRatingsCollection() {
  return getDB().collection('ratings');
}

export async function getRatings(): Promise<RatingSet[]> {
  const { data } = await getRatingsCollection().get();
  return getUniqueRatingSets(data);
}

export function addRating(rating: RatingSet) {
  return getRatingsCollection().add({ data: rating });
}

export function updateRating(id: string, rating: RatingSet) {
  return getRatingsCollection()
    .doc(id)
    .set({ data: rating });
}

export async function getRating(id: string): Promise<RatingSet> {
  const { data } = await getRatingsCollection()
    .doc(id)
    .get();

  return data;
}
