import type { IPartInfo } from './Part'
import type { IKeyboardInfo } from './Keyboard'

export interface IKeyboardPartInfo {
  id: string
  keyboardId: string
  keyboard?: IKeyboardInfo
  partId: string
  part?: IPartInfo
}
