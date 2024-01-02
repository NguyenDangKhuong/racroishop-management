import DashboardTitle from '@/components/dashboard/DashboardTitle'
import CartListItem from '@/components/dashboard/carts/CartListItem'
import CartSumary from '@/components/dashboard/carts/CartSumary'
import SearchInput from '@/components/dashboard/carts/SearchInput'
import { Flex } from 'antd'

const CartPage = async (props: any) => {
  
  return (
    <>
      <DashboardTitle pageName='Giỏ hàng' />
      <SearchInput />
      <Flex>
        <CartListItem />
        <CartSumary />
      </Flex>
    </>
  )
}

export default CartPage
