import { Image } from "@nextui-org/react";

const ProductCard = ({ img, title, price }) => {
  console.log(img);
  return (
    <>
      <div
        className="group relative shadow-lg p-2 hover:shadow-xl transition-shadow duration-300 ease-in-out h-full"
        style={{ fontFamily: "monospace" }}
      >
        <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 ">
          <Image
            src={img}
            alt={"kapra"}
            height={840}
            className="lg:h-80 h-36"

/>
        </div>
        <div className="mt-4 flex h-20 items-center justify-between">
          <div className="truncate">
            <h3 className="text-sm text-gray-700 truncate">
              <a href={""} className="text-black text-lg font-medium truncate">
                <span aria-hidden="true" className="absolute inset-0" />
                {title}
              </a>
            </h3>
          </div>
          <p className="text-sm font-medium p-2 w-20 text-center bg-purple-900 rounded-md text-white">
            {price} RS
          </p>
        </div>
      </div>
    </>
  );
};

export default ProductCard;
