import Svg, { Path } from "react-native-svg";

export default function MapSvg(props) {
  return (
    <Svg width="24" height="24" viewBox="0 0 32 32">
      <Path
        fill="none"
        stroke="#bdbdbd"
        stroke-linejoin="round"
        stroke-linecap="round"
        stroke-miterlimit="4"
        stroke-width="1.3333"
        d="M26.667 13.818c0 7.636-10.667 14.182-10.667 14.182s-10.667-6.545-10.667-14.182c0-5.422 4.776-9.818 10.667-9.818s10.667 4.396 10.667 9.818v0z"
      ></Path>
      <Path
        fill="none"
        stroke="#bdbdbd"
        stroke-linejoin="round"
        stroke-linecap="round"
        stroke-miterlimit="4"
        stroke-width="1.3333"
        d="M16 18.667c2.209 0 4-1.791 4-4s-1.791-4-4-4-4 1.791-4 4c0 2.209 1.791 4 4 4z"
      ></Path>
    </Svg>
  );
}
