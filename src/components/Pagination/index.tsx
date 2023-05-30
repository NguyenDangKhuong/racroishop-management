import Paginations from 'rc-pagination'

const Pagination = ({
  totalPages,
  selectedPage,
  setSelectedPage,
  totalDocs,
  pageSize
}: {
  totalPages: number
  selectedPage: number
  setSelectedPage: any
  totalDocs: number
  pageSize: number
}) => {
  return totalPages > 0 ? (
    <div className='py-5 flex justify-center'>
      <Paginations
        total={totalDocs}
        current={selectedPage}
        onChange={current => setSelectedPage(current)}
        pageSize={pageSize}
        className='flex btn-group'
        itemRender={(current, type) =>
          type === 'page' ? (
            <div
              className={`btn btn-sm mx-2 ${
                selectedPage === current &&
                'btn-active bg-gray-400 border-none hover:bg-gray-400'
              }`}>
              {current}
            </div>
          ) : type === 'prev' ? (
            <div className='btn btn-sm mr-2'>
              <i className='fas fa-chevron-left -ml-px'></i>
            </div>
          ) : type === 'next' ? (
            <div className='btn btn-sm ml-2'>
              <i className='fas fa-chevron-right -mr-px'></i>
            </div>
          ) : type === 'jump-prev' ? (
            <div className='btn btn-sm mx-2'>...</div>
          ) : type === 'jump-next' ? (
            <div className='btn btn-sm mx-2'>...</div>
          ) : (
            <div></div>
          )
        }
        nextIcon={<i className='fas fa-chevron-right -mr-px'></i>}
      />
    </div>
  ) : null
}

export default Pagination
