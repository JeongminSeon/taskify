import LandingLayout from "../components/Landing/LandingLayout";
import LandingHeader from "../components/Landing/LandingHeader";
import LandingBanner from "../components/Landing/LandingBanner";
import LandingInfo from "../components/Landing/LandingInfo";
import LandingFooter from "../components/Landing/LandingFooter";

const index = () => {
  return (
    <div className="bg-black100 h-vh">
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
