import Svg from "./svg";
export default function ContactForm() {
  return (
    <form method="post">
      <div className="text-center w-full"></div>
      <div className="max-w-screen-xl mt-5 px-8 grid gap-8 grid-cols-1 md:grid-cols-2 md:px-12 lg:px-16 xl:px-32 py-16 mx-auto bg-white text-gray-900 rounded-lg shadow-lg">
        <div className="flex flex-col justify-between">
          <div>
            <h2 className="text-4xl lg:text-5xl font-bold leading-tight">
              Lets talk about everything!
            </h2>
            <div className="text-gray-700 mt-8">
              We would love to hear from you.
            </div>
          </div>
          <div className="mt-8 text-center">
            <Svg />
          </div>
        </div>
        <div className="">
          <div>
            <span className="uppercase text-sm text-gray-600 font-bold">
              Full Name
            </span>
            <input
              name="fullname"
              className="w-full bg-gray-100 border-1 border-black text-gray-900 mt-2 p-3 rounded-lg focus:outline-none focus:shadow-outline"
              type="text"
              placeholder=""
            />
          </div>
          <div className="mt-8">
            <span className="uppercase text-sm text-gray-600 font-bold">
              Email
            </span>
            <input
              name="email"
              className="w-full bg-gray-100 border-1 border-black text-gray-900 mt-2 p-3 rounded-lg focus:outline-none focus:shadow-outline"
              type="email"
            />
          </div>
          <div className="mt-8">
            <span className="uppercase text-sm text-gray-600 font-bold">
              Message
            </span>
            <textarea
              name="message"
              className="w-full h-32 bg-gray-100 border-1 border-black text-gray-900 mt-2 p-3 rounded-lg focus:outline-none focus:shadow-outline resize-none"
            ></textarea>
          </div>
          <div className="mt-8">
            <button className="uppercase text-sm font-bold tracking-wide bg-green-500 hover:bg-green-700 cursor-pointer text-gray-100 p-3 rounded-lg w-full focus:outline-none focus:shadow-outline">
              Send Message
            </button>
          </div>
        </div>
      </div>
    </form>
  );
}
