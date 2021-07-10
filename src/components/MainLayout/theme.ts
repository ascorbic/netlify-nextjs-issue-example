import { DefaultTheme } from "styled-components";

export const theme: DefaultTheme = {
  colors: {
    blue: "#0090DF",
    bluegrey: "#C2CFD6",
    darkblue: "#002437",
    brightblue: "#00DFDF",
    green: "#8EC220",
    purple: "#C862EC",
    white: "#FFFFFF",
  },
};

declare module "styled-components" {
  export interface DefaultTheme {
    colors: {
      blue: string;
      bluegrey: string;
      darkblue: string;
      brightblue: string;
      green: string;
      purple: string;
      white: string;
    };
  }
}
