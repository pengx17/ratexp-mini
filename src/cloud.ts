import { RatingSet } from './constants/rate';

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

export function getRatings() {
  return getRatingsCollection().get();
}

export function addRating(rating: RatingSet) {
  return getRatingsCollection().add({ data: rating });
}
