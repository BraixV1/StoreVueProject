import type { ICategoryInfo } from './Category'
import type { IKeyboardInfo } from './Keyboard'
import type { IPartInfo } from './Part'
import type { IWarehouseInfo } from './Warehouse'

export interface IPartCategoryInfo {
  id: string
  partId: string
  part?: IPartInfo

  keyboardId: string
  keyboard: IKeyboardInfo

  categoryId: string
  category?: ICategoryInfo
}
