import type { IUserInfo } from './IUserInfo'
import type { IPartInBuildInfo } from './PartInBuild'

export interface IkeyboardBuildInfo {
  id: string
  buildName: string
  description: string

  appUserId: string
  appUser?: IUserInfo

  buildParts: IPartInBuildInfo[]
}
