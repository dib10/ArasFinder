// ArasFinder/components/domain/Footer.tsx
import Link from 'next/link'

export function Footer() {
  return (
    <footer className="mt-8 text-center py-6 border-t border-gray-200 dark:border-gray-700">
      <nav className="flex justify-center gap-4 sm:gap-6 mb-4">
        <Link href="/" className="text-sm text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-200">Home</Link>
        <Link href="/como-funciona" className="text-sm text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-200">Como Funciona</Link>
        <Link href="/faq" className="text-sm text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-200">FAQ</Link>
        <Link href="/sobre" className="text-sm text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-200">Sobre</Link>
      </nav>
    </footer>
  )
}


