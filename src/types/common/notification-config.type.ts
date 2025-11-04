import { NotificationsConfig } from '@/constants/notification-config.enum'

export type NotificationType = (typeof NotificationsConfig)[keyof typeof NotificationsConfig]
