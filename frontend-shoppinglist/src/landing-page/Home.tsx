import Header from './Header'
import Hero from './Hero'
import Features from './Features'
import Screenshots from './Screenshots'
import WhyChoose from './WhyChoose'
import CTA from './CTA'
import Footer from './Footer'

export default function Home() {
  return (
    <div className="min-h-screen bg-appBg text-textPrimary">
      <Header />
      <main>
        <Hero />
        <Features />
        <Screenshots />
        <WhyChoose />
        <CTA />
      </main>
      <Footer />
    </div>
  )
}
