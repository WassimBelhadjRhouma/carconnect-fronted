const orders = [
  {
    number: "4376",
    status: "Delivered on January 22, 2021",
    href: "#",
    invoiceHref: "#",
    products: [
      {
        id: 1,
        name: "Machined Brass Puzzle",
        href: "#",
        price: "$95.00",
        color: "Brass",
        size: '3" x 3" x 3"',
        imageSrc: "",
        imageAlt:
          "Brass puzzle in the shape of a jack with overlapping rounded posts.",
      },
      // More products...
    ],
  },
  // More orders...
];
export default function Bookings({
  positiveButton = null,
  negativeButton = { text: "withdraw" },
}) {
  return (
    <main className="mx-auto max-w-3xl px-4 py-16 sm:px-6 sm:pb-32 sm:pt-24 lg:px-8 ">
      <div className="max-w-xl">
        <h1 className="text-3xl font-bold tracking-tight text-gray-900">
          Your Booking requests
        </h1>
        <p className="mt-2 text-sm text-gray-500">
          Check the status of recent requests and manage.
        </p>
      </div>

      <div className="mt-12 space-y-16 sm:mt-16 shadow-lg ">
        {orders.map((order) => (
          <section
            key={order.number}
            aria-labelledby={`${order.number}-heading`}
          >
            <div className="-mb-6 mt-6 flow-root divide-y divide-gray-200 ">
              {order.products.map((product) => (
                <div key={product.id} className="py-6 sm:flex">
                  <div className="flex space-x-4 sm:min-w-0 sm:flex-1 sm:space-x-6 lg:space-x-8">
                    <img
                      alt={product.imageAlt}
                      src="/img1.jpg"
                      className="size-20 flex-none rounded-md object-cover sm:size-48"
                    />
                    <div className="min-w-0 flex-1 pt-1.5 sm:pt-0">
                      <p className="mt-1 font-medium mt-4 text-gray-900 mb-4">
                        {product.price} <span className="text-xs">/5days</span>
                      </p>
                      <h1 className="text-base mb-2 font-medium text-gray-900">
                        <a href={product.href}>Reservation time:</a>
                      </h1>
                      <p className=" mb-1 text-gray-500">
                        <span className="text-gray-800"> From </span>
                        12.12.2024
                      </p>{" "}
                      <p className="text-gray-500">
                        <span className="text-gray-800"> To </span> 12.12.2024
                      </p>{" "}
                      <h4 className="text-medium mt-4 font-medium text-green-800">
                        <a href={product.href}>Status: Pending</a>
                      </h4>
                    </div>
                  </div>
                  <div className="mt-6 space-y-4 sm:ml-6 sm:mt-0 sm:w-40 sm:flex-none">
                    {positiveButton && (
                      <button
                        type="button"
                        className="flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 px-2.5 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:w-full sm:grow-0"
                      >
                        Accept
                      </button>
                    )}
                    {negativeButton && (
                      <button
                        type="button"
                        className="flex w-full items-center justify-center rounded-md border border-gray-300 bg-white px-2.5 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:w-full sm:grow-0"
                      >
                        {negativeButton.text}
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </section>
        ))}
      </div>
    </main>
  );
}
