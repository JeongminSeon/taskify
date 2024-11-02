import { ReactNode } from "react";
import { containerStyle } from "./styles";

const LandingLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className={`${containerStyle} lg:max-w-[1200px]`}>{children}</div>
  );
};

export default LandingLayout;
