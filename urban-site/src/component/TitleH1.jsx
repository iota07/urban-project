import React from "react";

function TitleH1(props) {
  return (
    <section className="text-center">
      <h1 className="text-5xl md:text-6xl lg:text-7xl xl:text-8xl 2xl:text-8xl tracking-tight font-bold text-primary">
        {props.title}
      </h1>
    </section>
  );
}

export default TitleH1;
