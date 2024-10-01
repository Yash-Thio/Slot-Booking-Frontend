import React from "react";

function Page() {
  return (
    <div className="ml-12 h-full flex items-center justify-center">
      <div className="w-full">
        <div className={` grid-flow-row place-items-center p-4`} id="about">
          <div className="md:grid md:grid-cols-2 gap-8 items-center justify-center py-8 px-4 xl:gap-16 sm:py-16 xl:px-16 text-center">
            <img
              alt="my picture"
              src="/lovethyself.jpeg"
              width={500}
              height={500}
            />
            <div className="mt-4 md:mt-0 text-left flex flex-col h-full justify-center">
              <div className="flex gap-3">
                <h2 className="text-4xl font-bold text-slate-500 mb-4">
                  Reach Out
                </h2>
              </div>
              <p className="text-base lg:text-lg">
                We'd love to hear from you! Whether you have an inquiry, need
                more information about our events, or have any other requests,
                feel free to reach out to us at{" "}
                <a href="mailto:example@example.com">example@example.com</a>.
                We're here to assist you and will get back to you as soon as
                possible.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Page;
