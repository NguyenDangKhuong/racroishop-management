const Pagination = ({
  totalPages,
  selectedPage,
  setSelectedPage
}: {
  totalPages: number
  selectedPage: number
  setSelectedPage: any
}) => {
  return totalPages > 0 ? (
    <div className='py-5 flex justify-center'>
      <nav className='block'>
        <ul className='flex pl-0 rounded list-none flex-wrap'>
          <li
            onClick={() => setSelectedPage(selectedPage - 1)}
            className='cursor-pointer first:ml-0 text-xs font-semibold flex w-8 h-8 mx-1 p-0 rounded-full items-center justify-center leading-tight relative border border-solid border-gray-500 bg-white text-gray-500'>
            <i className='fas fa-chevron-left -ml-px'></i>
          </li>
          {Array.from(Array(totalPages), (_, i) => (
            <li
              key={i}
              className={`cursor-pointer first:ml-0 text-xs font-semibold flex w-8 h-8 mx-1 p-0 rounded-full items-center justify-center leading-tight relative border border-solid border-blueGray-500 ${
                selectedPage - 1 === i
                  ? 'text-white bg-gray-500'
                  : 'bg-white text-gray-500'
              } `}
              onClick={() => setSelectedPage(i + 1)}>
              {i + 1}
            </li>
          ))}
          <li
            onClick={() => setSelectedPage(selectedPage + 1)}
            className='cursor-pointer first:ml-0 text-xs font-semibold flex w-8 h-8 mx-1 p-0 rounded-full items-center justify-center leading-tight relative border border-solid border-gray-500 bg-white text-gray-500'>
            <i className='fas fa-chevron-right -mr-px'></i>
          </li>
        </ul>
      </nav>
    </div>
  ) : null
}

export default Pagination
