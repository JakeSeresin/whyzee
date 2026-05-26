export type CheatCategory =
  | 'Player'
  | 'Weapons'
  | 'Vehicles'
  | 'World'
  | 'Weather'
  | 'Police'
  | 'Gameplay'
  | 'Fun';

export interface Cheat {
  id: string;
  gameId: string;
  name: string;
  effect: string;
  category: CheatCategory;
  pcCode: string;
  playstationCode: string;
  xboxCode: string;
  hasAchievementWarning: boolean;
  description: string;
  isFavorite?: boolean;
}

export interface CategoryInfo {
  category: CheatCategory | 'All';
  label: string;
  icon: string;
  count: number;
}
