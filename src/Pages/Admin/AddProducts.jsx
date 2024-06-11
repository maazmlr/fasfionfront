// import { Field, Form, Formik } from "formik";
// import * as Yup from "yup";
// import { Select, SelectItem, Button } from "@nextui-org/react";
// import { useState } from "react";
// import axios from "axios";
// import { url } from "../../url";

// const categories = [
//   { key: "kids", label: "Kids" },
//   { key: "women", label: "Women" },
//   { key: "jewellery", label: "Jewellery" },
// ];

// const kidsSubcategories = [
//   { key: "boys", label: "Boys" },
//   { key: "girls", label: "Girls" },
//   { key: "infant", label: "Infant" },
// ];

// const womenSubcategories = [
//   { key: "eastern", label: "Eastern" },
//   { key: "western", label: "Western" },
// ];

// const jewellerySubcategories = [
//   { key: "traditional", label: "Traditional" },
//   { key: "turkish", label: "Turkish" },
// ];
// const jewSubcategories = [
//   { key: "rings", label: "Rings" },
//   { key: "mala", label: "Mala" },
//   { key: "sets", label: "Sets" },
//   { key: "bracelet", label: "Bracelet" },
// ];

// const validationSchema = Yup.object({
//   category: Yup.string().required("Category is required"),
//   image: Yup.array()
//     .min(1, "At least one image is required")
//     .required("Image is required"),
//   subcategory: Yup.string().required("Subcategory is required"),
//   name: Yup.string().required("Product name is required"),
//   description: Yup.string().required("Description is required"),
//   price: Yup.number()
//     .required("Price is required")
//     .min(0, "Price must be positive"),
//   stock: Yup.number()
//     .required("Stock is required")
//     .min(0, "Stock must be positive"),
//   discount: Yup.number()
//     .min(0, "Discount must be between 0 and 100")
//     .max(100, "Discount must be between 0 and 100"),
//   subsubcategory: Yup.mixed()
//     .transform((value) => (value === "" ? undefined : value))
//     .when("category", {
//       is: "jewellery",
//       then: () =>
//         Yup.string().required("Subsubcategory is required for jewellery"),
//     }),
// });

// const AddProducts = () => {
//   const [item, setItem] = useState();

