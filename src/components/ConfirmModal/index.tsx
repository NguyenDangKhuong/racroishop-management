import React from 'react'

type ConfirmModalProps = {
  title?: string
  content?: string
  isOpen: boolean
  confirmHandler?: () => void
  closeHandlder: () => void
}

const ConfirmModal: React.FC<ConfirmModalProps> = ({
  title,
  content,
  confirmHandler,
  closeHandlder,
  isOpen
}) => {
  return (
    <>
      <div
        className={`modal ${
          isOpen
            ? 'visible opacity-100 pointer-events-auto'
            : 'invisible opacity-0 pointer-events-none'
        }`}>
        <div className='modal-box relative'>
          <div
            className='btn btn-sm btn-circle absolute right-2 top-2 cursor-pointer'
            onClick={closeHandlder}>
            ✕
          </div>
          <h3 className='text-lg font-bold'>{title}</h3>
          <p className='py-4'>{content}</p>
          <div className='modal-action'>
            <div className='btn btn-error' onClick={confirmHandler}>
              Xóa
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default ConfirmModal
