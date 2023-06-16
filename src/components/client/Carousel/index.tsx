import { useEffect, useRef } from 'react'
import { register } from 'swiper/element/bundle'
import { SwiperClass } from 'swiper/react'

register()

type SwiperRef = HTMLElement & { swiper: SwiperClass; initialize: () => void }

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
  const swiperElRef = useRef<SwiperRef>(null)

  useEffect(() => {
    const swiperContainer = swiperElRef.current
    // listen for Swiper events using addEventListener
    swiperElRef?.current?.addEventListener('progress', e => {
      const [swiper, progress] = (e as any).detail
      // console.log(swiper)
    })

    swiperElRef?.current?.addEventListener('slidechange', e => {
      // console.log('slide changed')
    })

    const params = {
      navigation: true,
      pagination: true,
      loop: true,
      autoplay: {
        delay: 1000,
        pauseOnMouseEnter: true
      },
      speed: 3000
    }

    //@ts-ignore
    Object.assign(swiperContainer, params)
    swiperContainer?.initialize()
  }, [])

  return (
    <swiper-container ref={swiperElRef} init={false}>
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
