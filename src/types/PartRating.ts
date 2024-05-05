import type { IUserInfo } from './IUserInfo'
import type { IPartInfo } from './Part'

export interface IPartRatingInfo {
  id: string
  comment: string

  partId: string
  part?: IPartInfo

  rating: number

  userId: string
  user: IUserInfo

  postedAt: Date
}
