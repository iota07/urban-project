import React from "react";

function TitleH1(props) {
  return (
    <section className="py-4 text-center">
      <h1 className="text-4xl md:text-6xl xl:text-7xl 2xl:text-8xl font-futura tracking-tight font-bold text-secondary">
        {props.title}
      </h1>
    </section>
  );
}

export default TitleH1;
