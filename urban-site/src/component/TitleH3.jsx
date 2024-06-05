import React from "react";

function TitleH3(props) {
  return (
    <section className="py-4">
      <h1 className="text-tertiary text-md md:text-lg lg:text-xl xl:text-2xl tracking-tight text-primary">
        {props.title}
      </h1>
    </section>
  );
}

export default TitleH3;
