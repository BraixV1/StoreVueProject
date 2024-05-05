import type { IKeyboardPartInfo } from './KeyboardPart'
import type { IKeyboardRatingInfo } from './KeyboardRating'

export interface IKeyboardInfo {
  id: string
  name: string
  description: string
  price: number
  itemCode: string
  keyboardPartsCollection?: IKeyboardPartInfo[]
  keyboardRatingsCollection? : IKeyboardRatingInfo[]
}
