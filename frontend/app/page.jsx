'use client'

import { useEffect } from 'react'
import Hero from '@/components/Hero'
import Features from '@/components/Features'
import TelegramFirst from '@/components/TelegramFirst'
import QuickLinks from '@/components/QuickLinks'

export default function Home() {
  useEffect(() => {
    // Subtle parallax glow following cursor
    const body = document.body
    let raf = null
    function move(e) {
      const x = (e.clientX / window.innerWidth) * 100
      const y = (e.clientY / window.innerHeight) * 100
      if (raf) cancelAnimationFrame(raf)
      raf = requestAnimationFrame(() => {
        body.style.background = `
          radial-gradient(1200px 600px at ${x}% ${y - 10}% , rgba(123,108,255,0.18), transparent 60%),
          radial-gradient(900px 500px at ${Math.max(0, x - 60)}% 30%, rgba(0,194,255,0.14), transparent 60%),
          linear-gradient(180deg, #07090e, #0e1422 60%, #0b0f18)
        `
      })
    }
    const media = window.matchMedia('(prefers-reduced-motion: reduce)')
    if (!media.matches) {
      window.addEventListener('mousemove', move)
    }

    return () => {
      if (!media.matches) {
        window.removeEventListener('mousemove', move)
      }
    }
  }, [])

  return (
    <>
      <Hero />
      <Features />
      <TelegramFirst />
      <QuickLinks />
    </>
  )
}

