import React from "react";

function TitleH3(props) {
  return (
    <section className="py-4">
      <h1 className="text-lg md:text-2xl lg:text-3xl xl:text-4xl tracking-tight text-secondary">
        {props.title}
      </h1>
    </section>
  );
}

export default TitleH3;
