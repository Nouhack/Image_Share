import React from "react";
import VerticalSlider from "rn-vertical-slider";
import { Colors } from "../Colors";

const Slider = ({ changeVal }) => {
  return (
    <>
      <VerticalSlider
        disabled={false}
        min={0}
        max={1}
        onChange={(value) => {
          changeVal(value);
        }}
        width={25}
        height={300}
        step={0.001}
        borderRadius={5}
        minimumTrackTintColor={Colors.PRIMARY_COLOR}
        maximumTrackTintColor="transparent"
      />
    </>
  );
};

export default Slider;
