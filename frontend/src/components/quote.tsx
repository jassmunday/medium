export const Quote = () => {
  return (
    <>
      {/* The flex is used here to center the content in screen with flex-col to center it vertically*/}
      <div className="h-screen bg-slate-200 flex justify-center flex-col">
        {/* the flex is used here to center it horizontally without flex-col */}
        <div className="flex justify-center">
          <div className="max-w-lg">
            <div className="text-3xl font-bold">
              "The customer service I received was exceptional. The support team
              went above and beyond to address my concerns."
            </div>
            <div className="max-w-md text-xl font-semibold">
              Jules Winnfield
            </div>
            <div className="max-w-md text-sm font-semibold text-slate-400">
              CEO, Acme Inc
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
