import { I_LIST_TYPE } from '@/types/listType'
export type I_PROBLEM_TYPE = {
  _id: string
  problem: string
  departmentId: string
  sla1: string
  sla2: string
  sla3: string
  status: number
  createdAt: string
  updatedAt: string
}

export type I_PROBLEM_TYPE_VIEW = {
  success: boolean
  data: I_PROBLEM_TYPE
}

export type I_PROBLEM_TYPE_LIST = I_LIST_TYPE<I_PROBLEM_TYPE>
