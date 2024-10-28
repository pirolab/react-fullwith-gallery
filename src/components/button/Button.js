import React from "react";
import "./Button.scss";

const Button = (props) => {
  const { currentSlide, index, cta } = props;

  return (
    <a
      href={cta}
      target="_blank"
      rel="noreferrer"
      className={
        index === currentSlide ? "button_cta isVisible" : "button_cta "
      }
    >
      <span>Start your trip ⯈</span>
    </a>
  );
};
export default Button;
