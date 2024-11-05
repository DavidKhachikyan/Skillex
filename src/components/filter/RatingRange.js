import React, { useEffect, useRef, useCallback } from "react";
import "./RatingRange.css";

const RangeSlider = ({ onRatingChange, filters }) => {
  const sliderOneRef = useRef(null);
  const sliderTwoRef = useRef(null);
  const displayValOneRef = useRef(null);
  const displayValTwoRef = useRef(null);
  const sliderTrackRef = useRef(null);
  const minGap = 0;

  const slideOne = useCallback(() => {
    const sliderOne = sliderOneRef.current;
    const sliderTwo = sliderTwoRef.current;
    const displayValOne = displayValOneRef.current;

    if (parseFloat(sliderTwo.value) - parseFloat(sliderOne.value) <= minGap) {
      sliderOne.value = (parseFloat(sliderTwo.value) - minGap).toFixed(1);
    }
    displayValOne.textContent = parseFloat(sliderOne.value).toFixed(1);
    fillColor();
    onRatingChange(parseFloat(sliderOne.value), parseFloat(sliderTwo.value));
  }, [onRatingChange, minGap]); // Add dependencies

  const slideTwo = useCallback(() => {
    const sliderOne = sliderOneRef.current;
    const sliderTwo = sliderTwoRef.current;
    const displayValTwo = displayValTwoRef.current;

    if (parseFloat(sliderTwo.value) - parseFloat(sliderOne.value) <= minGap) {
      sliderTwo.value = (parseFloat(sliderOne.value) + minGap).toFixed(1);
    }
    displayValTwo.textContent = parseFloat(sliderTwo.value).toFixed(1);
    fillColor();
    onRatingChange(parseFloat(sliderOne.value), parseFloat(sliderTwo.value));
  }, [onRatingChange, minGap]);

  const fillColor = () => {
    const sliderOne = sliderOneRef.current;
    const sliderTwo = sliderTwoRef.current;
    const sliderTrack = sliderTrackRef.current;

    let percent1 = (sliderOne.value / 5.0) * 100;
    let percent2 = (sliderTwo.value / 5.0) * 100;
    sliderTrack.style.background = `linear-gradient(to right, #dadae5 ${percent1}% , #3264fe ${percent1}% , #3264fe ${percent2}%, #dadae5 ${percent2}%)`;
  };

  useEffect(() => {
    slideOne();
    slideTwo();
  }, [slideOne, slideTwo]);

  useEffect(() => {
    if (filters.rating[0] === 0 && filters.rating[1] === 5) {
      sliderOneRef.current.value = 0;
      sliderTwoRef.current.value = 5;
      slideOne();
      slideTwo();
    }
  }, [filters, slideOne, slideTwo]);

  return (
    <div className="wrapper">
      <label className="rating-label">Rating</label>
      <div className="values">
        <span ref={displayValOneRef} id="range1">
          {filters?.rating[0]}
        </span>
        <span> - </span>
        <span ref={displayValTwoRef} id="range2">
          {filters?.rating[1]}
        </span>
      </div>
      <div className="container">
        <div className="slider-track" ref={sliderTrackRef}></div>
        <input
          type="range"
          min="0.0"
          max="5.0"
          defaultValue="0"
          step="0.1"
          ref={sliderOneRef}
          onInput={slideOne}
        />
        <input
          type="range"
          min="0.0"
          max="5.0"
          defaultValue="5.0"
          step="0.1"
          ref={sliderTwoRef}
          onInput={slideTwo}
        />
      </div>
    </div>
  );
};

export default RangeSlider;
