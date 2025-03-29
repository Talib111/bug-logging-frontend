import { I_LIST_TYPE } from '@/types/listType'
export type I_ROLE_TYPE = {
  _id: string
  roleName: string
  description: string
  status: number
  createdAt: string
  updatedAt: string
}

export type I_ROLE_TYPE_VIEW = {
  success: boolean
  data: I_ROLE_TYPE
}

export type I_ROLE_TYPE_LIST = I_LIST_TYPE<I_ROLE_TYPE>
