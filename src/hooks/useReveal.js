import { useEffect, useRef, useCallback } from 'react'

export function useReveal(deps = []) {
  const ref = useRef(null)

  const revealVisible = useCallback(() => {
    const section = ref.current
    if (!section) return
    const els = section.querySelectorAll('.reveal')
    els.forEach((el) => el.classList.add('visible'))
  }, [])

  useEffect(() => {
    const section = ref.current
    if (!section) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            revealVisible()
          }
        })
      },
      { threshold: 0.1, rootMargin: '0px 0px -60px 0px' }
    )

    observer.observe(section)
    return () => observer.disconnect()
  }, [revealVisible])

  // Re-reveal whenever deps change (e.g. tab switch renders new .reveal elements)
  useEffect(() => {
    const section = ref.current
    if (!section) return
    // Only re-reveal if section is already in viewport
    const rect = section.getBoundingClientRect()
    const inView = rect.top < window.innerHeight && rect.bottom > 0
    if (inView) {
      // Small delay to let React render new elements first
      const id = setTimeout(revealVisible, 30)
      return () => clearTimeout(id)
    }
  }, deps) // eslint-disable-line react-hooks/exhaustive-deps

  return ref
}
