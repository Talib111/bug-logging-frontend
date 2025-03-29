import { I_LIST_TYPE } from '@/types/listType'
export type I_TARGET_TYPE = {
  _id: string
  targetType: string
  status: number
  createdAt: string
  updatedAt: string
}

export type I_TARGET_TYPE_VIEW = {
  success: boolean
  data: I_TARGET_TYPE
}

export type I_TARGET_TYPE_LIST = I_LIST_TYPE<I_TARGET_TYPE>
