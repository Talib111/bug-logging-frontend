import { I_LIST_TYPE } from '@/types/listType'
export type I_MODULE_TYPE = {
  _id: string
  moduleName: string
  uniqueString:string
  fixedNoLabel:string
  tempNoLabel:string
  imageUrl: any
  fullImgUrl:any
  status: number
  createdAt: string
  updatedAt: string
}

export type I_MODULE_TYPE_VIEW = {
  success: boolean
  data: I_MODULE_TYPE
}

export type I_MODULE_TYPE_LIST = I_LIST_TYPE<I_MODULE_TYPE>
