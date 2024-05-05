import type { IPartCategoryInfo } from './PartCategory'

export interface ICategoryInfo {
  id: string
  categoryName: string
  partCategories: IPartCategoryInfo[]
}
