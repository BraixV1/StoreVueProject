import type { IkeyboardBuildInfo } from './KeyboardBuild'
import type { IPartInfo } from './Part'

export interface IPartInBuildInfo {
  id: string

  partId: string
  part: IPartInfo
  keyboardBuildId: string
  keyboardBuild: IkeyboardBuildInfo
}
