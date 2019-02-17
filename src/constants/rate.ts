export interface Dimension {
  id: string;
  title: string;
  description: string;
}

export const dimensions: Dimension[] = [
  {
    id: 'cautiousness',
    title: '谨慎',
    description: '思考一下，XP这个月是否谨小慎微，避免了马虎的行为？',
  },
  {
    id: 'care',
    title: '关怀',
    description: 'XP有没有照顾好GK呢？',
  },
  {
    id: 'mature',
    title: '成熟',
    description: 'XP是否保持足够的心智成熟，让人感觉靠得住？',
  },
  {
    id: 'fitness',
    title: '健康',
    description: 'XP的饮食与运动量是否足够健康？',
  },
  {
    id: 'accompaniment',
    title: '陪伴',
    description: 'XP是否做到了在工(游)作(戏)之余，没忘了陪媳妇？',
  },
];

export const dimensionMap: { [id: string]: Dimension } = dimensions.reduce(
  (accum, dim) => ({ ...accum, [dim.id]: dim }),
  {}
);

export interface Score {
  value: number;
  label: string;
}

export const scores: Score[] = [
  {
    value: 2,
    label: '❤️',
  },
  {
    value: 1,
    label: '😐',
  },
  {
    value: 0,
    label: '💩',
  },
];

export const scoresMap: { [id: string]: Score } = scores.reduce(
  (accum, val) => ({ ...accum, [val.value]: val.label }),
  {}
);

export interface RatingSet {
  ratings: { [key: string]: number };
  comments: string;
  timestamp: string; // iso date
}
