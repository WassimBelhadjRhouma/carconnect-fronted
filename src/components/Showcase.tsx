export default function Showscase() {
  return (
    <div className="flex-1 relative w-full h-full">
      <img
        alt=""
        src="./cover.jpg"
        className="absolute inset-0 w-full size-full object-cover"
      />
      <div className="flex mb-9 items-center h-full text-base lg:text-5xl md:text-base sm:text-xl text-center justify-center absolute font-bold inset-0 bg-black bg-opacity-60 z-10">
        <div className="mb-9 space-y-7">
          <h1 className="text-white ">RENT A CAR</h1>
          <h1 className="text-gray-900 bg-gray-100 px-6 py-2 rounded-3xl bg-opacity-40  ">
            SHARE YOURS{" "}
          </h1>
        </div>
      </div>
    </div>
  );
}
