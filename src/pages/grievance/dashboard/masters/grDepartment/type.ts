import { I_LIST_TYPE } from '@/types/listType'
export type I_GR_DEPARTMENT_TYPE = {
  _id: string
  department: string
  status: number
  createdAt: string
  updatedAt: string
}

export type I_GR_DEPARTMENT_TYPE_VIEW = {
  success: boolean
  data: I_GR_DEPARTMENT_TYPE
}

export type I_GR_DEPARTMENT_TYPE_LIST = I_LIST_TYPE<I_GR_DEPARTMENT_TYPE>
