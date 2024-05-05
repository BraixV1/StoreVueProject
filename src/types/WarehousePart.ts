import type { IKeyboardInfo } from './Keyboard'
import type { IPartInfo } from './Part'
import type { IWarehouseInfo } from './Warehouse'

export interface IWarehousePartInfo {
    id: string
    quantity: number

    partId: string
    part?: IPartInfo

    keyboardId: string
    keyboard?: IKeyboardInfo

    wareHouseId: string
    warehouse?: IWarehouseInfo
}
