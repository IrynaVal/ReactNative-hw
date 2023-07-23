import Svg, { Path } from "react-native-svg";

export default function LogoutSvg(props) {
  return (
    <Svg width="24" height="24" viewBox="0 0 32 32" fill="none">
      <Path
        stroke="#bdbdbd"
        stroke-linejoin="round"
        stroke-linecap="round"
        stroke-miterlimit="4"
        stroke-width="1.3333"
        d="M13.333 29.333h-6.667c-1.473 0-2.667-1.194-2.667-2.667v-21.333c0-1.473 1.194-2.667 2.667-2.667h6.667"
      ></Path>
      <Path
        stroke="#bdbdbd"
        stroke-linejoin="round"
        stroke-linecap="round"
        stroke-miterlimit="4"
        stroke-width="1.3333"
        d="M22.667 21.333l5.333-5.333-5.333-5.333"
      ></Path>
      <Path
        stroke="#bdbdbd"
        stroke-linejoin="round"
        stroke-linecap="round"
        stroke-miterlimit="4"
        stroke-width="1.3333"
        d="M28 16h-16"
      ></Path>
    </Svg>
  );
}
