import React from "react";

function TitleH3(props) {
  return (
    <section className="py-4">
      <h1 className="text-success text-md md:text-lg lg:text-xl xl:text-2xl font-Helvetica tracking-tight font-bold text-secondary">
        {props.title}
      </h1>
    </section>
  );
}

export default TitleH3;
