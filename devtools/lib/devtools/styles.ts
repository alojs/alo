const greenBlueLight = "#DDF4FD";
const greenBlueDark = "#75BFCC";
const blueDark = "#046";
const fontSize = "13px";

export const button = {
  fontSize,
  cursor: "pointer",
  color: blueDark,
  backgroundColor: greenBlueLight,
  border: "none",
  borderRadius: "2px",
  padding: "7px 17px",
};
export const buttonActive = { ...button, backgroundColor: greenBlueDark };
export const select = {
  fontSize,
  color: blueDark,
  backgroundColor: greenBlueLight,
  border: "none",
  borderRadius: "2px",
  padding: "7px 17px",
};
