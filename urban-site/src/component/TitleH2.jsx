import React from "react";

function TitleH2(props) {
  return (
    <section>
      <h1 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl tracking-tight font-bold text-primary">
        {props.title}
      </h1>
    </section>
  );
}

export default TitleH2;
