import { Product } from '../../../models/Product'
import { currencyFormat } from '../../../utils/currencyFormat'

type ProductListProp = {
  products: Product[]
}

const ProductList: React.FC<ProductListProp> = ({ products }) => {
  console.log(products)
  return (
    <div className='mt-9 md:mt-10 xl:mt-12'>
      <div className='flex items-center justify-between -mt-2 pb-0.5 mb-4 md:mb-5 lg:mb-6 2xl:mb-7 3xl:mb-8'>
        <h3 className='text-lg md:text-xl lg:text-2xl 2xl:text-3xl xl:leading-10 font-bold text-heading'>
          Best Sellers
        </h3>
      </div>
      <div className='grid gap-x-3 md:gap-x-5 xl:gap-x-7 gap-y-3 xl:gap-y-5 2xl:gap-y-8 bg-white grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 2xl:grid-cols-5'>
        {products.map((item, index) => (
          <div
            key={index}
            className='group box-border overflow-hidden flex rounded-md cursor-pointer ltr:pr-0 rtl:pl-0 pb-2 lg:pb-3 flex-col items-start transition duration-200 ease-in-out transform hover:-translate-y-1 md:hover:-translate-y-1.5 hover:shadow-2xl bg-white'
            role='button'
            title='Nike Black'>
            <div className='flex mb-3 md:mb-3.5'>
              <img
                alt='Nike Black'
                src={item.imageUrl}
                decoding='async'
                data-nimg='intrinsic'
                className='bg-gray-300 object-cover rounded-s-md w-full transition duration-200 ease-in rounded-md group-hover:rounded-b-none'
              />
              <div className='absolute top-3.5 md:top-5 3xl:top-7 ltr:left-3.5 rtl:right-3.5 ltr:md:left-5 rtl:md:right-5 ltr:3xl:left-7 rtl:3xl:right-7 flex flex-col gap-y-1 items-start'></div>
            </div>
            <div className='w-full overflow-hidden p-2 md:px-2.5 xl:px-4'>
              <h2 className='truncate mb-1 text-sm md:text-base font-semibold text-heading'>
                {item.name}
              </h2>
              <p className='text-body text-xs lg:text-sm leading-normal xl:leading-relaxed max-w-[250px] truncate'>
                Casual wear (casual attire or clothing) may be a Western code
                that’s relaxed, occasional, spontaneous and fitted to everyday
                use. Casual wear became popular within the Western world
              </p>
              <div className='font-semibold text-sm sm:text-base mt-1.5 flex flex-wrap gap-x-2 lg:text-lg lg:mt-2.5 text-heading'>
                <span className='inline-block false'>
                  {currencyFormat(item.price)}
                </span>
                {/* <del className='sm:text-base font-normal text-gray-800'>
                  {currencyFormat(item.price)}
                </del> */}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default ProductList
