const MenuCard = ({ menu }) => {
  return (
    <div>
      <div className="space-y-5 flex gap-7">
        <img
          src={menu.image}
          alt={`${menu.name}`}
          className="w-32 h-32 object-cover"
          style={{ borderRadius: "0px 200px 200px 200px" }}
        />
        <div className="flex gap-5">
          <div className="flex-1 text-gray-500 space-y-4">
            <h2 className="text-2xl font-semibold">{menu.name} --------</h2>
            <p className="text-sm font-semibold">{menu.recipe}</p>
          </div>
          <p className="text-[#BB8506] text-xl font-bold">${menu.price}</p>
        </div>
      </div>
      
    </div>
  );
};

export default MenuCard;
