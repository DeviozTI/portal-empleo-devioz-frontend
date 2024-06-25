import { useEffect, useState } from 'react';
import { DataTable } from '../../components';
import AdminLayout from '../../layouts/AdminLayout';
import { FaEdit, FaTrashAlt, FaPlus, FaCheck, FaBan } from 'react-icons/fa';

// Definición de las columnas para el DataTable
const columns = [
  { Header: 'ID', accessor: 'id' },
  { Header: 'Title', accessor: 'title' },
  { Header: 'Price', accessor: 'price' },
];

// Interfaz para los datos de la oferta
interface Offer {
  id: number;
  title: string;
  price: string;
}

const DataTableOffers = () => {
  const [loading, setLoading] = useState(true);
  const [offers, setOffers] = useState<Offer[]>([]);

  // Simulación de la carga de datos
  useEffect(() => {
    const fetchData = async () => {
      // Simulación de una llamada a una API
      const response: Offer[] = await new Promise((resolve) =>
        setTimeout(() => resolve([
          { id: 1, title: 'Offer 1', price: '$10' },
          { id: 2, title: 'Offer 2', price: '$20' },
          { id: 3, title: 'Offer 3', price: '$30' },
        ]), 2000)
      );
      setOffers(response);
      setLoading(false);
    };

    fetchData();
  }, []);

  const handleEdit = (id: number) => {
    console.log('Edit offer', id);
  };

  const handleDelete = (id: number) => {
    console.log('Delete offer', id);
  };

  const handleEnable = (id: number) => {
    console.log('Enable offer', id);
  };

  const handleDisable = (id: number) => {
    console.log('Disable offer', id);
  };

  const handleCreate = () => {
    console.log('Create new offer');
  };

  return (
    <AdminLayout>
      <DataTable
        columns={columns}
        data={offers}
        loading={loading}
        title="Offers"
        onEdit={handleEdit}
        onDelete={handleDelete}
        onEnable={handleEnable}
        onDisable={handleDisable}
        onCreate={handleCreate}
      />
    </AdminLayout>
  );
};

export default DataTableOffers;
