import React from 'react'
import Hero from './Hero'
import HowItWorks from './HowItWorks'
import Why from './Why'
import LandingFooter from './Footer'

export default function Home(){
  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-primaryLight">
        <div className="max-w-5xl mx-auto px-6 py-8 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center text-white font-bold">SL</div>
            <div className="text-lg font-semibold text-textPrimary">Shopping List</div>
          </div>
          <nav className="flex items-center gap-4">
            <a className="text-textSecondary hover:text-textPrimary">Mentions</a>
            <a className="text-textSecondary hover:text-textPrimary">Confidentialité</a>
          </nav>
        </div>
      </header>

      <main className="flex-1">
        <Hero />
        <HowItWorks />
        <Why />
      </main>

      <LandingFooter />
    </div>
  )
}
