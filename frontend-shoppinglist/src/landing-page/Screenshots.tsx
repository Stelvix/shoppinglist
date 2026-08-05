import { useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, EffectCoverflow } from 'swiper/modules'
import type { Swiper as SwiperType } from 'swiper/types'
import {
  AiOutlineHome,
  AiOutlineLeft,
  AiOutlineRight,
  AiOutlineShoppingCart,
  AiOutlineUnorderedList,
  AiOutlineWallet,
} from 'react-icons/ai'
import type { IconType } from 'react-icons'
import 'swiper/css'
import 'swiper/css/effect-coverflow'

const fallbackSlides: { label: string; Icon: IconType }[] = [
  { label: 'Accueil', Icon: AiOutlineHome },
  { label: 'Mes listes', Icon: AiOutlineUnorderedList },
  { label: 'Detail liste', Icon: AiOutlineShoppingCart },
  { label: 'Total estime', Icon: AiOutlineWallet },
]

const screenshotUrls = Object.values(
  import.meta.glob<string>('../assets/screenshots/*', { eager: true, import: 'default' }),
)

type Slide = {
  label: string
  src?: string
  Icon?: IconType
}

const slides: Slide[] =
  screenshotUrls.length > 0
    ? screenshotUrls.map((src, index) => ({ src, label: `Capture ${index + 1}` }))
    : fallbackSlides.map(({ label, Icon }) => ({ label, Icon }))

export default function Screenshots() {
  const [swiper, setSwiper] = useState<SwiperType | null>(null)
  const [activeIndex, setActiveIndex] = useState(0)

  return (
    <section id="screenshots" className="py-20">
      <div className="section-shell">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-2xl">
            <p className="text-sm font-bold uppercase tracking-[0.18em] text-primary">L application en images</p>
            <h2 className="mt-3 text-3xl font-black tracking-tight sm:text-4xl">
              Voyez Shopping List en action.
            </h2>
          </div>

          <div className="hidden gap-3 sm:flex">
            <button
              type="button"
              onClick={() => swiper?.slidePrev()}
              aria-label="Capture precedente"
              className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-white shadow-md shadow-blue-200 transition hover:bg-primaryDark"
            >
              <AiOutlineLeft className="h-5 w-5" />
            </button>
            <button
              type="button"
              onClick={() => swiper?.slideNext()}
              aria-label="Capture suivante"
              className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-white shadow-md shadow-blue-200 transition hover:bg-primaryDark"
            >
              <AiOutlineRight className="h-5 w-5" />
            </button>
          </div>
        </div>

        <Swiper
          className="mt-12"
          modules={[EffectCoverflow, Autoplay]}
          effect="coverflow"
          coverflowEffect={{ rotate: 0, stretch: 0, depth: 0, modifier: 0.85, slideShadows: false }}
          centeredSlides
          loop
          grabCursor
          spaceBetween={50}
          slidesPerView={1.05}
          breakpoints={{ 768: { slidesPerView: 1.35 }, 1024: { slidesPerView: 1.65 } }}
          autoplay={{ delay: 4000, disableOnInteraction: false, pauseOnMouseEnter: true }}
          onSwiper={setSwiper}
          onActiveIndexChange={(instance) => setActiveIndex(instance.realIndex)}
        >
          {slides.map((slide, index) => (
            <SwiperSlide key={index}>
              <div className="card p-3 sm:p-4">
                <div className="flex items-center gap-1.5 border-b border-slate-200 px-1 pb-3">
                  <span className="h-2.5 w-2.5 rounded-full bg-red-400" />
                  <span className="h-2.5 w-2.5 rounded-full bg-amber-400" />
                  <span className="h-2.5 w-2.5 rounded-full bg-green-400" />
                </div>
                <div className="mt-3 overflow-hidden rounded-2xl border border-slate-200 bg-slate-50">
                  {slide.src ? (
                    <img
                      src={slide.src}
                      alt={slide.label}
                      loading="lazy"
                      className="h-auto w-full"
                    />
                  ) : (
                    <div className="flex h-72 w-full flex-col items-center justify-center gap-3 bg-linear-to-br from-primaryLight to-slate-100 text-primary sm:h-80">
                      {slide.Icon ? <slide.Icon className="h-10 w-10" /> : null}
                      <p className="text-sm font-bold">{slide.label}</p>
                    </div>
                  )}
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        <div className="mt-8 flex items-center justify-center gap-2">
          {slides.map((_, index) => (
            <button
              key={index}
              type="button"
              onClick={() => swiper?.slideTo(index)}
              aria-label={`Aller a la capture ${index + 1}`}
              className={`h-2.5 rounded-full transition-all ${
                index === activeIndex ? 'w-8 bg-primary' : 'w-2.5 bg-slate-300 hover:bg-slate-400'
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
