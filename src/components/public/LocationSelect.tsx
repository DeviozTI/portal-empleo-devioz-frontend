import { useState } from "react";

const LocationSelect = ({ locations, onChange }: any) => {
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState(null);

  const handleSelect = (provincia_id: any) => {
    setSelected(provincia_id);
    onChange(provincia_id);
  };

  const filteredLocations = locations
    .map((department: any) => ({
      ...department,
      provincias: department.provincias.filter((province: any) =>
        province.provincia_nombre.toLowerCase().includes(query.toLowerCase())
      ),
    }))
    .filter((department: any) => department.provincias.length > 0);

  return (
    <div className="relative w-full md:w-auto">
      <div className="relative">
        <input
          type="text"
          placeholder="Buscar ubicación"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full px-12 py-3 text-black placeholder-gray-600 transition duration-300 bg-white border border-gray-300 rounded-full shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
        />
      </div>
      <div className="absolute z-10 w-full mt-1 overflow-y-auto bg-white border border-gray-300 rounded-lg shadow-lg max-h-60">
        {filteredLocations.map((department: any) => (
          <div key={department.departamento_id} className="p-2">
            <h4 className="font-bold">{department.departamento_nombre}</h4>
            {department.provincias.map((province: any) => (
              <div
                key={province.provincia_id}
                className={`cursor-pointer p-2 rounded hover:bg-blue-100 ${
                  selected === province.provincia_id ? "bg-blue-200" : ""
                }`}
                onClick={() => handleSelect(province.provincia_id)}
              >
                {province.provincia_nombre}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default LocationSelect;
