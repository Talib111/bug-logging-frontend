import { I_LIST_TYPE } from '@/types/listType'
export type I_NOTIFICATION_TYPE = {
  _id: string
  title: string
  description: string
  notificationSide: number
  imageUrl: any
  fullImgUrl:any
  notificationType: number
  status: number
  createdAt: string
  updatedAt: string
}

export type I_NOTIFICATION_TYPE_VIEW = {
  success: boolean
  data: I_NOTIFICATION_TYPE
}

export type I_NOTIFICATION_TYPE_LIST = I_LIST_TYPE<I_NOTIFICATION_TYPE>
