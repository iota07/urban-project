import React from "react";

function TitleH2(props) {
  return (
    <section className="py-4">
      <h1 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-Helvetica tracking-tight font-bold text-primary">
        {props.title}
      </h1>
    </section>
  );
}

export default TitleH2;
