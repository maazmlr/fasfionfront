import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';

const SignupForm = ({ onSubmit }) => {
  return (
    <Formik
      initialValues={{
        fullName: '',
        address: '',
        city: '',
        zipcode: '',
        phoneNumber: '',
        whatsappNumber: '',
      }}
      validationSchema={Yup.object({
        fullName: Yup.string().required('Required'),
        address: Yup.string().required('Required'),
        city: Yup.string().required('Required'),
        zipcode: Yup.string().required('Required'),
        phoneNumber: Yup.string().required('Required'),
        whatsappNumber: Yup.string().required('Required'),
      })}
      onSubmit={(values,{reset})=>{
        console.log(values);
        onSubmit(values);
        reset()

      }}
    >
      {({ errors, touched }) => (
        <Form className="max-w-md mx-auto p-4 pt-6 pb-8 mb-4 bg-white rounded shadow-md">
          <h2 className="text-2xl font-bold mb-4">Sign up</h2>
          <div className="flex flex-wrap -mx-3 mb-6">
            <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
              <label
                className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                htmlFor="fullName"
              >
                Full Name
              </label>
              <Field
                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white"
                id="fullName"
                name="fullName"
                type="text"
                placeholder="John Doe"
              />
              {errors.fullName && touched.fullName ? (
                <ErrorMessage name="fullName" component="div" className="text-red-500 text-xs" />
              ) : null}
            </div>
            <div className="w-full md:w-1/2 px-3">
              <label
                className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                htmlFor="address"
              >
                Address
              </label>
              <Field
                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white"
                id="address"
                name="address"
                type="text"
                placeholder="123 Main St"
              />
              {errors.address && touched.address ? (
                <ErrorMessage name="address" component="div" className="text-red-500 text-xs" />
              ) : null}
            </div>
          </div>
          <div className="flex flex-wrap -mx-3 mb-6">
            <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
              <label
                className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                htmlFor="city"
              >
                City
              </label>
              <Field
                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white"
                id="city"
                name="city"
                type="text"
                placeholder="New York"
              />
              {errors.city && touched.city ? (
                <ErrorMessage name="city" component="div" className="text-red-500 text-xs" />
              ) : null}
            </div>
            <div className="w-full md:w-1/2 px-3">
              <label
                className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                htmlFor="zipcode"
              >
                Zipcode
              </label>
              <Field
                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white"
                id="zipcode"
                name="zipcode"
                type="text"
                placeholder="10001"
              />
              {errors.zipcode && touched.zipcode ? (
                <ErrorMessage name="zipcode" component="div" className="text-red-500 text-xs" />
              ) : null}
            </div>
          </div>
          <div className="flex flex-wrap -mx-3 mb-6">
            <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
              <label
                className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                htmlFor="phoneNumber"
              >
                Phone Number
              </label>
              <Field
                className="appearance-none block w-full bg-gray-200 text-gray-700border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white"
                id="phoneNumber"
                name="phoneNumber"
                type="tel"
                placeholder="+1 555 1234"
              />
              {errors.phoneNumber && touched.phoneNumber? (
                <ErrorMessage name="phoneNumber" component="div" className="text-red-500 text-xs" />
              ) : null}
            </div>
            <div className="w-full md:w-1/2 px-3">
              <label
                className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                htmlFor="whatsappNumber"
              >
                Whatsapp Number
              </label>
              <Field
                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white"
                id="whatsappNumber"
                name="whatsappNumber"
                type="tel"
                placeholder="+1 555 1234"
              />
              {errors.whatsappNumber && touched.whatsappNumber? (
                <ErrorMessage name="whatsappNumber" component="div" className="text-red-500 text-xs" />
              ) : null}
            </div>
          </div>
          <button
            className="bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded"
            type="submit"
          >
            Submit
          </button>
        </Form>
      )}
    </Formik>
  );
};

export default SignupForm;