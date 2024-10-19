import LandingLayout from "./Landing/LandingLayout";
import LandingHeader from "./Landing/LandingHeader";
import LandingBanner from "./Landing/LandingBanner";
import LandingInfo from "./Landing/LandingInfo";
import LandingFooter from "./Landing/LandingFooter";

const index = () => {
  return (
    <div className="bg-black100 h-full">
      <LandingHeader />
      <LandingLayout>
        <LandingBanner />
        <LandingInfo />
      </LandingLayout>
      <LandingFooter />
    </div>
  );
};

export default index;
