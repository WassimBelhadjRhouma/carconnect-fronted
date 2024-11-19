import { useState } from 'react'
import {Disclosure,
  DisclosureButton,
  DisclosurePanel} from '@headlessui/react'
import {StarIcon, PlusIcon} from '@heroicons/react/20/solid'
import classNames from 'classnames'


const products = [
  {
    id: 1,
    name: 'Organize Basic Set (Walnut)',
    price: '$149',
    rating: 5,
    reviewCount: 38,
    imageSrc: "/img1.jpg",
    imageAlt: 'TODO',
    href: '#',
  },
  {
    id: 2,
    name: 'Organize Pen Holder',
    price: '$15',
    rating: 5,
    reviewCount: 18,
    imageSrc: '/img2.jpg',
    imageAlt: 'TODO',
    href: '#',
  },
  {
    id: 3,
    name: 'Organize Sticky Note Holder',
    price: '$15',
    rating: 5,
    reviewCount: 14,
    imageSrc: "/img3.jpg",
    imageAlt: 'TODO',
    href: '#',
  }
  // More products...
]


export default function Listings() {
 
  
  return (
    <div className="bg-white">
      {/* Mobile menu */}
  

 

      <main className="pb-24">
        <div className="px-4 py-16 text-center sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900">My cars</h1>
          <p className="mx-auto mt-4 max-w-xl text-base text-gray-500">
            What's the secret to a nice trip? 
          </p>
        </div>

        {/* Product grid */}
        <section aria-labelledby="products-heading" className="mx-auto max-w-7xl overflow-hidden sm:px-6 lg:px-8">
          <h2 id="products-heading" className="sr-only">
            Products
          </h2>

          <div className="-mx-px grid grid-cols-2 border-l border-gray-200 sm:mx-0 md:grid-cols-3 lg:grid-cols-4">
            {products.map((product) => (
              <div key={product.id} className="group relative border-b border-r border-gray-200 p-4 sm:p-6">
                <img
                  alt={product.imageAlt}
                  src={product.imageSrc}
                  className="aspect-square rounded-lg bg-gray-200 object-cover group-hover:opacity-75"
                />
                <div className="pb-4 pt-10 text-center">
                  <h3 className="text-sm font-medium text-gray-900">
                    <a href={product.href}>
                      <span aria-hidden="true" className="absolute inset-0" />
                      {product.name}
                    </a>
                  </h3>
                  <div className="mt-3 flex flex-col items-center">
                    <p className="sr-only">{product.rating} out of 5 stars</p>
                    <div className="flex items-center">
                      {[0, 1, 2, 3, 4].map((rating) => (
                        <StarIcon
                          key={rating}
                          aria-hidden="true"
                          className={classNames(
                            product.rating > rating ? 'text-yellow-400' : 'text-gray-200',
                            'size-5 shrink-0',
                          )}
                        />
                      ))}
                    </div>
                    <p className="mt-1 text-sm text-gray-500">{product.reviewCount} reviews</p>
                  </div>
                  <p className="mt-4 text-base font-medium text-gray-900">{product.price}</p>
                  <button
        type="button"
        className="inline-flex mt-3 items-center gap-x-2 rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
      >
Edit      </button>
                </div>
              </div>
            ))}
             <div className="group relative border-b border-r flex justify-center border-gray-200 p-4 sm:p-6">
             <PlusIcon
                          // key={rating}
                          aria-hidden="true"
                          className={'text-gray-400 size-100 cursor-pointer '}
                        />
                <div className="pb-4 pt-10 text-center">
                  <h3 className="text-sm font-medium text-gray-900">
  
                  </h3>
                  <div className="mt-3 flex flex-col items-center">
                  
                  </div>
                </div>
              </div>
          </div>
        </section>
      </main>
    </div>
  )
}
