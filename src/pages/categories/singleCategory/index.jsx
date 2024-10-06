import React from "react";

const SingleCategory = ({name,image}) => {
  return (
    <div className="w-full p-4 sm:mb-0 mb-6">
      <div className="rounded-lg w-full h-64 overflow-hidden">
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
