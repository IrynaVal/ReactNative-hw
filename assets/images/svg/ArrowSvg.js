import Svg, { Path } from "react-native-svg";

export default function ArrowSvg(props) {
  return (
    <Svg width="12" height="16" viewBox="0 0 24 32">
      <Path
        fill="#fff"
        d="M12 2l0.707-0.707c-0.391-0.391-1.024-0.391-1.414 0l0.707 0.707zM21.293 12.707c0.391 0.391 1.024 0.391 1.414 0s0.39-1.024 0-1.414l-1.414 1.414zM1.293 11.293c-0.391 0.391-0.391 1.024 0 1.414s1.024 0.391 1.414 0l-1.414-1.414zM11 30c0 0.552 0.448 1 1 1s1-0.448 1-1h-2zM11.293 2.707l10 10 1.414-1.414-10-10-1.414 1.414zM11.293 1.293l-10 10 1.414 1.414 10-10-1.414-1.414zM11 2v14h2v-14h-2zM11 16v14h2v-14h-2z"
      ></Path>
    </Svg>
  );
}
