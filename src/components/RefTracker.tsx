'use client'

import { useEffect } from 'react'

export default function RefTracker() {
  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const ref = params.get('ref')
    if (ref) {
      localStorage.setItem('ref_code', ref)
      document.cookie = `ref_code=${ref};path=/;max-age=2592000;SameSite=Lax`
    }
  }, [])

  return null
}
