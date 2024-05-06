import type { EOrderStatus } from './Helpers/EOrderStatus'
import type { IUserInfo } from './IUserInfo'
import type { IOrderItemInfo } from './OrderItem'

export interface IOrderInfo {
  id: string
  orderDate: Date
  orderNumber: number
  orderItemsCollection?: IOrderItemInfo[]

  appUserId: string | null
  appUser: IUserInfo | null

  orderStatus: EOrderStatus

  firstName: string
  lastName: string
  email: string
  phoneNumber: string
  addressLine: string
  city: string
  state: string
  zipCode: string
}
