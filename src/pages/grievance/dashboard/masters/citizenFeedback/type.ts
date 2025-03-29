import { I_LIST_TYPE } from '@/types/listType'
export type I_CITIZEN_FEEDBACK_TYPE = {
  _id: string
  citizenName: string
  feedback: string
  status: number
  createdAt: string
  updatedAt: string
}

export type I_CITIZEN_FEEDBACK_TYPE_VIEW = {
  success: boolean
  data: I_CITIZEN_FEEDBACK_TYPE
}

export type I_CITIZEN_FEEDBACK_TYPE_LIST = I_LIST_TYPE<I_CITIZEN_FEEDBACK_TYPE>
