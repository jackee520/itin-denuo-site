'use client'

import Link from 'next/link'
import { useState } from 'react'

const navItems = [
  { href: '/', label: '首页' },
  { href: '/itin/', label: 'ITIN代办' },
  { href: '/referral/', label: '邀请奖励' },
  { href: '/faq/', label: '常见问题' },
  { href: '/contact/', label: '联系我们' },
]

export default function Header() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <header className="bg-white/80 backdrop-blur-md sticky top-0 z-50 border-b border-gray-100">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary-500 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">德</span>
            </div>
            <span className="font-semibold text-primary-500 text-lg">德诺商务</span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-1">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="px-3 py-2 text-sm text-gray-600 hover:text-primary-500 rounded-md hover:bg-primary-50 transition-colors"
              >
                {item.label}
              </Link>
            ))}
            <Link
              href="/contact/"
              className="ml-3 px-4 py-2 bg-accent-400 text-white text-sm font-medium rounded-lg hover:bg-accent-500 transition-colors"
            >
              免费咨询
            </Link>
          </nav>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 text-gray-600 hover:text-primary-500"
            aria-label="菜单"
          >
            {isOpen ? (
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>

        {/* Mobile menu */}
        {isOpen && (
          <div className="md:hidden py-4 border-t border-gray-100">
            <nav className="flex flex-col gap-1">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className="px-3 py-2 text-gray-600 hover:text-primary-500 rounded-md hover:bg-primary-50 transition-colors"
                >
                  {item.label}
                </Link>
              ))}
              <Link
                href="/contact/"
                onClick={() => setIsOpen(false)}
                className="mt-2 px-4 py-2 bg-accent-400 text-white text-center font-medium rounded-lg hover:bg-accent-500 transition-colors"
              >
                免费咨询
              </Link>
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}
