const page = () => {
  return (
    <>
      {/* Invoice */}
      <div className="max-w-[85rem] px-4 sm:px-6 lg:px-8 mx-auto my-4 sm:my-10">
        <div className="sm:w-11/12 lg:w-3/4 mx-auto">
          {/* Card */}
          <div className="flex flex-col p-4 sm:p-10 bg-white shadow-md rounded-xl">
            {/* Grid */}
            <div className="flex justify-between">
              <div>
                <h1 className="mt-2 text-lg md:text-xl font-semibold text-purple-500">
                  StartupASD
                </h1>
              </div>
              {/* Col */}

              <div className="text-end">
                <h2 className="text-2xl md:text-3xl font-semibold text-gray-800">
                  Invoice #
                </h2>
                <span className="mt-1 block text-gray-500">3682303</span>

                <address className="mt-4 not-italic text-gray-800">
                  45 Roker Terrace
                  <br />
                  Latheronwheel
                  <br />
                  KW5 8NW, London
                  <br />
                  United Kingdom
                  <br />
                </address>
              </div>
              {/* Col */}
            </div>
            {/* End Grid */}

            {/* Grid */}
            <div className="mt-8 grid sm:grid-cols-2 gap-3">
              <div>
                <h3 className="text-lg font-semibold text-gray-800">
                  Bill to:
                </h3>
                <h3 className="text-lg font-semibold text-gray-800">
                  Sara Williams
                </h3>
                <address className="mt-2 not-italic text-gray-500">
                  280 Suzanne Throughway,
                  <br />
                  Breannabury, OR 45801,
                  <br />
                  United States
                  <br />
                </address>
              </div>
              {/* Col */}

              <div className="sm:text-end space-y-2">
                {/* Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-1 gap-3 sm:gap-2">
                  <dl className="grid sm:grid-cols-5 gap-x-3">
                    <dt className="col-span-3 font-semibold text-gray-800">
                      Invoice date:
                    </dt>
                    <dd className="col-span-2 text-gray-500">03/10/2018</dd>
                  </dl>
                  <dl className="grid sm:grid-cols-5 gap-x-3">
                    <dt className="col-span-3 font-semibold text-gray-800">
                      Due date:
                    </dt>
                    <dd className="col-span-2 text-gray-500">03/11/2018</dd>
                  </dl>
                </div>
                {/* End Grid */}
              </div>
              {/* Col */}
            </div>
            {/* End Grid */}

            {/* Table */}
            <div className="mt-6">
              <div className="border border-gray-200 p-4 rounded-lg space-y-4">
                <div className="hidden sm:grid sm:grid-cols-5">
                  <div className="sm:col-span-2 text-xs font-medium text-gray-500 uppercase">
                    Item
                  </div>
                  <div className="text-start text-xs font-medium text-gray-500 uppercase">
                    Qty
                  </div>
                  <div className="text-start text-xs font-medium text-gray-500 uppercase">
                    Rate
                  </div>
                  <div className="text-end text-xs font-medium text-gray-500 uppercase">
                    Amount
                  </div>
                </div>

                <div className="hidden sm:block border-b border-gray-200"></div>

                <div className="grid grid-cols-3 sm:grid-cols-5 gap-2">
                  <div className="col-span-full sm:col-span-2">
                    <h5 className="sm:hidden text-xs font-medium text-gray-500 uppercase">
                      Item
                    </h5>
                    <p className="font-medium text-gray-800">
                      Design UX and UI
                    </p>
                  </div>
                  <div>
                    <h5 className="sm:hidden text-xs font-medium text-gray-500 uppercase">
                      Qty
                    </h5>
                    <p className="text-gray-800">1</p>
                  </div>
                  <div>
                    <h5 className="sm:hidden text-xs font-medium text-gray-500 uppercase">
                      Rate
                    </h5>
                    <p className="text-gray-800">5</p>
                  </div>
                  <div>
                    <h5 className="sm:hidden text-xs font-medium text-gray-500 uppercase">
                      Amount
                    </h5>
                    <p className="sm:text-end text-gray-800">$500</p>
                  </div>
                </div>

                <div className="sm:hidden border-b border-gray-200"></div>

                <div className="grid grid-cols-3 sm:grid-cols-5 gap-2">
                  <div className="col-span-full sm:col-span-2">
                    <h5 className="sm:hidden text-xs font-medium text-gray-500 uppercase">
                      Item
                    </h5>
                    <p className="font-medium text-gray-800">Web project</p>
                  </div>
                  <div>
                    <h5 className="sm:hidden text-xs font-medium text-gray-500 uppercase">
                      Qty
                    </h5>
                    <p className="text-gray-800">1</p>
                  </div>
                  <div>
                    <h5 className="sm:hidden text-xs font-medium text-gray-500 uppercase">
                      Rate
                    </h5>
                    <p className="text-gray-800">24</p>
                  </div>
                  <div>
                    <h5 className="sm:hidden text-xs font-medium text-gray-500 uppercase">
                      Amount
                    </h5>
                    <p className="sm:text-end text-gray-800">$1250</p>
                  </div>
                </div>

                <div className="sm:hidden border-b border-gray-200"></div>

                <div className="grid grid-cols-3 sm:grid-cols-5 gap-2">
                  <div className="col-span-full sm:col-span-2">
                    <h5 className="sm:hidden text-xs font-medium text-gray-500 uppercase">
                      Item
                    </h5>
                    <p className="font-medium text-gray-800">SEO</p>
                  </div>
                  <div>
                    <h5 className="sm:hidden text-xs font-medium text-gray-500 uppercase">
                      Qty
                    </h5>
                    <p className="text-gray-800">1</p>
                  </div>
                  <div>
                    <h5 className="sm:hidden text-xs font-medium text-gray-500 uppercase">
                      Rate
                    </h5>
                    <p className="text-gray-800">6</p>
                  </div>
                  <div>
                    <h5 className="sm:hidden text-xs font-medium text-gray-500 uppercase">
                      Amount
                    </h5>
                    <p className="sm:text-end text-gray-800">$2000</p>
                  </div>
                </div>
              </div>
            </div>
            {/* End Table */}

            {/* Flex */}
            <div className="mt-8 flex sm:justify-end">
              <div className="w-full max-w-2xl sm:text-end space-y-2">
                {/* Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-1 gap-3 sm:gap-2">
                  <dl className="grid sm:grid-cols-5 gap-x-3">
                    <dt className="col-span-3 font-semibold text-gray-800">
                      Subtotal:
                    </dt>
                    <dd className="col-span-2 text-gray-500">$2750.00</dd>
                  </dl>

                  <dl className="grid sm:grid-cols-5 gap-x-3">
                    <dt className="col-span-3 font-semibold text-gray-800">
                      Total:
                    </dt>
                    <dd className="col-span-2 text-gray-500">$2750.00</dd>
                  </dl>

                  <dl className="grid sm:grid-cols-5 gap-x-3">
                    <dt className="col-span-3 font-semibold text-gray-800">
                      Tax:
                    </dt>
                    <dd className="col-span-2 text-gray-500">$39.00</dd>
                  </dl>

                  <dl className="grid sm:grid-cols-5 gap-x-3">
                    <dt className="col-span-3 font-semibold text-gray-800">
                      Amount paid:
                    </dt>
                    <dd className="col-span-2 text-gray-500">$2789.00</dd>
                  </dl>

                  <dl className="grid sm:grid-cols-5 gap-x-3">
                    <dt className="col-span-3 font-semibold text-gray-800">
                      Due balance:
                    </dt>
                    <dd className="col-span-2 text-gray-500">$0.00</dd>
                  </dl>
                </div>
                {/* End Grid */}
              </div>
            </div>
            {/* End Flex */}

            <div className="mt-8 sm:mt-12">
              <h4 className="text-lg font-semibold text-gray-800">
                Thank you!
              </h4>
              <p className="text-gray-500">
                If you have any questions concerning this invoice, use the
                following contact information:
              </p>
              <div className="mt-2">
                <p className="block text-sm font-medium text-gray-800">
                  example@site.com
                </p>
                <p className="block text-sm font-medium text-gray-800">
                  +1 (062) 109-9222
                </p>
              </div>
            </div>

            <p className="mt-5 text-sm text-gray-500">© 2022 Preline.</p>
          </div>
          {/* End Card */}

          {/* Buttons */}
          <div className="mt-6 flex justify-end gap-x-3">
            <a
              className="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-2xs hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none focus:outline-hidden focus:bg-gray-50"
              href="#"
            >
              <svg
                className="shrink-0 size-4"
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
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                <polyline points="7 10 12 15 17 10" />
                <line x1="12" x2="12" y1="15" y2="3" />
              </svg>
              Invoice PDF
            </a>
            <a
              className="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-transparent bg-purple-500 text-white hover:bg-purple-700 focus:outline-hidden focus:bg-purple-700 disabled:opacity-50 disabled:pointer-events-none"
              href="#"
            >
              <svg
                className="shrink-0 size-4"
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
                <polyline points="6 9 6 2 18 2 18 9" />
                <path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2" />
                <rect width="12" height="8" x="6" y="14" />
              </svg>
              Print
            </a>
          </div>
          {/* End Buttons */}
        </div>
      </div>
      {/* End Invoice */}
    </>
  );
};

export default page;
