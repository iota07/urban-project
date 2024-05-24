import React from "react";

function TitleH1(props) {
  return (
    <section className="pt-8 pb-4 text-center">
      <h2 className="text-4xl md:text-6xl font-futura tracking-tight font-bold text-secondary">
        {props.title}
      </h2>
    </section>
  );
}

export default TitleH1;
