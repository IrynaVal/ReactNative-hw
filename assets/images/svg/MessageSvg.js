import Svg, { Path } from "react-native-svg";

export default function MessageSvg(props) {
  return (
    <Svg width="24" height="24" viewBox="0 0 32 32">
      <Path
        fill="none"
        stroke="#bdbdbd"
        stroke-linejoin="round"
        stroke-linecap="round"
        stroke-miterlimit="4"
        stroke-width="1.3333"
        d="M4 15.333c-0.005 1.76 0.407 3.496 1.2 5.067 1.919 3.839 5.841 6.265 10.133 6.267 1.76 0.005 3.496-0.407 5.067-1.2l7.6 2.533-2.533-7.6c0.793-1.571 1.205-3.307 1.2-5.067-0.002-4.292-2.428-8.215-6.267-10.133-1.571-0.793-3.307-1.205-5.067-1.2h-0.667c-5.754 0.317-10.349 4.912-10.667 10.667v0.667z"
      ></Path>
    </Svg>
  );
}
