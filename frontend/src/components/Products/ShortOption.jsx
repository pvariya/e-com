import React from "react";
import { useSearchParams } from "react-router-dom";

const ShortOption = () => {
  const [searchParams, setSeachParams] = useSearchParams();

  const handalShortChange = (e) => {
    const sortBy = e.target.value;
    searchParams.set("sortBy", sortBy);
    setSeachParams(searchParams);
  };
  return (
    <div className="mb-4 flex items-center justify-end">
      <select
        id="sort"
        value={searchParams.get("sortBy") || ""}
        onChange={handalShortChange}
        className="border p-2 rounded-md focus:outline-none"
      >
        <option value="">Default</option>
        <option value="priceAsc">Price: Low To High</option>
        <option value="pricedesc">Price: High To Low</option>
        <option value="popularity">Popularity</option>
        
      </select>
    </div>
  );
};

export default ShortOption;
