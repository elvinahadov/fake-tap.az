import React from "react";

const SingleCategory = ({name,id,image}) => {
  return (
    <div className="p-4 md:w-1/3 sm:mb-0 mb-6">
      <div class="rounded-lg h-64 overflow-hidden">
        <img
          alt="content"
          className="object-cover object-center h-full w-full"
          src={image}
        />
      </div>
      <h2 className="text-xl font-medium title-font text-gray-900 mt-5">
        {name}
      </h2>
    </div>
  );
};

export default SingleCategory;
