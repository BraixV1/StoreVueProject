import type { IPartCategoryInfo } from "./PartCategory"
import type { IPartRatingInfo } from "./PartRating"
import type { IWarehousePartInfo } from "./WarehousePart"

export interface IPartInfo {
  id: string
  partName: string
  partCode: string
  price: number
  quantity: number
  partCommentsCollection: IPartRatingInfo[]
  partCategoriesCollection: IPartCategoryInfo[]
  warehousePartsCollection: IWarehousePartInfo[]
}
