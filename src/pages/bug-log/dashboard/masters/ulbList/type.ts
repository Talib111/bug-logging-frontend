import { I_LIST_TYPE } from '@/types/listType'
export type I_ULB_TYPE = {
  _id: string
  ulbName: string
  phonenumber: string
  whatsappnumber: string
  email: string
  status: number
  createdAt: string
  updatedAt: string
}

export type I_ULB_TYPE_VIEW = {
  success: boolean
  data: I_ULB_TYPE
}

export type I_ULB_TYPE_LIST = I_LIST_TYPE<I_ULB_TYPE>
