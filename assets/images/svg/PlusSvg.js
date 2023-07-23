import Svg, { Path } from "react-native-svg";

export default function PlusSvg(props) {
  return (
    <Svg width="13" height="13" viewBox="0 0 32 32">
      <Path
        fill="#fff"
        // fill="black"
        style="fill: var(--color1, #fff)"
        d="M17.143 1.143h-2.286v13.714h-13.714v2.286h13.714v13.714h2.286v-13.714h13.714v-2.286h-13.714v-13.714z"
      ></Path>
    </Svg>
  );
}
