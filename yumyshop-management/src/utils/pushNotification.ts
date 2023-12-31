import { notification } from 'antd';

const pushNotification = (message: string, success: boolean) => {
  return success ? notification.success({
    message: 'Thành công',
    description: message,
  }) : notification.error({
    message: 'Lỗi',
    description: message,
    duration: 10
  })
}

export default pushNotification