import { Field, Form, Formik } from "formik";
import * as Yup from "yup";
import { Select, SelectItem, Button } from "@nextui-org/react";
import { useState } from "react";
import axios from "axios";
import { url } from "../../url";
import { notification } from "antd";

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
  size: Yup.string().required("At least one color is required"),
  color: Yup.string().required("At least one color is required"),
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
  const [api, contextHolder] = notification.useNotification();

  const openNotification = (placement) => {
    api.info({
      message: `SUCCESS`,
      description: "product added successfully",
      placement,
    });
  };
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
      formData.append("size", values.size.split(","));
      formData.append("color", values.color.split(","));
      values.image.forEach((file) => {
        formData.append("image", file);
      });
      values.subsubcategory &&
        formData.append("subsubcategory", values.subsubcategory);
      console.log(values);
      const response = await axios.post(url + "/product/add-product", formData);
      console.log(response);
      openNotification("topRight");
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
    color: "",
    size: "",
  };

  return (
    <div className="min-h-screen p-6 bg-gray-100 flex justify-center items-center">
      <div className="w-full max-w-2xl bg-white shadow-md rounded-lg p-8">
        {contextHolder}
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

              <div className="mb-4">
                <Field name="color">
                  {({ field }) => (
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Color
                      </label>
                      <input
                        {...field}
                        type="text"
                        value={field.value}
                        onChange={(e) => setFieldValue("color", e.target.value)}
                        className="mt-1 p-2 w-full border rounded-md bg-gray-50"
                      />
                    </div>
                  )}
                </Field>
                {errors.color && touched.color && (
                  <div className="text-red-600">{errors.color}</div>
                )}
              </div>

              <div className="mb-4">
                <Field name="size">
                  {({ field }) => (
                    <Select
                      label="size"
                      placeholder="Select size"
                      selectionMode="multiple"
                      className="w-full bg-gray-50"
                      {...field}
                    >
                      <SelectItem key="XXS" value="XXS">
                        XXS
                      </SelectItem>
                      <SelectItem key="XS" value="XS">
                        XS
                      </SelectItem>
                      <SelectItem key="S" value="S">
                        S
                      </SelectItem>
                      <SelectItem key="M" value="M">
                        M
                      </SelectItem>
                      <SelectItem key="L" value="L">
                        L
                      </SelectItem>
                      <SelectItem key="XL" value="XL">
                        XL
                      </SelectItem>
                      <SelectItem key="XXL" value="XXL">
                        XXL
                      </SelectItem>
                      <SelectItem key="0-3" value="0-3">
                        0-3
                      </SelectItem>
                      <SelectItem key="3-6" value="3-6">
                        3-6
                      </SelectItem>
                      <SelectItem key="6-9" value="6-9">
                        6-9
                      </SelectItem>
                      <SelectItem key="9-12" value="9-12">
                        9-12
                      </SelectItem>
                      <SelectItem key="12-18" value="12-18">
                        12-18
                      </SelectItem>
                      <SelectItem key="18-24" value="18-24">
                        18-24
                      </SelectItem>
                      <SelectItem key="18-21" value="18-21">
                        18-21
                      </SelectItem>
                      <SelectItem key="1-2" value="1-2">
                        1-2
                      </SelectItem>
                      <SelectItem key="2-3" value="2-3">
                        2-3
                      </SelectItem>
                      <SelectItem key="3-4" value="3-4">
                        3-4
                      </SelectItem>
                      <SelectItem key="4-5" value="4-5">
                        4-5
                      </SelectItem>
                      <SelectItem key="5-6" value="5-6">
                        5-6
                      </SelectItem>
                      <SelectItem key="6-7" value="6-7">
                        6-7
                      </SelectItem>
                      <SelectItem key="7-8" value="7-8">
                        7-8
                      </SelectItem>
                      <SelectItem key="8-9" value="8-9">
                        8-9
                      </SelectItem>
                      <SelectItem key="9-10" value="9-10">
                        9-10
                      </SelectItem>
                      <SelectItem key="10-11" value="10-11">
                        10-11
                      </SelectItem>
                      <SelectItem key="11-12" value="11-12">
                        11-12
                      </SelectItem>
                      <SelectItem key="12-13" value="12-13">
                        12-13
                      </SelectItem>
                      <SelectItem key="13-14" value="13-14">
                        13-14
                      </SelectItem>
                      <SelectItem key="14-15" value="14-15">
                        14-15
                      </SelectItem>
                    </Select>
                  )}
                </Field>
                {errors.size && touched.size && (
                  <div className="text-red-600">{errors.size}</div>
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
