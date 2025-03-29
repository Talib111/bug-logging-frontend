import { I_LIST_TYPE } from '@/types/listType'
export type I_PRIORITY_TYPE = {
  _id: string
  priorityName: string
  status: number
  createdAt: string
  updatedAt: string
}

export type I_PRIORITY_TYPE_VIEW = {
  success: boolean
  data: I_PRIORITY_TYPE
}

export type I_PRIORITY_TYPE_LIST = I_LIST_TYPE<I_PRIORITY_TYPE>
