import { NavLink } from "react-router-dom";
import boys from "../../assets/boys.jpg";
import infant from "../../assets/infant.jpg";
import tra_east from "../../assets/traditional-eastern.jpg";

const NewColection = () => {
  return (
    <div>
      <section>
        <div className="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
          <header className="text-center">
            <h2 className="text-xl font-bold text-gray-900 sm:text-3xl">
              Popular Collection
            </h2>
          </header>

          <ul className="mt-8 grid grid-cols-1 gap-4 lg:grid-cols-3">
            <li>
              <NavLink
                to={"/women/traditional/eastern"}
                className="group relative block"
              >
                <img
                  src={tra_east}
                  alt=""
                  className="aspect-square w-full object-cover transition duration-500 group-hover:opacity-90"
                />

                <div className="absolute inset-0 flex flex-col items-start justify-end p-6">
                  <h3 className="text-xl font-medium text-white">
                    Traditional Eastern Women
                  </h3>

                  <span className="mt-1.5 inline-block bg-purple-700 px-5 py-3 text-xs font-medium uppercase tracking-wide text-white">
                    Shop Now
                  </span>
                </div>
              </NavLink>
            </li>

            <li>
              <NavLink to={"/kids/infant"} className="group relative block">
                <img
                  src={infant}
                  alt=""
                  className="aspect-square w-full object-cover transition duration-500 group-hover:opacity-90"
                />

                <div className="absolute inset-0 flex flex-col items-start justify-end p-6">
                  <h3 className="text-xl font-medium text-white">Infants</h3>

                  <span className="mt-1.5 inline-block bg-purple-700 px-5 py-3 text-xs font-medium uppercase tracking-wide text-white">
                    Shop Now
                  </span>
                </div>
              </NavLink>
            </li>

            <li className="lg:col-span-2 lg:col-start-2 lg:row-span-2 lg:row-start-1">
              <NavLink to={"/kids/boys"} className="group relative block">
                <img
                  src={boys}
                  alt=""
                  className="aspect-square w-full object-cover transition duration-500 group-hover:opacity-90"
                />

                <div className="absolute inset-0 flex flex-col items-start justify-end p-6">
                  <h3 className="text-xl font-medium text-white">Boys</h3>

                  <span className="mt-1.5 inline-block  bg-purple-700 px-5 py-3 text-xs font-medium uppercase tracking-wide text-white">
                    Shop Now
                  </span>
                </div>
              </NavLink>
            </li>
          </ul>
        </div>
      </section>
    </div>
  );
};

export default NewColection;
