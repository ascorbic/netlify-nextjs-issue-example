import { StyledTitle } from "./styles";

export const Title: React.FC<TitleProps> = ({
  className,
  children,
  color = "#000000",
  ellipsis = false,
  tag = "h1",
  uppercase = false,
  ...restProps
}) => {
  return (
    <StyledTitle
      className={className}
      as={tag}
      color={color}
      ellipsis={ellipsis}
      uppercase={uppercase}
      {...restProps}
    >
      {children}
    </StyledTitle>
  );
};

export type ITitleTag = "h1" | "h2" | "h3" | "h4" | "h5" | "h6";

export interface TitleProps {
  className?: string;
  children: React.ReactNode;
  /** Sets the Title's color */
  color?: string;
  /** Display ellipsis when the title overflows */
  ellipsis?: boolean;
  /** Sets the title tag to one of the heading tags */
  tag?: ITitleTag;
  /** Makes the title in all upper case */
  uppercase?: boolean;
  style?: React.CSSProperties;
  [key: string]: unknown;
}

export default Title;
