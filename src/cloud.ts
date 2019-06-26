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

const MAX_LIMIT = 20;

export async function getRatings(): Promise<RatingSet[]> {
  const { total } = await getRatingsCollection().count();
  const batchTimes = Math.ceil(total / MAX_LIMIT);

  // 承载所有读操作的 promise 的数组
  const tasks: Promise<{ data: RatingSet[] }>[] = [];
  for (let i = 0; i < batchTimes; i++) {
    const promise = getRatingsCollection()
      .skip(i * MAX_LIMIT)
      .limit(MAX_LIMIT)
      .get();
    tasks.push(promise);
  }

  const ratingSets = (await Promise.all(tasks)).reduce((acc, cur) => {
    return [...acc, ...cur.data];
  }, []);

  return getUniqueRatingSets(ratingSets);
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
