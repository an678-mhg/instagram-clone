import ConvenstionHeader from "./ConvenstionHeader";

const Conventions = () => {
  return (
    <div className="w-[330px] border-r flex flex-col border-[#262626] h-full">
      <ConvenstionHeader />
      <div className="flex-1 w-full flex items-center justify-center">
        <h4 className="font-semibold">No convention yet</h4>
      </div>
    </div>
  );
};

export default Conventions;
