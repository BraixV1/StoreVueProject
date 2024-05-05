import type { EOrderStatus } from './Helpers/EOrderStatus'
import type { IUserInfo } from './IUserInfo'
import type { IOrderItemInfo } from './OrderItem'

export interface IOrderInfo {
  id: string
  orderDate: Date
  orderNumber: number
  orderItemsCollection?: IOrderItemInfo[]

  appUserId: string
  appUser: IUserInfo

  orderStatus: EOrderStatus
}
