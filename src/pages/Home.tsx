import { useState } from 'react'
import {Disclosure,
  DisclosureButton,
  DisclosurePanel} from '@headlessui/react'
import {FunnelIcon, StarIcon } from '@heroicons/react/20/solid'
import classNames from 'classnames'
import { Link } from 'react-router-dom'


const filters = {
  price: [
    { value: '0', label: '$0 - $25', checked: false },
    { value: '25', label: '$25 - $50', checked: false },
    { value: '50', label: '$50 - $75', checked: false },
    { value: '75', label: '$75+', checked: false },
  ]
}

const products = [
  {
    id: 1,
    name: 'Mercedes benz',
    price: '$149',
    rating: 5,
    reviewCount: 38,
    imageSrc: "/img1.jpg",
    imageAlt: 'TODO',
    href: 'details',
  },
  {
    id: 2,
    name: 'Organize Pen Holder',
    price: '$15',
    rating: 5,
    reviewCount: 18,
    imageSrc: "/img2.jpg",
    imageAlt: 'TODO',
    href: 'details',  },
  {
    id: 3,
    name: 'Organize Sticky Note Holder',
    price: '$15',
    rating: 5,
    reviewCount: 14,
    imageSrc: "/img3.jpg",
    imageAlt: 'TODO',
    href: 'details',  }
  // More products...
]


export default function Example() {
  const [open, setOpen] = useState(false)
  const [selectedFilters, setSelectedFilters] = useState(filters);
    const [filterNumber, setFilterNumber] = useState(0)
  // Update filter selection
  const handleFilterChange = (option:any) => {
    if (!option.checked){
     setFilterNumber((oldVal) => {return oldVal + 1} )   
    } else {
        setFilterNumber((oldVal) => {
            if (oldVal > 0) return oldVal - 1
            return oldVal
        } )   

    }
    setSelectedFilters((prevFilters) => {
      const updatedFilters = { ...prevFilters };
      updatedFilters.price = updatedFilters.price.map((filter) =>
        filter.value === option.value
          ? { ...filter, checked: !filter.checked }
          : filter
      );
      return updatedFilters;
    });
};

const clearFilters = () => {
    setSelectedFilters((prevFilters) => {
        const updatedFilters = { ...prevFilters };
        updatedFilters.price = updatedFilters.price.map((filter) =>{return { ...filter, checked: false }});
        return updatedFilters;
      }); 

}

console.log(selectedFilters);
  // Simulate sending selected filters to backend
  const applyFilters = () => {
    const activeFilters = Object.entries(selectedFilters).reduce(
      (acc, [key, filters]) => {
        acc[key] = filters.filter((filter) => filter.checked).map((f) => f.value);
        return acc;
      },
      {}
    );

    console.log("Filters applied:", activeFilters);
    // Backend call can go here (e.g., fetch or axios)
  };
  
  return (
    <div className="bg-white">
      {/* Mobile menu */}
  

 

      <main className="pb-24">
        <div className="px-4 py-16 text-center sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900">Available cars</h1>
          <p className="mx-auto mt-4 max-w-xl text-base text-gray-500">
            What's the secret to a nice trip? 
          </p>
        </div>

        {/* Filters */}
        <Disclosure
          as="section"
          aria-labelledby="filter-heading"
          className="grid items-center border-b border-t border-gray-200"
        >
          <h2 id="filter-heading" className="sr-only">
            Filters
          </h2>
          <div className="relative col-start-1 row-start-1 py-4">
            <div className="mx-auto flex max-w-7xl space-x-6 divide-x divide-gray-200 px-4 text-sm sm:px-6 lg:px-8">
              <div>
                <DisclosureButton className="group flex items-center font-medium text-gray-700">
                  <FunnelIcon
                    aria-hidden="true"
                    className="mr-2 size-5 flex-none text-gray-400 group-hover:text-gray-500"
                  />
                  {filterNumber} Filters
                </DisclosureButton>
              </div>
              <div className="pl-6">
                <button type="button" className="text-gray-500" onClick={clearFilters}>
                  Clear all
                </button>
              </div>
            </div>
          </div>
          <DisclosurePanel className="border-t border-gray-200 py-10">
            <div className="mx-auto grid max-w-7xl grid-cols-2 gap-x-4 px-4 text-sm sm:px-6 md:gap-x-6 lg:px-8">
              <div className="grid auto-rows-min grid-cols-1 gap-y-10 md:grid-cols-2 md:gap-x-6">
                <fieldset>
                  <legend className="block font-medium">Price</legend>
                  <div className="space-y-6 pt-6 sm:space-y-4 sm:pt-4">
                    {selectedFilters.price.map((option, optionIdx) => (
                      <div key={option.value} className="flex items-center text-base sm:text-sm">
                        <input
                          defaultValue={option.value}
                          id={`price-${optionIdx}`}
                          name="price[]"
                          type="checkbox"
                          checked={option.checked}
                          onChange={() => handleFilterChange(option)}
                          className="size-4 shrink-0 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                        />
                        <label htmlFor={`price-${optionIdx}`} className="ml-3 min-w-0 flex-1 text-gray-600">
                          {option.label}
                        </label>
                      </div>
                    ))}
                  </div>
                </fieldset>
              </div>
              <div className="grid auto-rows-min grid-cols-1 gap-y-10 md:grid-cols-2 md:gap-x-6">
              </div>
            </div>
          </DisclosurePanel>
          <div className="col-start-1 row-start-1 py-4">
          </div>
        </Disclosure>

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
                    <Link to={product.href}>
                      <span aria-hidden="true" className="absolute inset-0" />
                      {product.name}
                    </Link>
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
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  )
}
