import CategoryIcons from './components/CategoryIcons';

export type TCategoryIcon = keyof typeof CategoryIcons;

export interface TCategory {
  id: number;
  icon: TCategoryIcon;
  title: string;
}

export type TCreateCategoryInput = Pick<TCategory, 'icon' | 'title'>;

export interface TCategoriesData {
  categories: TCategory[];
}
