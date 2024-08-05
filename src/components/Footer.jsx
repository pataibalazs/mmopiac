import { Link } from 'react-router-dom';

const navigation = {
  main: [
    { name: 'Vásárolj', href: '/' },
    { name: 'Adj el nekünk', href: '/selltous' },
    { name: 'Értékelések', href: '/reviews' },
    { name: 'Kontakt', href: '/contact' },
    { name: 'Rólunk', href: '/about' }
  ]
}

export default function Footer() {
  return (
    <footer className="bg-gray-100">
      <div className="mx-auto max-w-7xl overflow-hidden px-6 py-20 sm:py-24 lg:px-8">
        <nav aria-label="Footer" className="-mb-6 columns-2 sm:flex sm:justify-center sm:space-x-12">
          {navigation.main.map((item) => (
            <div key={item.name} className="pb-6">
              <Link to={item.href} className="text-sm leading-6 text-gray-600 hover:text-gray-900">
                {item.name}
              </Link>
            </div>
          ))}
        </nav>
        <div className="flex justify-center space-x-10">
          <img
            className="h-14 mt-10 w-auto"
            src="/logo_without_bg.png"
            alt="Logo"
          />
        </div>
        <p className="mt-10 text-center text-xs leading-5 text-gray-500">
          &copy; 2024 MMOPIAC, Kft. Minden jog fenntartva.
        </p>
      </div>
    </footer>
  )
}
