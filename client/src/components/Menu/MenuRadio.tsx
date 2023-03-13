const radioOptions = ["16/9", "4/5", "1/1"];

interface MenuRadioProps {
  setRadio: Function;
}

const MenuRadio: React.FC<MenuRadioProps> = ({ setRadio }) => {
  return (
    <div className="w-[100px] rounded-md bg-[rgba(0,0,0,0.646)] overflow-hidden">
      {radioOptions.map((radio) => (
        <p
          onClick={() => setRadio(radio)}
          className="text-white text-sm cursor-pointer p-2 w-full text-center hover:bg-[rgba(0,0,0,0.7)]"
        >
          {radio}
        </p>
      ))}
    </div>
  );
};

export default MenuRadio;
