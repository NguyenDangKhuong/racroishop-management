import { Button, ConfigProvider } from 'antd'
import theme from '@/theme/themeConfig'

const BlogsPage = () => (
  <ConfigProvider theme={theme}>
    <div className='App'>
      <Button type='primary'>Button</Button>
    </div>
  </ConfigProvider>
)

export default BlogsPage
