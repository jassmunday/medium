import { Auth } from "../components/auth";
import { Quote } from "../components/quote";

export const SignIn = () => {
  return (
    <>
      <div className="grid grid-cols-1 lg:grid-cols-2">
        <div>
          <Auth type="signin" />
        </div>
        {/* Due to Mobile First Approach, it is invisible for small screen
            and becomes visible when screen size goes past large */}
        <div className="hidden lg:block">
          <Quote />
        </div>
      </div>
    </>
  );
};
