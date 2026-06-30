import React from 'react'

export default function LandingFooter(){
  return (
    <footer className="py-6 bg-white border-t">
      <div className="max-w-5xl mx-auto px-6 flex items-center justify-between text-sm text-textSecondary">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-primary rounded-md flex items-center justify-center text-white font-bold">SL</div>
          <div>© Shopping List</div>
        </div>
        <div className="flex gap-4">
          <a>Mentions légales</a>
          <a>Politique de confidentialité</a>
        </div>
      </div>
    </footer>
  )
}
