import { Fragment } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Disclosure, Menu, Transition } from '@headlessui/react';
import { Bars3Icon, BellIcon, XMarkIcon } from '@heroicons/react/24/outline';
import { useAuth } from '../../contexts/AuthContext';
import ThemeToggle from '../ThemeToggle';

interface NavbarProps {
  userType: 'student' | 'admin';
  userName: string;
}

const navigation = [
  { name: 'Dashboard', href: '/', current: true },
  { name: 'Members', href: '/members', current: false },
  { name: 'Events', href: '/events', current: false },
  { name: 'Resources', href: '/resources', current: false },
  { name: 'Forums', href: '/forums', current: false },
];

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ');
}

const Navbar = ({ userType, userName }: NavbarProps) => {
  const { logout } = useAuth();
  const navigate = useNavigate();
  
  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error('Failed to logout', error);
    }
  };

  const userInitials = userName.split(' ').map(n => n[0]).join('').toUpperCase();
  const userEmail = 'member@ypguild.org';

  return (
    <Disclosure as="nav" className="bg-dark-700 shadow-md">
      {({ open }) => (
        <>
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex h-16 items-center justify-between">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <Link to="/" className="flex items-center">
                    <span className="text-white font-bold text-xl">YPG Portal</span>
                  </Link>
                </div>
                <div className="hidden md:block">
                  <div className="ml-10 flex items-baseline space-x-4">
                    {userType === 'student' ? (
                      <>
                        <Link
                          to="/dashboard"
                          className={classNames(
                            navigation[0].current
                              ? 'bg-purple-700 text-white'
                              : 'text-gray-300 hover:bg-dark-600 hover:text-white',
                            'rounded-md px-3 py-2 text-sm font-medium'
                          )}
                          aria-current={navigation[0].current ? 'page' : undefined}
                        >
                          {navigation[0].name}
                        </Link>
                        <Link
                          to="/portfolio"
                          className={classNames(
                            navigation[1].current
                              ? 'bg-purple-700 text-white'
                              : 'text-gray-300 hover:bg-dark-600 hover:text-white',
                            'rounded-md px-3 py-2 text-sm font-medium'
                          )}
                          aria-current={navigation[1].current ? 'page' : undefined}
                        >
                          {navigation[1].name}
                        </Link>
                        <Link
                          to="/careers"
                          className={classNames(
                            navigation[2].current
                              ? 'bg-purple-700 text-white'
                              : 'text-gray-300 hover:bg-dark-600 hover:text-white',
                            'rounded-md px-3 py-2 text-sm font-medium'
                          )}
                          aria-current={navigation[2].current ? 'page' : undefined}
                        >
                          {navigation[2].name}
                        </Link>
                        <Link
                          to="/profile"
                          className={classNames(
                            navigation[3].current
                              ? 'bg-purple-700 text-white'
                              : 'text-gray-300 hover:bg-dark-600 hover:text-white',
                            'rounded-md px-3 py-2 text-sm font-medium'
                          )}
                          aria-current={navigation[3].current ? 'page' : undefined}
                        >
                          {navigation[3].name}
                        </Link>
                      </>
                    ) : (
                      <>
                        <Link
                          to="/admin/dashboard"
                          className={classNames(
                            navigation[0].current
                              ? 'bg-purple-700 text-white'
                              : 'text-gray-300 hover:bg-dark-600 hover:text-white',
                            'rounded-md px-3 py-2 text-sm font-medium'
                          )}
                          aria-current={navigation[0].current ? 'page' : undefined}
                        >
                          {navigation[0].name}
                        </Link>
                        <Link
                          to="/admin/users"
                          className={classNames(
                            navigation[1].current
                              ? 'bg-purple-700 text-white'
                              : 'text-gray-300 hover:bg-dark-600 hover:text-white',
                            'rounded-md px-3 py-2 text-sm font-medium'
                          )}
                          aria-current={navigation[1].current ? 'page' : undefined}
                        >
                          {navigation[1].name}
                        </Link>
                        <Link
                          to="/admin/content"
                          className={classNames(
                            navigation[2].current
                              ? 'bg-purple-700 text-white'
                              : 'text-gray-300 hover:bg-dark-600 hover:text-white',
                            'rounded-md px-3 py-2 text-sm font-medium'
                          )}
                          aria-current={navigation[2].current ? 'page' : undefined}
                        >
                          {navigation[2].name}
                        </Link>
                        <Link
                          to="/admin/export"
                          className={classNames(
                            navigation[3].current
                              ? 'bg-purple-700 text-white'
                              : 'text-gray-300 hover:bg-dark-600 hover:text-white',
                            'rounded-md px-3 py-2 text-sm font-medium'
                          )}
                          aria-current={navigation[3].current ? 'page' : undefined}
                        >
                          {navigation[3].name}
                        </Link>
                      </>
                    )}
                  </div>
                </div>
              </div>
              <div className="hidden md:block">
                <div className="ml-4 flex items-center md:ml-6">
                  {/* Theme Toggle */}
                  <ThemeToggle className="mr-2 bg-dark-600 text-gray-300 hover:text-white" />
                  
                  <button
                    type="button"
                    className="relative rounded-full bg-dark-600 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-dark-700"
                  >
                    <span className="absolute -inset-1.5" />
                    <span className="sr-only">View notifications</span>
                    <BellIcon className="h-6 w-6" aria-hidden="true" />
                  </button>

                  {/* Profile dropdown */}
                  <Menu as="div" className="relative ml-3">
                    <div>
                      <Menu.Button className="relative flex max-w-xs items-center rounded-full bg-dark-600 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-dark-700">
                        <span className="absolute -inset-1.5" />
                        <span className="sr-only">Open user menu</span>
                        <div className="h-8 w-8 rounded-full bg-purple-600 flex items-center justify-center text-white font-medium">
                          {userInitials}
                        </div>
                      </Menu.Button>
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
                      <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-dark-700 py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                        <Menu.Item>
                          {({ active }) => (
                            <Link
                              to="/profile"
                              className={classNames(
                                active ? 'bg-dark-600' : '',
                                'block px-4 py-2 text-sm text-gray-300'
                              )}
                            >
                              Your Profile
                            </Link>
                          )}
                        </Menu.Item>
                        <Menu.Item>
                          {({ active }) => (
                            <Link
                              to="/settings"
                              className={classNames(
                                active ? 'bg-dark-600' : '',
                                'block px-4 py-2 text-sm text-gray-300'
                              )}
                            >
                              Settings
                            </Link>
                          )}
                        </Menu.Item>
                        <Menu.Item>
                          {({ active }) => (
                            <button
                              onClick={handleLogout}
                              className={classNames(
                                active ? 'bg-dark-600' : '',
                                'block w-full text-left px-4 py-2 text-sm text-gray-300'
                              )}
                            >
                              Sign out
                            </button>
                          )}
                        </Menu.Item>
                      </Menu.Items>
                    </Transition>
                  </Menu>
                </div>
              </div>
              <div className="-mr-2 flex md:hidden">
                {/* Mobile menu button */}
                <Disclosure.Button className="relative inline-flex items-center justify-center rounded-md bg-dark-600 p-2 text-gray-400 hover:bg-dark-500 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-dark-700">
                  <span className="absolute -inset-0.5" />
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>
            </div>
          </div>

          <Disclosure.Panel className="md:hidden">
            <div className="space-y-1 px-2 pb-3 pt-2 sm:px-3">
              {userType === 'student' ? (
                <>
                  <Disclosure.Button
                    as="a"
                    href="/dashboard"
                    className={classNames(
                      navigation[0].current ? 'bg-purple-700 text-white' : 'text-gray-300 hover:bg-dark-600 hover:text-white',
                      'block rounded-md px-3 py-2 text-base font-medium'
                    )}
                    aria-current={navigation[0].current ? 'page' : undefined}
                  >
                    {navigation[0].name}
                  </Disclosure.Button>
                  <Disclosure.Button
                    as="a"
                    href="/portfolio"
                    className={classNames(
                      navigation[1].current ? 'bg-purple-700 text-white' : 'text-gray-300 hover:bg-dark-600 hover:text-white',
                      'block rounded-md px-3 py-2 text-base font-medium'
                    )}
                    aria-current={navigation[1].current ? 'page' : undefined}
                  >
                    {navigation[1].name}
                  </Disclosure.Button>
                  <Disclosure.Button
                    as="a"
                    href="/careers"
                    className={classNames(
                      navigation[2].current ? 'bg-purple-700 text-white' : 'text-gray-300 hover:bg-dark-600 hover:text-white',
                      'block rounded-md px-3 py-2 text-base font-medium'
                    )}
                    aria-current={navigation[2].current ? 'page' : undefined}
                  >
                    {navigation[2].name}
                  </Disclosure.Button>
                  <Disclosure.Button
                    as="a"
                    href="/profile"
                    className={classNames(
                      navigation[3].current ? 'bg-purple-700 text-white' : 'text-gray-300 hover:bg-dark-600 hover:text-white',
                      'block rounded-md px-3 py-2 text-base font-medium'
                    )}
                    aria-current={navigation[3].current ? 'page' : undefined}
                  >
                    {navigation[3].name}
                  </Disclosure.Button>
                </>
              ) : (
                <>
                  <Disclosure.Button
                    as="a"
                    href="/admin/dashboard"
                    className={classNames(
                      navigation[0].current ? 'bg-purple-700 text-white' : 'text-gray-300 hover:bg-dark-600 hover:text-white',
                      'block rounded-md px-3 py-2 text-base font-medium'
                    )}
                    aria-current={navigation[0].current ? 'page' : undefined}
                  >
                    {navigation[0].name}
                  </Disclosure.Button>
                  <Disclosure.Button
                    as="a"
                    href="/admin/users"
                    className={classNames(
                      navigation[1].current ? 'bg-purple-700 text-white' : 'text-gray-300 hover:bg-dark-600 hover:text-white',
                      'block rounded-md px-3 py-2 text-base font-medium'
                    )}
                    aria-current={navigation[1].current ? 'page' : undefined}
                  >
                    {navigation[1].name}
                  </Disclosure.Button>
                  <Disclosure.Button
                    as="a"
                    href="/admin/content"
                    className={classNames(
                      navigation[2].current ? 'bg-purple-700 text-white' : 'text-gray-300 hover:bg-dark-600 hover:text-white',
                      'block rounded-md px-3 py-2 text-base font-medium'
                    )}
                    aria-current={navigation[2].current ? 'page' : undefined}
                  >
                    {navigation[2].name}
                  </Disclosure.Button>
                  <Disclosure.Button
                    as="a"
                    href="/admin/export"
                    className={classNames(
                      navigation[3].current ? 'bg-purple-700 text-white' : 'text-gray-300 hover:bg-dark-600 hover:text-white',
                      'block rounded-md px-3 py-2 text-base font-medium'
                    )}
                    aria-current={navigation[3].current ? 'page' : undefined}
                  >
                    {navigation[3].name}
                  </Disclosure.Button>
                </>
              )}
            </div>
            <div className="border-t border-dark-500 pb-3 pt-4">
              <div className="flex items-center px-5">
                <div className="flex-shrink-0">
                  <div className="h-10 w-10 rounded-full bg-purple-600 flex items-center justify-center text-white font-medium">
                    {userInitials}
                  </div>
                </div>
                <div className="ml-3">
                  <div className="text-base font-medium text-white">{userName}</div>
                  <div className="text-sm font-medium text-gray-400">{userEmail}</div>
                </div>
                <button
                  type="button"
                  className="relative ml-auto flex-shrink-0 rounded-full bg-dark-600 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-dark-700"
                >
                  <span className="absolute -inset-1.5" />
                  <span className="sr-only">View notifications</span>
                  <BellIcon className="h-6 w-6" aria-hidden="true" />
                </button>
              </div>
              <div className="mt-3 space-y-1 px-2">
                <Disclosure.Button
                  as="a"
                  href="/profile"
                  className="block rounded-md px-3 py-2 text-base font-medium text-gray-300 hover:bg-dark-600 hover:text-white"
                >
                  Your Profile
                </Disclosure.Button>
                <Disclosure.Button
                  as="a"
                  href="/settings"
                  className="block rounded-md px-3 py-2 text-base font-medium text-gray-300 hover:bg-dark-600 hover:text-white"
                >
                  Settings
                </Disclosure.Button>
                <Disclosure.Button
                  as="button"
                  onClick={handleLogout}
                  className="block rounded-md px-3 py-2 text-base font-medium text-gray-300 hover:bg-dark-600 hover:text-white w-full text-left"
                >
                  Sign out
                </Disclosure.Button>
              </div>
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
};

export default Navbar; 