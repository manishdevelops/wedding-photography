import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'

const navigation = [
    { name: 'About Us', href: '/about-us' },
    { name: 'Gallery', href: '/gallery' },
    { name: 'Services', href: '/services' },
    { name: 'Contact Us', href: '/contact-us' },
    { name: 'Social Media', href: '/social-media' },
]

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

export default function Header() {
    const [menuOpen, setMenuOpen] = useState(false)

    return (
        <nav className="bg-white shadow-md">
            <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
                <div className="relative flex h-16 items-center justify-between">
                    <div className="flex flex-1 items-center justify-between sm:items-stretch sm:justify-between">
                        <div className="flex items-center sm:hidden">
                            {/* Mobile menu button */}
                            <button
                                onClick={() => setMenuOpen(!menuOpen)}
                                className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                            >
                                {menuOpen ? (
                                    <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                                ) : (
                                    <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                                )}
                            </button>
                        </div>
                        <div className="flex flex-shrink-0 items-center">
                            <Link to='/'>
                                <img className="w-32 h-12" src="https://www.pngarts.com/files/3/Wedding-PNG-High-Quality-Image.png" alt="logo" />
                            </Link>
                        </div>
                        <div className="hidden sm:ml-6 sm:block">
                            <div className="flex space-x-4">
                                {navigation.map((item) => (
                                    <Link
                                        key={item.name}
                                        to={item.href}
                                        className={classNames(
                                            'text-gray-500 hover:text-gray-900',
                                            'rounded-md px-3 py-2 text-sm font-medium'
                                        )}
                                    >
                                        {item.name}
                                    </Link>
                                ))}
                            </div>
                        </div>
                        <div className="flex items-center space-x-4">
                            <Link to='/book-consultation' className='text-white bg-pink-500 hover:bg-pink-700 rounded-md px-3 py-2 text-sm font-bold'>
                                Book a Consultation
                            </Link>
                        </div>
                    </div>
                </div>
            </div>

            {
                menuOpen && (
                    <div className="sm:hidden">
                        <div className="space-y-1 px-2 pb-3 pt-2">
                            {navigation.map((item) => (
                                <Link
                                    key={item.name}
                                    to={item.href}
                                    className={classNames(
                                        'text-gray-700 block rounded-md px-3 py-2 text-base font-bold'
                                    )}
                                    onClick={() => setMenuOpen(false)}
                                >
                                    {item.name}
                                </Link>
                            ))}
                        </div>
                    </div>
                )
            }
        </nav >
    )
}