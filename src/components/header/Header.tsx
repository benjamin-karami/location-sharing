'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const navs = [
  { id: 1, title: 'Home', route: '/' },
  { id: 2, title: 'Add location', route: '/location/add' },
];
export default function Header() {
  const pathname = usePathname();
  return (
    <nav className='bg-gray-800 p-4 text-white'>
      <div className='container mx-auto'>
        <div className='flex items-center justify-between'>
          <div className='space-x-4'>
            {navs.map((nav) => (
              <Link
                className={nav.route === pathname ? 'text-primary-600' : ''}
                key={`nav-${nav.id}`}
                href={nav.route}
              >
                {nav.title}
              </Link>
            ))}
          </div>
          <div className='text-primary-600 font-bold text-xl'>
            Location sharing app
          </div>
        </div>
      </div>
    </nav>
  );
}