//   const hanldeSubmit = async (values) => {
//     try {
//       const formData = new FormData();
//       formData.append("category", values.category);
//       formData.append("description", values.description);
//       formData.append("subcategory", values.subcategory);
//       formData.append("name", values.name);
//       formData.append("price", values.price);
//       formData.append("discount", values.discount);
//       formData.append("stock", values.stock);
//       values.image.forEach((file) => {
//         formData.append("image", file); // Add each file to the FormData object
//       });        values.subsubcategory &&
//         formData.append("subsubcategory", values.subsubcategory);
//       console.log(values);
//       const response = await axios.post('http://localhost:8000/api/v1/product/add-product', formData, {
//         headers: {
//           'Content-Type': 'multipart/form-data',
//         },
//       });
//       console.log(response);
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   const initialValues = {
//     category: "",
//     subcategory: "",
//     subsubcategory: "",
//     name: "",
//     description: "",
//     price: 0,
//     stock: 0,
//     discount: 0,
//     image: [],
//   };

//   return (
//     <div className="min-h-screen p-6 bg-gray-100 flex justify-center items-center">
//       <div className="w-full max-w-2xl bg-white shadow-md rounded-lg p-8">
//         <h2 className="text-3xl font-bold mb-6 text-center text-blue-600">
//           Add Product
//         </h2>
//         <Formik
//           initialValues={initialValues}
//           validationSchema={validationSchema}
//           onSubmit={(values) => {
//             if (values.subsubcategory === "") {
//               delete values.subsubcategory;
//             }
//             hanldeSubmit(values);
//           }}
//         >
//           {({ errors, touched, setFieldValue }) => (
//             <Form>
//               <div className="mb-4">
//                 <Field name="category">
//                   {({ field }) => (
//                     <Select
//                       label="Category"
//                       placeholder="Select a category"
//                       selectionMode="single"
//                       className="w-full bg-gray-50"
//                       {...field}
//                     >
//                       {categories.map((category) => (
//                         <SelectItem
//                           key={category.key}
//                           onClick={() => setItem(category.key)}
//                         >
//                           {category.label}
//                         </SelectItem>
//                       ))}
//                     </Select>
//                   )}
//                 </Field>
//                 {errors.category && touched.category && (
//                   <div className="text-red-600">{errors.category}</div>
//                 )}
//               </div>

//               <div className="mb-4">
//                 <Field name="subcategory">
//                   {({ field }) => (
//                     <Select
//                       label="Subcategory"
//                       placeholder="Select a subcategory"
//                       selectionMode="single"
//                       className="w-full bg-gray-50"
//                       {...field}
//                     >
//                       {(item === "kids"
//                         ? kidsSubcategories
//                         : item === "women"
//                         ? womenSubcategories
//                         : item === "jewellery"
//                         ? jewellerySubcategories
//                         : []
//                       ).map((subcategory) => (
//                         <SelectItem key={subcategory.key}>
//                           {subcategory.label}
//                         </SelectItem>
//                       ))}
//                     </Select>
//                   )}
//                 </Field>
//                 {errors.subcategory && touched.subcategory && (
//                   <div className="text-red-600">{errors.subcategory}</div>
//                 )}
//               </div>

//               {item === "jewellery" && (
//                 <div className="mb-4">
//                   <Field name="subsubcategory">
//                     {({ field }) => (
//                       <Select
//                         label="Subsubcategory"
//                         placeholder="Select a subsubcategory"
//                         selectionMode="single"
//                         className="w-full bg-gray-50"
//                         {...field}
//                       >
//                         {jewSubcategories.map((subsubcategory) => (
//                           <SelectItem key={subsubcategory.key}>
//                             {subsubcategory.label}
//                           </SelectItem>
//                         ))}
//                       </Select>
//                     )}
//                   </Field>
//                   {errors.subsubcategory && touched.subsubcategory && (
//                     <div className="text-red-600">{errors.subsubcategory}</div>
//                   )}
//                 </div>
//               )}

//               <div className="mb-4">
//                 <Field name="name">
//                   {({ field }) => (
//                     <div>
//                       <label className="block text-sm font-medium text-gray-700">
//                         Name
//                       </label>
//                       <input
//                         {...field}
//                         type="text"
//                         placeholder="Enter the name"
//                         className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
//                       />
//                     </div>
//                   )}
//                 </Field>
//                 {errors.name && touched.name && (
//                   <div className="text-red-600">{errors.name}</div>
//                 )}
//               </div>

//               <div className="mb-4">
//                 <Field name="description">
//                   {({ field }) => (
//                     <div>
//                       <label className="block text-sm font-medium text-gray-700">
//                         Description
//                       </label>
//                       <input
//                         {...field}
//                         type="text"
//                         placeholder="Enter the description"
//                         className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
//                       />
//                     </div>
//                   )}
//                 </Field>
//                 {errors.description && touched.description && (
//                   <div className="text-red-600">{errors.description}</div>
//                 )}
//               </div>

//               <div className="mb-4">
//                 <Field name="price">
//                   {({ field }) => (
//                     <div>
//                       <label className="block text-sm font-medium text-gray-700">
//                         Price
//                       </label>
//                       <input
//                         {...field}
//                         type="number"
//                         placeholder="Enter the price"
//                         className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
//                       />
//                     </div>
//                   )}
//                 </Field>
//                 {errors.price && touched.price && (
//                   <div className="text-red-600">{errors.price}</div>
//                 )}
//               </div>

//               <div className="mb-4">
//                 <Field name="stock">
//                   {({ field }) => (
//                     <div>
//                       <label className="block text-sm font-medium text-gray-700">
//                         Stock
//                       </label>
//                       <input
//                         {...field}
//                         type="number"
//                         placeholder="Enter the stock"
//                         className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
//                       />
//                     </div>
//                   )}
//                 </Field>
//                 {errors.stock && touched.stock && (
//                   <div className="text-red-600">{errors.stock}</div>
//                 )}
//               </div>

//               <div className="mb-4">
//                 <Field name="discount">
//                   {({ field }) => (
//                     <div>
//                       <label className="block text-sm font-medium text-gray-700">
//                         Discount
//                       </label>
//                       <input
//                         type="number"
//                         placeholder="Discount"
//                         className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
//                         {...field}
//                       />
//                     </div>
//                   )}
//                 </Field>
//                 {errors.discount && touched.discount && (
//                   <div className="text-red-600">{errors.discount}</div>
//                 )}
//               </div>

//               <div className="mb-6">
//                 <Field name="image">
//                   {({ field }) => (
//                     <div>
//                       <label className="block text-sm font-medium text-gray-700">
//                         Images
//                       </label>
//                       <input
//                         type="file"
//                         multiple
//                         className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
//                         onChange={(e) => {
//                           setFieldValue("image", Array.from(e.target.files));
//                         }}
//                       />
//                     </div>
//                   )}
//                 </Field>
//                 {errors.image && touched.image && (
//                   <div className="text-red-600">{errors.image}</div>
//                 )}
//               </div>

//               <div className="flex justify-end">
//                 <Button
//                   type="submit"
//                   className="bg-blue-500 text-white hover:bg-blue-600 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2"
//                 >
//                   Submit
//                 </Button>
//               </div>
//             </Form>
//           )}
//         </Formik>
//       </div>
//     </div>
//   );
// };

// export default AddProducts;

import { Field, Form, Formik } from "formik";
import * as Yup from "yup";
import { Select, SelectItem, Button } from "@nextui-org/react";
import { useState } from "react";
import axios from "axios";

const categories = [
  { key: "kids", label: "Kids" },
  { key: "women", label: "Women" },
  { key: "jewellery", label: "Jewellery" },
];

const subCategoryEnum = {
  kids: [
    { key: "boys", label: "Boys" },
    { key: "girls", label: "Girls" },
    { key: "infant", label: "Infant" },
  ],
  women: [
    { key: "traditional", label: "Traditional" },
    { key: "turkish", label: "Turkish" },
  ],
  jewellery: [
    { key: "traditional", label: "Traditional" },
    { key: "turkish", label: "Turkish" },
  ],
};

const subSubcategories = {
  traditional: [
    { key: "eastern", label: "Eastern" },
    { key: "western", label: "Western" },
  ],
  turkish: [
    { key: "eastern", label: "Eastern" },
    { key: "western", label: "Western" },
  ],
};

const jewSubcategories = {
  traditional: [
    { key: "rings", label: "Rings" },
    { key: "mala", label: "Mala" },
    { key: "sets", label: "Sets" },
    { key: "bracelet", label: "Bracelet" },
  ],
  turkish: [
    { key: "rings", label: "Rings" },
    { key: "mala", label: "Mala" },
    { key: "sets", label: "Sets" },
    { key: "bracelet", label: "Bracelet" },
  ],
};

const validationSchema = Yup.object({
  category: Yup.string().required("Category is required"),
  subcategory: Yup.string().required("Subcategory is required"),
  name: Yup.string().required("Product name is required"),
  description: Yup.string().required("Description is required"),
  price: Yup.number()
    .required("Price is required")
    .min(0, "Price must be positive"),
  stock: Yup.number()
    .required("Stock is required")
    .min(0, "Stock must be positive"),
  discount: Yup.number()
    .min(0, "Discount must be between 0 and 100")
    .max(100, "Discount must be between 0 and 100"),
  subsubcategory: Yup.mixed()
    .transform((value) => (value === "" ? undefined : value))
    .when("category", {
      is: "jewellery",
      then: () =>
        Yup.string().required("Subsubcategory is required for jewellery"),
    })
    .when("category", {
      is: "women",
      then: () => Yup.string().required("Subsubcategory is required for women"),
    }),
  image: Yup.array()
    .min(1, "At least one image is required")
    .required("Image is required"),
});

const AddProducts = () => {
  const [item, setItem] = useState("");
  const [subItem, setSubItem] = useState("");

  const handleSubmit = async (values) => {
    try {
      const formData = new FormData();
      formData.append("category", values.category);
      formData.append("description", values.description);
      formData.append("subcategory", values.subcategory);
      formData.append("name", values.name);
      formData.append("price", values.price);
      formData.append("discount", values.discount);
      formData.append("stock", values.stock);
      values.image.forEach((file) => {
        formData.append("image", file);
      });
      values.subsubcategory &&
        formData.append("subsubcategory", values.subsubcategory);
      console.log(values);
      const response = await axios.post(
        "http://localhost:8000/api/v1/product/add-product",
        formData
      );
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  const initialValues = {
    category: "",
    subcategory: "",
    subsubcategory: "",
    name: "",
    description: "",
    price: 0,
    stock: 0,
    discount: 0,
    image: [],
  };

  return (
    <div className="min-h-screen p-6 bg-gray-100 flex justify-center items-center">
      <div className="w-full max-w-2xl bg-white shadow-md rounded-lg p-8">
        <h2 className="text-3xl font-bold mb-6 text-center text-blue-600">
          Add Product
        </h2>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={(values) => {
            if (values.subsubcategory === "") {
              delete values.subsubcategory;
            }
            handleSubmit(values);
          }}
        >
          {({ errors, touched, setFieldValue }) => (
            <Form>
              <div className="mb-4">
                <Field name="category">
                  {({ field }) => (
                    <Select
                      label="Category"
                      placeholder="Select a category"
                      selectionMode="single"
                      className="w-full bg-gray-50"
                      {...field}
                      onChange={(e) => {
                        setFieldValue("category", e.target.value);
                        setItem(e.target.value);
                        setFieldValue("subcategory", "");
                        setFieldValue("subsubcategory", "");
                      }}
                    >
                      {categories.map((category) => (
                        <SelectItem key={category.key} value={category.key}>
                          {category.label}
                        </SelectItem>
                      ))}
                    </Select>
                  )}
                </Field>
                {errors.category && touched.category && (
                  <div className="text-red-600">{errors.category}</div>
                )}
              </div>

              <div className="mb-4">
                <Field name="subcategory">
                  {({ field }) => (
                    <Select
                      label="Subcategory"
                      placeholder="Select a subcategory"
                      selectionMode="single"
                      className="w-full bg-gray-50"
                      {...field}
                      onChange={(e) => {
                        setFieldValue("subcategory", e.target.value);
                        setSubItem(e.target.value);
                        setFieldValue("subsubcategory", "");
                      }}
                    >
                      {item && subCategoryEnum[item]
                        ? subCategoryEnum[item].map((subcategory) => (
                            <SelectItem
                              key={subcategory.key}
                              value={subcategory.key}
                            >
                              {subcategory.label}
                            </SelectItem>
                          ))
                        : []}
                    </Select>
                  )}
                </Field>
                {errors.subcategory && touched.subcategory && (
                  <div className="text-red-600">{errors.subcategory}</div>
                )}
              </div>

              {(item === "jewellery" || item === "women") && (
                <div className="mb-4">
                  <Field name="subsubcategory">
                    {({ field }) => (
                      <Select
                        label="Subsubcategory"
                        placeholder="Select a subsubcategory"
                        selectionMode="single"
                        className="w-full bg-gray-50"
                        {...field}
                        onChange={(e) =>
                          setFieldValue("subsubcategory", e.target.value)
                        }
                      >
                        {subItem &&
                        (item === "women"
                          ? subSubcategories[subItem]
                          : jewSubcategories[subItem])
                          ? (item === "women"
                              ? subSubcategories[subItem]
                              : jewSubcategories[subItem]
                            ).map((subsubcategory) => (
                              <SelectItem
                                key={subsubcategory.key}
                                value={subsubcategory.key}
                              >
                                {subsubcategory.label}
                              </SelectItem>
                            ))
                          : []}
                      </Select>
                    )}
                  </Field>
                  {errors.subsubcategory && touched.subsubcategory && (
                    <div className="text-red-600">{errors.subsubcategory}</div>
                  )}
                </div>
              )}

              <div className="mb-4">
                <Field name="name">
                  {({ field }) => (
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Product Name
                      </label>
                      <input
                        {...field}
                        type="text"
                        placeholder="Product Name"
                        className="mt-1 p-2 w-full border rounded-md bg-gray-50"
                      />
                    </div>
                  )}
                </Field>
                {errors.name && touched.name && (
                  <div className="text-red-600">{errors.name}</div>
                )}
              </div>

              <div className="mb-4">
                <Field name="description">
                  {({ field }) => (
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Description
                      </label>
                      <textarea
                        {...field}
                        placeholder="Product Description"
                        className="mt-1 p-2 w-full border rounded-md bg-gray-50"
                      />
                    </div>
                  )}
                </Field>
                {errors.description && touched.description && (
                  <div className="text-red-600">{errors.description}</div>
                )}
              </div>

              <div className="mb-4">
                <Field name="price">
                  {({ field }) => (
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Price
                      </label>
                      <input
                        {...field}
                        type="number"
                        placeholder="Product Price"
                        className="mt-1 p-2 w-full border rounded-md bg-gray-50"
                      />
                    </div>
                  )}
                </Field>
                {errors.price && touched.price && (
                  <div className="text-red-600">{errors.price}</div>
                )}
              </div>

              <div className="mb-4">
                <Field name="stock">
                  {({ field }) => (
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Stock
                      </label>
                      <input
                        {...field}
                        type="number"
                        placeholder="Product Stock"
                        className="mt-1 p-2 w-full border rounded-md bg-gray-50"
                      />
                    </div>
                  )}
                </Field>
                {errors.stock && touched.stock && (
                  <div className="text-red-600">{errors.stock}</div>
                )}
              </div>

              <div className="mb-4">
                <Field name="discount">
                  {({ field }) => (
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Discount (%)
                      </label>
                      <input
                        {...field}
                        type="number"
                        placeholder="Discount"
                        className="mt-1 p-2 w-full border rounded-md bg-gray-50"
                      />
                    </div>
                  )}
                </Field>
                {errors.discount && touched.discount && (
                  <div className="text-red-600">{errors.discount}</div>
                )}
              </div>

              <div className="mb-6">
                <Field name="image">
                  {({ field }) => (
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Images
                      </label>
                      <input
                        type="file"
                        multiple
                        className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                        onChange={(e) => {
                          setFieldValue("image", Array.from(e.target.files));
                        }}
                      />
                    </div>
                  )}
                </Field>
                {errors.image && touched.image && (
                  <div className="text-red-600">{errors.image}</div>
                )}
              </div>

              <Button type="submit" className="w-full bg-blue-600 text-white">
                Add Product
              </Button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default AddProducts;
