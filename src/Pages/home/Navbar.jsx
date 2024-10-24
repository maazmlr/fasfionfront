import { createContext, Fragment, useEffect, useState } from "react";
import {
  Dialog,
  DialogPanel,
  Popover,
  PopoverButton,
  PopoverGroup,
  PopoverPanel,
  Tab,
  TabGroup,
  TabList,
  TabPanel,
  TabPanels,
  Transition,
  TransitionChild,
} from "@headlessui/react";
import { FaCartShopping } from "react-icons/fa6";
import { GrMenu } from "react-icons/gr";

import { NavLink } from "react-router-dom";
import logo from "../../assets/logo.png";
import turkish_east from "../../assets/t-east.jpg";
import turkish_west from "../../assets/t-west.jpg";
import tra_west from "../../assets/traditional-western.jpg";
import tra_east from "../../assets/traditional-eastern.jpg";
import tra_ring from "../../assets/ring.jpg";
import tra_mala from "../../assets/mala.jpg";
import tra_sets from "../../assets/sets.jpg";
import tra_bracelet from "../../assets/bracelet.jpg";
import tur_bracelet from "../../assets/turkish-bra.jpg";
import tur_sets from "../../assets/turkish-sets.jpg";
import tur_rings from "../../assets/turkish-rings.jpg";
import boys from "../../assets/boys.jpg";
import girls from "../../assets/girls.jpg";
import infant from "../../assets/infant.jpg";
import turkish_mala from "../../assets/turkish-mala.jpg";
const navigation = {
  categories: [
    {
      id: "women",
      name: "Women",
      featured: [
        {
          name: "Turkish/eastern",
          href: "/women/turkish/eastern",
          imageSrc: turkish_east,
          imageAlt:
            "Models sitting back to back, wearing Basic Tee in black and bone.",
        },
        {
          name: "Turkish/western",
          href: "/women/turkish/western",
          imageSrc: turkish_west,

          imageAlt:
            "Close up of Basic Tee fall bundle with off-white, ochre, olive, and black tees.",
        },
        {
          name: "Traditional/eastern",
          href: "/women/traditional/eastern",
          imageSrc: tra_east,
          imageAlt:
            "Models sitting back to back, wearing Basic Tee in black and bone.",
        },
        {
          name: "Traditional/western",
          href: "/women/traditional/western",
          imageSrc: tra_west,
          imageAlt:
            "Close up of Basic Tee fall bundle with off-white, ochre, olive, and black tees.",
        },
      ],
    },
    {
      id: "Kids",
      name: "Kids",
      featured: [
        {
          name: "Boys",
          href: "/kids/boys",
          imageSrc: boys,
          imageAlt:
            "Models sitting back to back, wearing Basic Tee in black and bone.",
        },
        {
          name: "Girls",
          href: "/kids/girls",
          imageSrc: girls,
          imageAlt:
            "Close up of Basic Tee fall bundle with off-white, ochre, olive, and black tees.",
        },
        {
          name: "Infant",
          href: "/kids/infant",
          imageSrc: infant,
          imageAlt:
            "Close up of Basic Tee fall bundle with off-white, ochre, olive, and black tees.",
        },
      ],
    },
    {
      id: "Jewellery",
      name: "Jewellery",
      featured: [
        {
          name: "Turkish/Rings",
          href: "/jewellery/turkish/rings",
          imageSrc: tur_rings,
          imageAlt:
            "Models sitting back to back, wearing Basic Tee in black and bone.",
        },
        {
          name: "Turkish/Mala",
          href: "/jewellery/turkish/mala",
          imageSrc: turkish_mala,
          imageAlt:
            "Close up of Basic Tee fall bundle with off-white, ochre, olive, and black tees.",
        },
        {
          name: "Turkish/Sets",
          href: "/jewellery/turkish/sets",
          imageSrc: tur_sets,
          imageAlt:
            "Close up of Basic Tee fall bundle with off-white, ochre, olive, and black tees.",
        },
        {
          name: "Turkish/Bracelet",
          href: "/jewellery/turkish/bracelet",
          imageSrc: tur_bracelet,
          imageAlt:
            "Close up of Basic Tee fall bundle with off-white, ochre, olive, and black tees.",
        },
        {
          name: "Tradition/Rings",
          href: "/jewellery/traditional/rings",
          imageSrc: tra_ring,
          imageAlt:
            "Close up of Basic Tee fall bundle with off-white, ochre, olive, and black tees.",
        },
        {
          name: "Tradition/Mala",
          href: "/jewellery/traditional/mala",
          imageSrc: tra_mala,
          imageAlt:
            "Close up of Basic Tee fall bundle with off-white, ochre, olive, and black tees.",
        },
        {
          name: "Tradition/Sets",
          href: "/jewellery/traditional/sets",
          imageSrc: tra_sets,
          imageAlt:
            "Close up of Basic Tee fall bundle with off-white, ochre, olive, and black tees.",
        },
        {
          name: "Tradition/Bracelet",
          href: "/jewellery/traditional/rings",
          imageSrc: tra_bracelet,
          imageAlt:
            "Close up of Basic Tee fall bundle with off-white, ochre, olive, and black tees.",
        },
      ],
    },
  ],
};

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Example() {
  const [cartItems, setCartItems] = useState(0);

  useEffect(() => {
    // Function to update cart items from localStorage
    const updateCartItems = () => {
      let items = JSON.parse(localStorage.getItem("items")) || [];
      setCartItems(items.length);
    };

    // Call updateCartItems initially
    updateCartItems();

    // Poll for localStorage changes (for same-tab changes)
    const intervalId = setInterval(() => {
      updateCartItems();
    }, 1000); // Poll every second (can adjust the interval)

    // Listen for localStorage changes across different tabs/windows
    window.addEventListener("storage", updateCartItems);

    // Clean up event listener and interval when the component unmounts
    return () => {
      clearInterval(intervalId);
      window.removeEventListener("storage", updateCartItems);
    };
  }, []);
  const [open, setOpen] = useState(false);

  const closeMenu = () => setOpen(false);

  return (
    <div className="bg-white">
      {/* Mobile menu */}
      <Transition show={open}>
        <Dialog className="relative z-40 lg:hidden" onClose={setOpen}>
          <TransitionChild
            enter="transition-opacity ease-linear duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity ease-linear duration-300"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </TransitionChild>

          <div className="fixed inset-0 z-40 flex">
            <TransitionChild
              enter="transition ease-in-out duration-300 transform"
              enterFrom="-translate-x-full"
              enterTo="translate-x-0"
              leave="transition ease-in-out duration-300 transform"
              leaveFrom="translate-x-0"
              leaveTo="-translate-x-full"
            >
              <DialogPanel className="relative flex w-full max-w-xs flex-col overflow-y-auto bg-white pb-12 shadow-xl">
                <div className="flex px-4 pb-2 pt-5">
                  <button
                    type="button"
                    className="relative -m-2 inline-flex items-center justify-center rounded-md p-2 text-gray-400"
                    onClick={() => setOpen(false)}
                  >
                    <span className="absolute -inset-0.5" />
                    <span className="sr-only">Close menu</span>
                    {/* <XMarkIcon className="h-6 w-6" aria-hidden="true" /> */}
                  </button>
                </div>

                {/* Links */}
                <TabGroup className="mt-2">
                  <div className="border-b border-gray-200">
                    <TabList className="-mb-px flex  space-x-8 mt-5 px-4">
                      {navigation.categories.map((category) => (
                        <Tab
                          key={category.name}
                          className={({ selected }) =>
                            classNames(
                              selected
                                ? "border-indigo-600 text-indigo-600"
                                : "border-transparent text-gray-900",
                              "flex-1 whitespace-nowrap border-b-2 px-1 py-4 text-base font-medium"
                            )
                          }
                        >
                          {category.name}
                        </Tab>
                      ))}
                    </TabList>
                  </div>
                  <TabPanels as={Fragment}>
                    {navigation.categories.map((category) => (
                      <TabPanel
                        key={category.name}
                        className="space-y-10 px-4 pb-8 pt-10"
                      >
                        <div className="grid grid-cols-2 gap-x-4">
                          {category.featured.map((item) => (
                            <div
                              key={item.name}
                              className="group relative text-sm mb-4"
                            >
                              <div className="aspect-h-1 aspect-w-1 overflow-hidden rounded-lg bg-gray-100 group-hover:opacity-75">
                                <img
                                  src={item.imageSrc}
                                  alt={item.imageAlt}
                                  className="object-cover object-center"
                                />
                              </div>
                              <NavLink
                                to={item.href}
                                className="mt-6 block font-medium text-gray-900"
                                onClick={closeMenu}
                              >
                                <span
                                  className="absolute inset-0 z-10"
                                  aria-hidden="true"
                                />
                                {item.name}
                              </NavLink>
                              <p aria-hidden="true" className="mt-1">
                                Shop now
                              </p>
                            </div>
                          ))}
                        </div>
                      </TabPanel>
                    ))}
                  </TabPanels>
                </TabGroup>
              </DialogPanel>
            </TransitionChild>
          </div>
        </Dialog>
      </Transition>

      <header className="relative bg-white z-50">
        <nav
          aria-label="Top"
          className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8"
        >
          <div className="border-b border-gray-200">
            <div className="flex  h-16 items-center">
              <button
                type="button"
                className="relative rounded-md bg-white p-2 text-gray-400 lg:hidden"
                onClick={() => setOpen(true)}
              >
                <span className="absolute -inset-0.5" />
                <span className="sr-only">Open menu</span>
                <GrMenu />
              </button>

              {/* Logo */}
              <div className="flex flex-1  lg:flex-none justify-center lg:justify-start">
                <NavLink to={"/"}>
                  <span className="sr-only">Your Company</span>
                  <img className="h-16 w-auto " src={logo} alt="Company Logo" />
                </NavLink>
              </div>

              {/* Flyout menus */}
              <PopoverGroup className="hidden lg:ml-8 lg:block lg:self-stretch">
                <div className="flex h-full mx-auto space-x-8">
                  {navigation.categories.map((category) => (
                    <Popover key={category.name} className="flex">
                      {({ open }) => (
                        <>
                          <div className="relative flex">
                            <PopoverButton
                              className={classNames(
                                open
                                  ? "border-indigo-600 text-indigo-600"
                                  : "border-transparent text-gray-700 hover:text-gray-800",
                                "relative z-20 -mb-px flex items-center border-b-2 pt-px text-sm font-medium transition-colors duration-200 ease-out"
                              )}
                            >
                              {category.name}
                            </PopoverButton>
                          </div>

                          <Transition
                            enter="transition ease-out duration-200"
                            enterFrom="opacity-0"
                            enterTo="opacity-100"
                            leave="transition ease-in duration-150"
                            leaveFrom="opacity-100"
                            leaveTo="opacity-0"
                          >
                            <PopoverPanel className="absolute inset-x-0 top-full text-sm text-gray-500 z-30">
                              {/* Presentational element used to render the bottom shadow, if we put the shadow on the actual panel it pokes out the top, so we use this shorter element to hide the top of the shadow */}
                              <div
                                className="absolute inset-0 top-1/2 bg-white shadow"
                                aria-hidden="true"
                              />

                              <div className="relative bg-white">
                                <div className="mx-auto max-w-7xl px-8">
                                  <div className="grid grid-cols-2 gap-x-8 gap-y-10 py-16 right-12">
                                    <div className="col-start-12 grid grid-cols-4  gap-x-8">
                                      {category.featured.map((item) => (
                                        <div
                                          key={item.name}
                                          className="group relative text-base sm:text-sm"
                                        >
                                          <div className="aspect-h-1 object-contain aspect-w-1 overflow-hidden rounded-lg bg-gray-100 group-hover:opacity-75">
                                            <img
                                              src={item.imageSrc}
                                              alt={item.imageAlt}
                                              className="object-cover h-48 object-center"
                                            />
                                          </div>
                                          <a
                                            href={item.href}
                                            className="mt-6 block font-medium text-gray-900"
                                          >
                                            <span
                                              className="absolute inset-0 z-10"
                                              aria-hidden="true"
                                            />
                                            {item.name}
                                          </a>
                                          <p
                                            aria-hidden="true"
                                            className="mt-1"
                                          >
                                            Shop now
                                          </p>
                                        </div>
                                      ))}
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </PopoverPanel>
                          </Transition>
                        </>
                      )}
                    </Popover>
                  ))}
                </div>
              </PopoverGroup>

              <div className="ml-auto flex items-center">
                {/* Search */}

                {/* Cart */}
                <div className="ml-4 flow-root lg:ml-6 relative">
                  <NavLink
                    to={"/cart"}
                    className="group -m-2 flex items-center p-2"
                  >
                    <FaCartShopping className="relative" />
                    <span className="sr-only">items in cart, view bag</span>

                    {/* Product Count Badge */}
                    <span className="absolute top-0 right-0 translate-x-1/2 -translate-y-1/2 bg-red-500 text-white rounded-full text-xs w-5 h-5 flex items-center justify-center">
                      {cartItems}
                    </span>
                  </NavLink>
                </div>
              </div>
            </div>
          </div>
        </nav>
      </header>
    </div>
  );
}
