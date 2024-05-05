import type { IUserInfo } from './IUserInfo'
import type { IKeyboardInfo } from './Keyboard'

export interface IKeyboardRatingInfo {
  id: string
  keyboardId: string
  keyboard: IKeyboardInfo
  rating: number
  comment: string
  userId: string
  user: IUserInfo
  postedAtDt: Date
}
