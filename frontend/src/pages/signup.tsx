import { Auth } from "../components/auth";
import { Quote } from "../components/quote";

export const SignUp = () => {
  return (
    <>
      <div className="grid grid-cols-2">
        <div>
          <Auth/>
        </div>
        {/* Due to Mobile First Approach, it is invisible for small screen
        and becomes visible when screen size goes past large */}
        <div className="invisible lg:visible">
        <Quote />
        </div> 
      </div>
    </>
  );
};
