/* eslint-disable react-hooks/exhaustive-deps */
'use client'
import { useState, useEffect, Fragment } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { useRouter, usePathname } from 'next/navigation'
import Link from 'next/link'
import { useAppContext } from '../../contexts/AppContext'
import Image from 'next/image'
import classNames from '@/utils/classNames'
import { AiOutlineMenu, AiOutlineArrowLeft, AiOutlineDashboard, AiOutlineUser } from 'react-icons/ai'
import { TbReportAnalytics } from 'react-icons/tb'
import { RiOrganizationChart } from 'react-icons/ri'
import { CgSpinnerTwo } from 'react-icons/cg'
import { AiOutlinePlus } from 'react-icons/ai'

export default function UserLayout({ children, minimal = false, heading }) {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [activeTab, setActiveTab] = useState('Dashboard')
  const { loading, user, logout } = useAppContext()
  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    if (!loading && !user) {
      router.push('/login')
    }
  }, [loading, user])

  const iconStyle = "text-xl mr-4"
  const userNavigation = [
    { icon: <AiOutlineDashboard className={iconStyle} />, name: 'Dashboard', href: '/dashboard', current: pathname.includes('dashboard') },
    { icon: <TbReportAnalytics className={iconStyle} />, name: 'Logs', href: '/logs', current: pathname.includes('logs') },
  ]

  return (
    <div className="w-[100vw] h-[100vh] bg-gray-100">
      {
        loading || !user
          ? <div className="w-full h-full flex items-center justify-center bg-gray-100">
            <span className="animate-spin w-24 h-24 flex items-center justify-center">
              <CgSpinnerTwo className="text-8xl text-slate-600 animate-spin" />
            </span>
          </div>
          : <div className="min-w-[100vw] h-full">
            {
              !minimal ? (
                <div>
                  <Transition.Root show={sidebarOpen} as={Fragment}>
                    <Dialog as="div" className="relative z-40 md:hidden" onClose={setSidebarOpen}>
                      <Transition.Child
                        as={Fragment}
                        enter="transition-opacity ease-linear duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="transition-opacity ease-linear duration-300"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                      >
                        <div className="fixed inset-0 bg-gray-600 bg-opacity-75" />
                      </Transition.Child>

                      <div className="fixed inset-0 z-40 flex">
                        <Transition.Child
                          as={Fragment}
                          enter="transition ease-in-out duration-300 transform"
                          enterFrom="-translate-x-full"
                          enterTo="translate-x-0"
                          leave="transition ease-in-out duration-300 transform"
                          leaveFrom="translate-x-0"
                          leaveTo="-translate-x-full"
                        >
                          <Dialog.Panel className="relative flex w-full max-w-xs flex-1 flex-col bg-white">
                            <Transition.Child
                              as={Fragment}
                              enter="ease-in-out duration-300"
                              enterFrom="opacity-0"
                              enterTo="opacity-100"
                              leave="ease-in-out duration-300"
                              leaveFrom="opacity-100"
                              leaveTo="opacity-0"
                            >
                              <div className="absolute top-0 right-0 -mr-12 pt-2">
                                <button
                                  type="button"
                                  className="ml-1 flex h-10 w-10 items-center justify-center rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                                  onClick={() => setSidebarOpen(false)}
                                >
                                  <AiOutlineArrowLeft className="text-white text-2xl" />
                                  <span className="sr-only">Close sidebar</span>
                                </button>
                              </div>
                            </Transition.Child>
                            <div className="h-0 flex-1 overflow-y-auto pb-4">
                              <div className="flex flex-shrink-0 items-center px-4">
                              </div>
                              <nav className="mt-5 space-y-1 px-2">
                                {userNavigation.map((item) => (
                                  <a
                                    key={item.name}
                                    href={item.href}
                                    className={classNames([
                                      item.current
                                        ? 'bg-gray-100 text-gray-900'
                                        : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900',
                                      'group flex items-center px-2 py-2 text-base font-medium rounded-md'
                                    ])}
                                  >
                                    {item.name}
                                  </a>
                                ))}
                              </nav>
                            </div>
                            <div className="flex flex-shrink-0 border-t border-gray-200 p-4">
                              <Link href="#" className="group block flex-shrink-0">
                                <div className="flex items-center">
                                  <div>
                                  </div>
                                  <div className="ml-3">
                                    <p className="text-base font-medium text-gray-700 group-hover:text-gray-900">Tom Cook</p>
                                    <p className="text-sm font-medium text-gray-500 group-hover:text-gray-700">View profile</p>
                                  </div>
                                </div>
                              </Link>
                            </div>
                          </Dialog.Panel>
                        </Transition.Child>
                        <div className="w-14 flex-shrink-0" />
                      </div>
                    </Dialog>
                  </Transition.Root>

                  <div className="hidden md:fixed md:inset-y-0 md:flex md:w-64 md:flex-col">
                    <div className="flex min-h-0 flex-1 flex-col border-r border-gray-200 bg-white">
                      <div className="flex flex-1 flex-col overflow-y-auto pb-4">
                        <Link href="/dashboard" className="flex flex-shrink-0 items-center px-4 border-b border-slate-200">
                          <h3 className="text-lg font-bold py-4">Your Brand</h3>
                        </Link>
                        <nav className="mt-5 flex-1 space-y-1 bg-white px-2">
                          {userNavigation.map((item) => (
                            <Link
                              key={item.name}
                              href={item.href}
                              className={classNames([
                                item.current ? 'bg-gray-100 text-gray-900' : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900',
                                'group flex items-center px-6 py-2 text-md font-medium rounded-md'
                              ])}
                            >
                              {/* Icon iteration goes here */}
                              {item.icon}
                              {item.name}
                            </Link>
                          ))}
                        </nav>
                      </div>
                      <div className="flex flex-shrink-0 border-t border-gray-200 p-4">
                        <Link href="#" className="group block w-full flex-shrink-0">
                          <div className="flex items-center">
                            <div>
                            </div>
                            <div className="ml-3">
                              <button className='' onClick={logout}>Sign Out</button>
                            </div>
                          </div>
                        </Link>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-1 flex-col md:pl-64">
                    <div className="flex items-center justify-between sticky top-0 z-10 bg-white px-2 py-1 sm:px-4 sm:py-1 md:hidden border-b border-slate-200">
                      <button
                        type="button"
                        className="rounded-lg border border-gray-400"
                        onClick={() => setSidebarOpen(true)}
                      >
                        <AiOutlineMenu className="text-xl m-2 text-gray-500" />
                        <span className="sr-only">Open sidebar</span>
                      </button>
                      <Image src="/not-loading-dark.svg" alt="Not loading dark" width={160} height={80} />
                      <span className="w-14" />
                    </div>
                    <main className="flex-1 h-full">
                      <div className="py-6">
                        <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-8">
                          {
                            heading && (
                              <h1 className="text-2xl font-semibold text-gray-900">{heading}</h1>
                            )
                          }
                        </div>
                        <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-8">
                          <div className="py-4">
                            {children}
                          </div>
                        </div>
                      </div>
                    </main>
                  </div>
                </div>
              )
                : (
                  <div className="flex flex-col w-full border-2 border-blue-500 min-h-full">
                    <div className="bg-white w-full h-20 flex shadow-md items-center justify-center">
                      <Image src="/not-loading-dark.svg" alt="Not loading dark" width={200} height={100} />
                    </div>
                    <div className="overflow-auto w-full">
                      {children}
                    </div>

                  </div>
                )
            }
          </div>
      }
    </div>
  )
}
