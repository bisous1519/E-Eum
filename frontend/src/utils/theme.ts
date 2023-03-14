export type ThemeType = {
  mainColor: {
    main: string;
    light: string;
    dark: string;
  };
  textColor: {
    main: string;
    light: string;
    white: string;
    error: string;
  };
  background: string;
  layerColor: {
    color: string;
    opacity: number;
  };
  grayColor: {
    darkGray: string; // 그냥 mainGray
    lightGray: string; // 핀번호 / 경계(line)
    inputIcon: string;
    inputText: string; // inputName이나 코드 입력시간 등
  };
  fontSize: {
    small: number;
    regular: number;
  };
  fontWeight: {
    thin: string;
    regular: string;
    semiBold: string;
    bold: string;
  };
  fontFamily: {
    main: string;
    title: string;
  };
  ButtonFontSize: {
    small: number;
    medium: number;
    big: number;
  };
};

export const theme: ThemeType = {
  mainColor: {
    main: "#a3d2d5",
    light: "#c7e4e4",
    dark: "#7bbdd1",
  },
  textColor: {
    main: "#1c1c1c",
    light: "#808080",
    error: "#f68888",
    white: "#fcfcfc",
  },
  background: "#fcfcfc",
  layerColor: {
    color: "#1c1c1c",
    opacity: 0.65,
  },
  grayColor: {
    darkGray: "#808080", // 그냥 mainGray
    lightGray: "#eeeeee", // 핀번호 / 경계(line)
    inputIcon: "#c8c8c8",
    inputText: "#949494", // inputName이나 코드 입력시간 등
  },
  fontSize: {
    small: 14,
    regular: 16,
  },
  fontWeight: {
    thin: "300",
    regular: "400",
    semiBold: "600",
    bold: "700",
  },
  fontFamily: {
    main: "Pretendard",
    title: "Yeongdo",
  },
  ButtonFontSize: {
    small: 12,
    medium: 16,
    big: 18,
  },
};

export default theme;
