import LoaderIcon from '../LoaderIcon'

const LoadingPage = () => {
  return (
    <div className='w-full h-full fixed top-0 left-0 bg-white opacity-75 z-1 flex items-center justify-center'>
      <div role='status'>
        <LoaderIcon />
        <span className='sr-only'>Loading...</span>
      </div>
    </div>
  )
}

export default LoadingPage
