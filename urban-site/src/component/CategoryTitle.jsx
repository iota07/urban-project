import React from "react";

function CategoryTitle({ title }) {
  return (
    <>
      <h1 className="text-3xl -mt-12 mb-4 font-bold text-secondary text-center md:text-5xl lg:text-4xl lg:m-0 lg:pb-10 lg:text-start">
        {title}
      </h1>
    </>
  );
}

export default CategoryTitle;
