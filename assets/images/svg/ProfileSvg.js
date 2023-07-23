import Svg, { Path } from "react-native-svg";

export default function ProfileSvg(props) {
  return (
    <Svg width="24" height="24" viewBox="0 0 32 32">
      <Path
        stroke="#212121"
        stroke-linejoin="round"
        stroke-linecap="round"
        stroke-miterlimit="4"
        stroke-width="1.3333"
        d="M26.667 28v-2.667c0-2.945-2.388-5.333-5.333-5.333h-10.667c-2.946 0-5.333 2.388-5.333 5.333v2.667"
      ></Path>
      <Path
        stroke="#212121"
        stroke-linejoin="round"
        stroke-linecap="round"
        stroke-miterlimit="4"
        stroke-width="1.3333"
        d="M16 14.667c2.945 0 5.333-2.388 5.333-5.333s-2.388-5.333-5.333-5.333c-2.946 0-5.333 2.388-5.333 5.333s2.388 5.333 5.333 5.333z"
      ></Path>
    </Svg>
  );
}
