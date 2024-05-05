import type { IKeyboardInfo } from './Keyboard'
import type { IOrderInfo } from './Order'
import type { IPartInfo } from './Part'

export interface IOrderItemInfo {
  id?: string
  quantity: number
  price: number
  addedToBasket: Date

  partId: string | null
  part: IPartInfo | null

  keyboardId: string | null
  keyboard: IKeyboardInfo | null

  orderId?: string 
  order?: IOrderInfo 
}
