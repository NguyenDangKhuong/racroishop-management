import { useEffect, useRef } from 'react'
import { register } from 'swiper/element/bundle'

register()

const bannerData = [
  {
    imageUrl: 'image/banner/banner1.png',
    alt: ''
  },
  {
    imageUrl: 'image/banner/banner2.png',
    alt: ''
  },
  {
    imageUrl: 'image/banner/banner1.png',
    alt: ''
  },
  {
    imageUrl: 'image/banner/banner2.png',
    alt: ''
  },
  {
    imageUrl: 'image/banner/banner1.png',
    alt: ''
  }
]

export const Carousel = () => {
  const swiperElRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // listen for Swiper events using addEventListener
    swiperElRef?.current?.addEventListener('progress', e => {
      const [swiper, progress] = (e as any).detail
      console.log(swiper)
    })

    swiperElRef?.current?.addEventListener('slidechange', e => {
      console.log('slide changed')
    })
  }, [])

  return (
    <swiper-container
      ref={swiperElRef}
      slides-per-view='1'
      navigation={true}
      pagination={true}>
      {bannerData.map((item, index) => (
        <swiper-slide key={index}>
          <img
            className='h-[calc(100vh-theme(space.20))] w-full'
            alt={item.alt}
            src={item.imageUrl}
          />
        </swiper-slide>
      ))}
    </swiper-container>
  )
}

export default Carousel
