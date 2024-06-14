const ProductCard = ({ img, title, price }) => {
  console.log(img);
  return (
    <>
      <div className="group relative" style={{ fontFamily: "monospace" }}>
        <div className="aspect-h-1 border-b-2 border-purple-900  aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80">
          <img
            src={img}
            alt={"kapra"}
            className="h-full w-full object-cover object-center lg:h-full lg:w-full"
          />
        </div>
        <div className="mt-4 flex justify-between">
          <div>
            <h3 className="text-sm text-gray-700">
              <a href={""} className="text-black text-lg font-medium">
                <span aria-hidden="true" className="absolute inset-0 " />
                {title}
              </a>
            </h3>
          </div>
          <p className="text-sm font-medium p-2 bg-purple-900 rounded-md text-white">
            {price} RS
          </p>
        </div>
        {/* Base */}

        {/* Hover */}
      </div>
    </>
  );
};

export default ProductCard;
