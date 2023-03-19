const radioOptions = ["16/9", "9/16", "1/1"];

interface MenuRadioProps {
  setRadio: Function;
  radio: "1/1" | "16/9" | "9/16";
}

const MenuRadio: React.FC<MenuRadioProps> = ({ setRadio, radio }) => {
  return (
    <div className="w-[100px] rounded-md bg-[rgba(0,0,0,0.646)] overflow-hidden">
      {radioOptions.map((item) => (
        <p
          onClick={() => setRadio(item)}
          className={`text-white text-sm cursor-pointer p-2 w-full text-center ${
            item === radio && "bg-[rgba(0,0,0,0.7)]"
          } hover:bg-[rgba(0,0,0,0.7)]`}
        >
          {item}
        </p>
      ))}
    </div>
  );
};

export default MenuRadio;
