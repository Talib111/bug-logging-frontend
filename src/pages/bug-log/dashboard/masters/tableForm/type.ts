import { I_LIST_TYPE } from '@/types/listType'
export type I_TABLE_FORM_TYPE = {
  _id: string
  formType: string
  elementKey: string
  elementLabel: string
  isEnable: boolean
  status: number
  createdAt: string
  updatedAt: string
}

export type I_TABLE_FORM_TYPE_VIEW = {
  success: boolean
  data: I_TABLE_FORM_TYPE
}

export type I_TABLE_FORM_TYPE_LIST = I_LIST_TYPE<I_TABLE_FORM_TYPE>
