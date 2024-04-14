const IngredientsSelection = ({ preferences }) => {

  return (
    <div className={"grid gap-8"}>
      <ul className={"col-span-1"}>
        {preferences.map((preference) => (
          <li key={preference.id} className="flex items-center mb-2">
            <span className="ml-2">{preference.Ingredient.name}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default IngredientsSelection;
