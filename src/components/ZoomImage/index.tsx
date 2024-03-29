import { useRef } from 'react'

const ZoomImageModal = ({
  imageSelected,
  showImageModal,
  setShowImageModal
}: {
  imageSelected: string
  showImageModal: boolean
  setShowImageModal: any
}) => {
  const componentRef = useRef()

  return showImageModal ? (
    <>
      <div
        className='justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none'
        onClick={() => setShowImageModal(false)}>
        <div className='relative w-auto my-6 mx-auto max-w-sm'>
          {/*content*/}
          <div className='border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none'>
            {/*header*/}
            <div className='flex items-start justify-between p-5 border-b border-solid border-gray-200 rounded-t'>
              <h3 className='text-3xl font-semibold'>Hình ảnh</h3>
              <button
                className='p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none'
                onClick={() => setShowImageModal(false)}>
                <span className='bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none'>
                  ×
                </span>
              </button>
            </div>
            {/*body*/}
            <div>
              <img alt='' src={imageSelected} />
            </div>
            {/*footer*/}
            <div className='flex items-center justify-end p-6 border-t border-solid border-gray-200 rounded-b'>
              <button
                className='text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150'
                type='button'
                onClick={() => setShowImageModal(false)}>
                Đóng
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className='opacity-25 fixed inset-0 z-40 bg-black'></div>
    </>
  ) : null
}

export default ZoomImageModal
