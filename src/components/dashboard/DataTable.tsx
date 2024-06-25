import React from 'react';
import { FaEdit, FaTrashAlt, FaPlus, FaCheck, FaBan } from 'react-icons/fa';

interface Offer {
  id: number;
  title: string;
  price: string;
}

interface DataTableProps {
  columns: { Header: string; accessor: string }[];
  data: Offer[];
  loading: boolean;
  title: string;
  onEdit: (id: number) => void;
  onDelete: (id: number) => void;
  onEnable: (id: number) => void;
  onDisable: (id: number) => void;
  onCreate: () => void;
}

// Componente DataTable
export const DataTable = ({
  columns,
  data,
  loading,
  title,
  onEdit,
  onDelete,
  onEnable,
  onDisable,
  onCreate,
}: DataTableProps) => {
  return (
    <div className="p-4 bg-white rounded-lg shadow-md">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-bold text-gray-800">{title}</h1>
        <button
          onClick={onCreate}
          className="flex items-center px-4 py-2 text-white bg-green-600 rounded hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500"
        >
          <FaPlus className="mr-2" /> Crear Oferta
        </button>
      </div>
      {loading ? (
        <p className="text-center text-gray-600">Cargando...</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white">
            <thead>
              <tr>
                {columns.map((column, index) => (
                  <th
                    key={index}
                    className="px-4 py-2 text-xs font-semibold tracking-wider text-left text-gray-700 uppercase bg-gray-100 border-b-2 border-gray-200"
                  >
                    {column.Header}
                  </th>
                ))}
                <th className="px-4 py-2 text-xs font-semibold tracking-wider text-left text-gray-700 uppercase bg-gray-100 border-b-2 border-gray-200">
                  Acciones
                </th>
              </tr>
            </thead>
            <tbody>
              {data.map((row) => (
                <tr key={row.id} className="hover:bg-gray-50">
                  {columns.map((column, colIndex) => (
                    <td
                      key={colIndex}
                      className="px-4 py-2 text-gray-700 border-b border-gray-200"
                    >
                      {row[column.accessor as keyof Offer]}
                    </td>
                  ))}
                  <td className="px-4 py-2 text-gray-700 border-b border-gray-200">
                    <div className="flex items-center space-x-2">
                      <button
                        title="Editar"
                        onClick={() => onEdit(row.id)}
                        className="text-blue-500 hover:text-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        <FaEdit />
                      </button>
                      <button
                        title="Eliminar"
                        onClick={() => onDelete(row.id)}
                        className="text-red-500 hover:text-red-700 focus:outline-none focus:ring-2 focus:ring-red-500"
                      >
                        <FaTrashAlt />
                      </button>
                      <button
                        title="Habilitar"
                        onClick={() => onEnable(row.id)}
                        className="text-green-500 hover:text-green-700 focus:outline-none focus:ring-2 focus:ring-green-500"
                      >
                        <FaCheck />
                      </button>
                      <button
                        title="Deshabilitar"
                        onClick={() => onDisable(row.id)}
                        className="text-yellow-500 hover:text-yellow-700 focus:outline-none focus:ring-2 focus:ring-yellow-500"
                      >
                        <FaBan />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};
