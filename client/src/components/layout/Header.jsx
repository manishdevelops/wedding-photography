import { Fragment } from 'react'
import { Disclosure, Menu, Transition } from '@headlessui/react'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
import { Link } from 'react-router-dom';
// import { useSelector } from 'react-redux';
import { FaArrowRightLong } from "react-icons/fa6";

const navigation = [
    // { name: 'Home', href: '/home' },
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

    // const { currentUser } = useSelector(state => state.user);

    return (
        <Disclosure as="nav" className=" shadow-md">
            {
                ({ open }) => (
                    <>
                        <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
                            <div className="relative flex h-16 items-center justify-between">
                                <div className="absolute inset-y-0 left-0  items-center sm:hidden">
                                    {/* Mobile menu button*/}
                                    <Disclosure.Button className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white mt-[.8rem]">
                                        <span className="absolute -inset-0.5" />
                                        <span className="sr-only">Open main menu</span>
                                        {open ? (
                                            <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                                        ) : (
                                            <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                                        )}
                                    </Disclosure.Button>
                                </div>
                                <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-around">
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
                                                    to={`${item.href}`}
                                                    className={classNames(
                                                        'text-gray-500 hover:text-gray-900',
                                                        'rounded-md px-3 py-2 text-sm font-medium'
                                                    )}
                                                    aria-current={item.current ? 'page' : undefined}
                                                >
                                                    {item.name}
                                                </Link>
                                            ))}
                                        </div>
                                    </div>
                                    <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                                        <button
                                            type="button"
                                            className="relative rounded-full  p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                                        >
                                        </button>

                                        {/* Profile dropdown */}
                                        <Menu as="div" className="relative ml-3">
                                            <div >
                                                {/* {
                                            currentUser ?
                                             (
                                                <Menu.Button className="relative flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                                                    <span className="absolute -inset-1.5" />
                                                    <span className="sr-only">Open user menu</span>
                                                    <img
                                                        className="h-8 w-8 rounded-full"
                                                        src={currentUser.photo}
                                                        alt=""
                                                    />
                                                </Menu.Button>
                                            ) : (
                                                <Link to='/sign-in' className='text-slate-50 uppercase '>Sign In <FaArrowRightLong className='inline' /></Link>
                                            )
                                        } */}
                                                <Link to='sign-in' className='text-gray-500 hover:text-gray-900
                                                        rounded-md px-3 py-2 text-sm font-bold' >Sign In <FaArrowRightLong className='inline' /></Link>
                                            </div>
                                            <Transition
                                                as={Fragment}
                                                enter="transition ease-out duration-100"
                                                enterFrom="transform opacity-0 scale-95"
                                                enterTo="transform opacity-100 scale-100"
                                                leave="transition ease-in duration-75"
                                                leaveFrom="transform opacity-100 scale-100"
                                                leaveTo="transform opacity-0 scale-95"
                                            >
                                                <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                                                    <Menu.Item>
                                                        {({ active }) => (
                                                            <Link
                                                                to='/profile'
                                                                className={classNames(active ? 'bg-gray-100 font-bold' : '', 'block px-4 py-2 text-sm text-gray-700 font-bold')}
                                                            >
                                                                Your Profile
                                                            </Link>
                                                        )}

                                                    </Menu.Item>
                                                    {/* {
                                                currentUser?.role === 'admin' && (
                                                    <Menu.Item>
                                                        {({ active }) => (
                                                            <Link
                                                                to='/dashboard'
                                                                className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700 font-semibold')}
                                                            >
                                                                Dashboard
                                                            </Link>
                                                        )}

                                                    </Menu.Item>
                                                )
                                            } */}

                                                </Menu.Items>
                                            </Transition>
                                        </Menu>
                                    </div>
                                </div>

                            </div>
                        </div>

                        <Disclosure.Panel className="sm:hidden">
                            <div className="space-y-1 px-2 pb-3 pt-2">
                                {navigation.map((item) => (
                                    <Disclosure.Button
                                        key={item.name}
                                        as="a"
                                        href={item.href}
                                        className={classNames(
                                            item.current ? 'text-gray-900 font-bold' : 'text-gray-700 ',
                                            item.current ? 'text-gray-900 font-bold' : 'text-gray-700 ',
                                            'block rounded-md px-3 py-2 text-base font-bold'
                                        )}
                                        aria-current={item.current ? 'page' : undefined}
                                    >
                                        {item.name}
                                    </Disclosure.Button>
                                ))}
                            </div>
                        </Disclosure.Panel>
                    </>
                )
            }

        </Disclosure >
    )
}