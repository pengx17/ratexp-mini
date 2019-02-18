import { RatingSet } from './constants/rate';

export function getDateString(timestamp: string = '') {
  return new Date(timestamp).toLocaleDateString('zh-Hans-CN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

export function getMonthString(timestamp: string = '') {
  return new Date(timestamp).toLocaleDateString('zh-Hans-CN', {
    year: 'numeric',
    month: 'long',
  });
}

export function getDayString(timestamp: string = '') {
  return new Date(timestamp).toLocaleDateString('zh-Hans-CN', {
    month: 'long',
    day: 'numeric',
  });
}

// Unique. Also sort by date.
export function getUniqueRatingSets(ratingSets: RatingSet[]) {
  ratingSets = [...(ratingSets || [])].sort((a, b) =>
    b.timestamp.localeCompare(a.timestamp)
  );
  const ratingSetsByDate: { [date: string]: RatingSet } = ratingSets.reduce(
    (accum, rs) => {
      if (!accum[getDateString(rs.timestamp)]) {
        return { ...accum, [getDateString(rs.timestamp)]: rs };
      } else {
        return accum;
      }
    },
    {}
  );

  return Object.values(ratingSetsByDate).sort((a, b) =>
    b.timestamp.localeCompare(a.timestamp)
  );
}

export function groupRatingSetsByMonth(
  ratingSets: RatingSet[]
): { month: string; ratingSets: RatingSet[] }[] {
  ratingSets = [...(ratingSets || [])].sort((a, b) =>
    b.timestamp.localeCompare(a.timestamp)
  );
  const ratingSetsByMonth = ratingSets.reduce<{ [date: string]: RatingSet[] }>(
    (accum, rs) => {
      if (!accum[getMonthString(rs.timestamp)]) {
        accum[getMonthString(rs.timestamp)] = [];
      }
      accum[getMonthString(rs.timestamp)].push(rs);
      return accum;
    },
    {}
  );

  return Object.entries(ratingSetsByMonth).map(([month, ratingSets]) => ({
    month,
    ratingSets,
  }));
}
