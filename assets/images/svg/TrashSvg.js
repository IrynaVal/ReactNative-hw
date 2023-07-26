import Svg, { Path } from "react-native-svg";

export default function TrashSvg(props) {
  return (
    <Svg width="24" height="24" viewBox="0 0 32 32">
      <Path
        fill="none"
        stroke="#bdbdbd"
        stroke-linejoin="round"
        stroke-linecap="round"
        stroke-miterlimit="4"
        stroke-width="1.3333"
        d="M4 8h24"
      ></Path>
      <Path
        fill="#bdbdbd"
        d="M26 8c0-0.368-0.299-0.667-0.667-0.667s-0.667 0.298-0.667 0.667h1.333zM7.333 8c0-0.368-0.298-0.667-0.667-0.667s-0.667 0.298-0.667 0.667h1.333zM10 8c0 0.368 0.298 0.667 0.667 0.667s0.667-0.298 0.667-0.667h-1.333zM20.667 8c0 0.368 0.299 0.667 0.667 0.667s0.667-0.298 0.667-0.667h-1.333zM24.667 8v18.667h1.333v-18.667h-1.333zM24.667 26.667c0 1.105-0.895 2-2 2v1.333c1.841 0 3.333-1.492 3.333-3.333h-1.333zM22.667 28.667h-13.333v1.333h13.333v-1.333zM9.333 28.667c-1.105 0-2-0.895-2-2h-1.333c0 1.841 1.492 3.333 3.333 3.333v-1.333zM7.333 26.667v-18.667h-1.333v18.667h1.333zM11.333 8v-2.667h-1.333v2.667h1.333zM11.333 5.333c0-1.105 0.895-2 2-2v-1.333c-1.841 0-3.333 1.492-3.333 3.333h1.333zM13.333 3.333h5.333v-1.333h-5.333v1.333zM18.667 3.333c1.105 0 2 0.895 2 2h1.333c0-1.841-1.492-3.333-3.333-3.333v1.333zM20.667 5.333v2.667h1.333v-2.667h-1.333z"
      ></Path>
      <Path
        fill="none"
        stroke="#bdbdbd"
        stroke-linejoin="round"
        stroke-linecap="round"
        stroke-miterlimit="4"
        stroke-width="1.3333"
        d="M13.333 14.667v8"
      ></Path>
      <Path
        fill="none"
        stroke="#bdbdbd"
        stroke-linejoin="round"
        stroke-linecap="round"
        stroke-miterlimit="4"
        stroke-width="1.3333"
        d="M18.667 14.667v8"
      ></Path>
    </Svg>
  );
}
