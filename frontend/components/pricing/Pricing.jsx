import React from "react";

const Pricing = () => {
  return (
    <div className="max-w-[85rem] px-4 py-10 sm:px-6 lg:px-8 lg:py-14 mx-auto">
      {/* Title */}
      <div className="max-w-2xl mx-auto text-center mb-10 lg:mb-14">
        <h2 className="text-2xl font-bold md:text-4xl md:leading-tight">
          Pricing
        </h2>
        <p className="mt-1 text-gray-600">
          Whatever your status, our offers evolve according to your needs.
        </p>
      </div>
      {/* End Title */}

      {/* Switch */}
      <div className="flex justify-center items-center gap-x-3">
        <label htmlFor="pricing-switch" className="text-sm text-gray-800">
          Monthly
        </label>
        <label
          htmlFor="pricing-switch"
          className="relative inline-block w-11 h-6 cursor-pointer"
        >
          <input
            type="checkbox"
            id="pricing-switch"
            className="peer sr-only"
            defaultChecked
          />
          <span className="absolute inset-0 bg-gray-200 rounded-full transition-colors duration-200 ease-in-out peer-checked:bg-primary peer-disabled:opacity-50 peer-disabled:pointer-events-none"></span>
          <span className="absolute top-1/2 start-0.5 -translate-y-1/2 size-5 bg-white rounded-full shadow-xs transition-transform duration-200 ease-in-out peer-checked:translate-x-full"></span>
        </label>
        <label
          htmlFor="pricing-switch"
          className="relative text-sm text-gray-800"
        >
          Annually
          <span className="absolute -top-10 start-auto -end-28">
            <span className="flex items-center">
              <svg
                className="w-14 h-8 -me-6"
                width="45"
                height="25"
                viewBox="0 0 45 25"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M43.2951 3.47877C43.8357 3.59191 44.3656 3.24541 44.4788 2.70484C44.5919 2.16427 44.2454 1.63433 43.7049 1.52119L43.2951 3.47877ZM4.63031 24.4936C4.90293 24.9739 5.51329 25.1423 5.99361 24.8697L13.8208 20.4272C14.3011 20.1546 14.4695 19.5443 14.1969 19.0639C13.9242 18.5836 13.3139 18.4152 12.8336 18.6879L5.87608 22.6367L1.92723 15.6792C1.65462 15.1989 1.04426 15.0305 0.563943 15.3031C0.0836291 15.5757 -0.0847477 16.1861 0.187863 16.6664L4.63031 24.4936ZM43.7049 1.52119C32.7389 -0.77401 23.9595 0.99522 17.3905 5.28788C10.8356 9.57127 6.58742 16.2977 4.53601 23.7341L6.46399 24.2659C8.41258 17.2023 12.4144 10.9287 18.4845 6.96211C24.5405 3.00476 32.7611 1.27399 43.2951 3.47877L43.7049 1.52119Z"
                  fill="currentColor"
                  className="fill-gray-300"
                />
              </svg>
              <span className="mt-3 inline-block whitespace-nowrap text-[11px] leading-5 font-semibold uppercase bg-primary text-white rounded-full py-1 px-2.5">
                Save up to 10%
              </span>
            </span>
          </span>
        </label>
      </div>
      {/* End Switch */}

      {/* Card Grid Section */}
      <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:items-center">
        {/* Free Plan */}
        <div className="flex flex-col border border-gray-200 text-center rounded-xl p-8 bg-white/80">
          <h4 className="font-medium text-lg text-primary-text-color">Free</h4>
          <span className="mt-7 font-bold text-5xl text-primary-text-color flex items-center justify-center">
            <span>Free</span>
          </span>
          <p className="mt-2 text-sm text-gray-600">
            Solo founders & micro-teams
          </p>

          <ul className="mt-7 space-y-2.5 text-sm">
            <li className="flex gap-x-2">
              <svg
                className="shrink-0 mt-0.5 size-4 text-primary"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polyline points="20 6 9 17 4 12" />
              </svg>
              <span className="text-primary-text-color">
                Core project management
              </span>
            </li>
            <li className="flex gap-x-2">
              <svg
                className="shrink-0 mt-0.5 size-4 text-primary"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polyline points="20 6 9 17 4 12" />
              </svg>
              <span className="text-primary-text-color">
                Basic finance tracking
              </span>
            </li>
            <li className="flex gap-x-2">
              <svg
                className="shrink-0 mt-0.5 size-4 text-primary"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polyline points="20 6 9 17 4 12" />
              </svg>
              <span className="text-primary-text-color">
                Up to 3 active users
              </span>
            </li>
          </ul>

          <a
            className="mt-5 py-3 px-4 inline-flex justify-center items-center gap-x-2 text-sm font-semibold rounded-lg border border-gray-200 bg-[#EEF0FB] text-primary-text-color shadow-2xs hover:bg-[#E5E8F7] disabled:opacity-50 disabled:pointer-events-none focus:outline-hidden focus:bg-[#E5E8F7]"
            href="#"
          >
            Sign up free
          </a>
        </div>

        {/* Startup Plan */}
        <div className="flex flex-col border-2 border-primary text-center shadow-xl rounded-xl p-8 bg-white/80">
          <p className="mb-3">
            <span className="inline-flex items-center gap-1.5 py-1.5 px-3 rounded-lg text-xs uppercase font-semibold bg-primary/20 text-primary">
              Most popular
            </span>
          </p>
          <h4 className="font-medium text-lg text-primary-text-color">
            Startup
          </h4>
          <span className="mt-5 font-bold text-5xl text-primary-text-color flex items-center justify-center">
            <span className="font-bold text-2xl mr-1">৳</span>
            <span>2,000</span>
          </span>
          <p className="mt-2 text-sm text-gray-600">
            Early-stage teams (up to 7 people)
          </p>

          <ul className="mt-7 space-y-2.5 text-sm">
            <li className="flex gap-x-2">
              <svg
                className="shrink-0 mt-0.5 size-4 text-primary"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polyline points="20 6 9 17 4 12" />
              </svg>
              <span className="text-primary-text-color">CRM system</span>
            </li>
            <li className="flex gap-x-2">
              <svg
                className="shrink-0 mt-0.5 size-4 text-primary"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polyline points="20 6 9 17 4 12" />
              </svg>
              <span className="text-primary-text-color">
                Legal compliance toolkit
              </span>
            </li>
            <li className="flex gap-x-2">
              <svg
                className="shrink-0 mt-0.5 size-4 text-primary"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polyline points="20 6 9 17 4 12" />
              </svg>
              <span className="text-primary-text-color">Task automation</span>
            </li>
          </ul>

          <a
            className="mt-5 py-3 px-4 inline-flex justify-center items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-primary text-white hover:bg-primary/90 focus:outline-hidden focus:bg-primary/90 disabled:opacity-50 disabled:pointer-events-none"
            href="#"
          >
            Get started
          </a>
        </div>

        {/* Growth Plan */}
        <div className="flex flex-col border border-gray-200 text-center rounded-xl p-8 bg-white/80">
          <h4 className="font-medium text-lg text-primary-text-color">
            Growth
          </h4>
          <span className="mt-5 font-bold text-5xl text-primary-text-color flex items-center justify-center">
            <span className="font-bold text-2xl mr-1">৳</span>
            <span>5,000</span>
          </span>
          <p className="mt-2 text-sm text-gray-600">
            Scaling companies (up to 15 people)
          </p>

          <ul className="mt-7 space-y-2.5 text-sm">
            <li className="flex gap-x-2">
              <svg
                className="shrink-0 mt-0.5 size-4 text-primary"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polyline points="20 6 9 17 4 12" />
              </svg>
              <span className="text-primary-text-color">
                All Startup features
              </span>
            </li>
            <li className="flex gap-x-2">
              <svg
                className="shrink-0 mt-0.5 size-4 text-primary"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polyline points="20 6 9 17 4 12" />
              </svg>
              <span className="text-primary-text-color">
                AI-driven insights
              </span>
            </li>
            <li className="flex gap-x-2">
              <svg
                className="shrink-0 mt-0.5 size-4 text-primary"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polyline points="20 6 9 17 4 12" />
              </svg>
              <span className="text-primary-text-color">
                Funding assistance
              </span>
            </li>
          </ul>

          <a
            className="mt-5 py-3 px-4 inline-flex justify-center items-center gap-x-2 text-sm font-semibold rounded-lg border border-gray-200 bg-[#EEF0FB] text-primary-text-color shadow-2xs hover:bg-[#E5E8F7] disabled:opacity-50 disabled:pointer-events-none focus:outline-hidden focus:bg-[#EEF0FB]"
            href="#"
          >
            Get started
          </a>
        </div>

        {/* Enterprise Plan */}
        <div className="flex flex-col border border-gray-200 text-center rounded-xl p-8 bg-white/80">
          <h4 className="font-medium text-lg text-primary-text-color">
            Enterprise
          </h4>
          <span className="mt-5 font-bold text-5xl text-primary-text-color">
            Custom
          </span>
          <p className="mt-2 text-sm text-gray-600">
            Organizations with custom demands
          </p>

          <ul className="mt-7 space-y-2.5 text-sm">
            <li className="flex gap-x-2">
              <svg
                className="shrink-0 mt-0.5 size-4 text-primary"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polyline points="20 6 9 17 4 12" />
              </svg>
              <span className="text-primary-text-color">
                Tailor-made solutions
              </span>
            </li>
            <li className="flex gap-x-2">
              <svg
                className="shrink-0 mt-0.5 size-4 text-primary"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polyline points="20 6 9 17 4 12" />
              </svg>
              <span className="text-primary-text-color">
                Dedicated account manager
              </span>
            </li>
            <li className="flex gap-x-2">
              <svg
                className="shrink-0 mt-0.5 size-4 text-primary"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polyline points="20 6 9 17 4 12" />
              </svg>
              <span className="text-primary-text-color">SLA guarantees</span>
            </li>
          </ul>

          <a
            className="mt-5 py-3 px-4 inline-flex justify-center items-center gap-x-2 text-sm font-semibold rounded-lg border border-gray-200 bg-[#EEF0FB] text-primary-text-color shadow-2xs hover:bg-[#E5E8F7] disabled:opacity-50 disabled:pointer-events-none focus:outline-hidden focus:bg-[#EEF0FB]"
            href="#"
          >
            Contact sales
          </a>
        </div>
      </div>

      {/* AI Add-ons Section */}
      <div className="mt-20 text-center">
        <h3 className="text-2xl font-semibold mb-8 text-primary-text-color">
          AI Feature Add-Ons
        </h3>
        <div className="max-w-3xl mx-auto space-y-6">
          <p className="text-gray-600">
            <span className="font-semibold">Startup & Growth customers:</span>{" "}
            Purchase up to 2 AI modules for just ৳500 each.
          </p>
          <p className="text-gray-600">
            <span className="font-semibold">
              Enterprise & Established firms:
            </span>{" "}
            Gain full access to our comprehensive AI suite—leveraging vast
            datasets and deep competitive analysis—for ৳20,000 per module.
          </p>
        </div>
      </div>

      {/* Why Choose Us Section */}
      <div className="mt-20 text-center">
        <h3 className="text-2xl font-semibold mb-8 text-primary-text-color">
          Why Choose Us?
        </h3>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
          <div className="flex flex-col border border-gray-200 text-center rounded-xl p-8 bg-white/80">
            <h4 className="font-semibold mb-2 text-primary-text-color">
              Zero upfront cost
            </h4>
            <p className="text-gray-600">Free 6-month trial for new startups</p>
          </div>
          <div className="flex flex-col border border-gray-200 text-center rounded-xl p-8 bg-white/80">
            <h4 className="font-semibold mb-2 text-primary-text-color">
              Seamless scaling
            </h4>
            <p className="text-gray-600">Upgrade as your team grows</p>
          </div>
          <div className="flex flex-col border border-gray-200 text-center rounded-xl p-8 bg-white/80">
            <h4 className="font-semibold mb-2 text-primary-text-color">
              Modular AI tools
            </h4>
            <p className="text-gray-600">Add exactly what you need</p>
          </div>
          <div className="flex flex-col border border-gray-200 text-center rounded-xl p-8 bg-white/80">
            <h4 className="font-semibold mb-2 text-primary-text-color">
              Dedicated support
            </h4>
            <p className="text-gray-600">Enterprise-level assistance</p>
          </div>
        </div>
      </div>

      {/* Comparison table */}
      <div className="mt-20 lg:mt-32">
        <div className="lg:text-center mb-10 lg:mb-20">
          <h3 className="text-2xl font-semibold text-primary-text-color">
            Compare plans
          </h3>
        </div>

        <div className="hidden lg:block">
          <table className="w-full h-px bg-white/80">
            <caption className="sr-only">Pricing plan comparison</caption>
            <thead className="sticky top-0 inset-x-0 bg-[#EEF0FB]">
              <tr>
                <th className="py-4 ps-6 pe-6 text-sm font-medium text-primary-text-color text-start">
                  Features
                </th>
                <th className="w-1/4 py-4 px-6 text-lg leading-6 font-medium text-primary-text-color text-center">
                  Free
                </th>
                <th className="w-1/4 py-4 px-6 text-lg leading-6 font-medium text-primary-text-color text-center">
                  Startup
                </th>
                <th className="w-1/4 py-4 px-6 text-lg leading-6 font-medium text-primary-text-color text-center">
                  Growth
                </th>
                <th className="w-1/4 py-4 px-6 text-lg leading-6 font-medium text-primary-text-color text-center">
                  Enterprise
                </th>
              </tr>
            </thead>
            <tbody className="border-t border-gray-200 divide-y divide-gray-200">
              {/* Core Features */}
              <tr>
                <th
                  className="py-3 ps-6 bg-[#EEF0FB] font-bold text-primary-text-color text-start"
                  colSpan={5}
                  scope="colgroup"
                >
                  Core Features
                </th>
              </tr>

              {/* Team Members */}
              <tr>
                <th
                  className="py-5 ps-6 pe-6 text-sm font-normal text-gray-600 text-start"
                  scope="row"
                >
                  Team Members
                </th>
                <td className="py-5 px-6 text-center">Up to 3</td>
                <td className="py-5 px-6 text-center">Up to 7</td>
                <td className="py-5 px-6 text-center">Up to 15</td>
                <td className="py-5 px-6 text-center">Unlimited</td>
              </tr>

              {/* Project Management */}
              <tr>
                <th
                  className="py-5 ps-6 pe-6 text-sm font-normal text-gray-600 text-start"
                  scope="row"
                >
                  Project Management
                </th>
                <td className="py-5 px-6 text-center">Basic</td>
                <td className="py-5 px-6 text-center">Advanced</td>
                <td className="py-5 px-6 text-center">Advanced</td>
                <td className="py-5 px-6 text-center">Custom</td>
              </tr>

              {/* CRM Features */}
              <tr>
                <th
                  className="py-5 ps-6 pe-6 text-sm font-normal text-gray-600 text-start"
                  scope="row"
                >
                  CRM Features
                </th>
                <td className="py-5 px-6 text-center">-</td>
                <td className="py-5 px-6 text-center">Basic</td>
                <td className="py-5 px-6 text-center">Advanced</td>
                <td className="py-5 px-6 text-center">Enterprise</td>
              </tr>

              {/* AI Insights */}
              <tr>
                <th
                  className="py-5 ps-6 pe-6 text-sm font-normal text-gray-600 text-start"
                  scope="row"
                >
                  AI Insights
                </th>
                <td className="py-5 px-6 text-center">-</td>
                <td className="py-5 px-6 text-center">2 modules</td>
                <td className="py-5 px-6 text-center">5 modules</td>
                <td className="py-5 px-6 text-center">Full Suite</td>
              </tr>

              {/* Priority Support */}
              <tr>
                <th
                  className="py-5 ps-6 pe-6 text-sm font-normal text-gray-600 text-start"
                  scope="row"
                >
                  Priority Support
                </th>
                <td className="py-5 px-6 text-center">Email</td>
                <td className="py-5 px-6 text-center">Email & Chat</td>
                <td className="py-5 px-6 text-center">24/7 Chat</td>
                <td className="py-5 px-6 text-center">Dedicated Manager</td>
              </tr>

              {/* Data Analytics */}
              <tr>
                <th
                  className="py-5 ps-6 pe-6 text-sm font-normal text-gray-600 text-start"
                  scope="row"
                >
                  Data Analytics
                </th>
                <td className="py-5 px-6 text-center">Basic</td>
                <td className="py-5 px-6 text-center">Advanced</td>
                <td className="py-5 px-6 text-center">Custom</td>
                <td className="py-5 px-6 text-center">Enterprise</td>
              </tr>

              {/* API Access */}
              <tr>
                <th
                  className="py-5 ps-6 pe-6 text-sm font-normal text-gray-600 text-start"
                  scope="row"
                >
                  API Access
                </th>
                <td className="py-5 px-6 text-center">-</td>
                <td className="py-5 px-6 text-center">Limited</td>
                <td className="py-5 px-6 text-center">Full</td>
                <td className="py-5 px-6 text-center">Custom</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      {/* End Comparison table */}
    </div>
  );
};

export default Pricing;
