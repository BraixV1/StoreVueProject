import type { IWarehousePartInfo } from './WarehousePart'

export interface IWarehouseInfo {
    id: string
    warehouseName: string
    warehousePartsCollection: IWarehousePartInfo[]
}
