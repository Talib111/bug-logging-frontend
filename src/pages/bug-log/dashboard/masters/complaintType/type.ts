import { I_LIST_TYPE } from '@/types/listType'
export type I_COMPLAINT_SOURCE_TYPE = {
  _id: string
  source: string
  complaintTypeName:string
  status: number
  createdAt: string
  updatedAt: string
}

export type I_COMPLAINT_SOURCE_TYPE_VIEW = {
  success: boolean
  data: I_COMPLAINT_SOURCE_TYPE
}

export type I_COMPLAINT_SOURCE_TYPE_LIST = I_LIST_TYPE<I_COMPLAINT_SOURCE_TYPE>
