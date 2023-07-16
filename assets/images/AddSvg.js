// import * as React from "react";
import Svg, { Circle, Path } from "react-native-svg";

export default function AddSvg(props) {
    return (
      <Svg width="25" height="25" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
<Circle cx="12.5" cy="12.5" r="12" fill="white" stroke="#FF6C00"/>
<Path fill-rule="evenodd" clip-rule="evenodd" d="M13 6H12V12H6V13H12V19H13V13H19V12H13V6Z" fill="#FF6C00"/>
</Svg>

    // <Svg height="50%" width="50%" viewBox="0 0 100 100" {...props}>
    //   <Circle
    //     cx="50"
    //     cy="50"
    //     r="45"
    //     stroke="blue"
    //     strokeWidth="2.5"
    //     fill="green"
    //   />
    //   <Rect
    //     x="15"
    //     y="15"
    //     width="70"
    //     height="70"
    //     stroke="red"
    //     strokeWidth="2"
    //     fill="yellow"
    //   />
    // </Svg>
  );
}
