import { createVNode } from 'vue'

import { notification, Modal } from 'ant-design-vue'
import { ExclamationCircleOutlined } from '@ant-design/icons-vue'

type NotificationType = 'success' | 'info' | 'warning' | 'error'

type messageType = {
  message: string
  description: string
}

export const useNotification = (type: NotificationType, inforMessage: string | messageType) => {
  if (typeof inforMessage == 'string') {
    notification[type]({
      message: inforMessage
    })
  } else {
    const { message, description } = inforMessage
    notification[type]({
      message: message || '',
      description: description || ''
    })
  }
}

export const showConfirmModal = (
  title: string,
  message?: string,
  callbackOk?: Function,
  callbackCancel?: Function
) => {
  Modal.confirm({
    title: title,
    icon: createVNode(ExclamationCircleOutlined),
    onOk: async () => {
      callbackOk && (await callbackOk())
      if (message) useNotification('success', message)
    },
    onCancel: () => callbackCancel && callbackCancel()
  })
}
