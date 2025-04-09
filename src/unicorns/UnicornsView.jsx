import React, { useState } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';

const UnicornsView = ({ unicorns, onCreate, onDelete, onUpdate }) => {
  const [newUnicorn, setNewUnicorn] = useState({ name: '', color: '', age: '', Power: '' });
  const [editingId, setEditingId] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewUnicorn((prev) => ({ ...prev, [name]: value }));
  };

  const handleCreateOrUpdate = () => {
    if (newUnicorn.name && newUnicorn.color) {
      if (editingId) {
        onUpdate(editingId, { ...newUnicorn, age: Number(newUnicorn.age) });
      } else {
        onCreate({ ...newUnicorn, age: Number(newUnicorn.age) });
      }

      setNewUnicorn({ name: '', color: '', age: '', Power: '' });
      setEditingId(null);
    }
  };

  const handleEdit = (unicorn) => {
    setNewUnicorn({
      name: unicorn.name,
      color: unicorn.color,
      age: unicorn.age,
      Power: unicorn.Power,
    });
    setEditingId(unicorn._id);
  };

  const handleCancelEdit = () => {
    setNewUnicorn({ name: '', color: '', age: '', Power: '' });
    setEditingId(null);
  };

  const actionBodyTemplate = (rowData) => (
    <>
      <Button
        icon="pi pi-pencil"
        className="p-button-text p-button-info mr-2"
        onClick={() => handleEdit(rowData)}
      />
      <Button
        icon="pi pi-trash"
        className="p-button-text p-button-danger"
        onClick={() => onDelete(rowData._id)}
      />
    </>
  );

  return (
    <div className="p-8" style={{ maxWidth: '100%', margin: '0 auto' }}>
      <h2 style={{ textAlign: 'center' }}>Gestor de Unicornios</h2>

      <div className="p-fluid pb-4">
        <h3>{editingId ? 'Editar Unicornio' : 'Agregar Unicornio'}</h3>
        <div className="mb-2">
          <InputText placeholder="Nombre" name="name" value={newUnicorn.name} onChange={handleChange} />
        </div>
        <div className="mb-2">
          <InputText placeholder="Color" name="color" value={newUnicorn.color} onChange={handleChange} />
        </div>
        <div className="mb-2">
          <InputText placeholder="Edad" name="age" value={newUnicorn.age} onChange={handleChange} />
        </div>
        <div className="mb-2">
          <InputText placeholder="Poder Mágico" name="Power" value={newUnicorn.Power} onChange={handleChange} />
        </div>
        <div className="flex gap-2">
          <Button
            label={editingId ? 'Actualizar Unicornio' : 'Agregar Unicornio'}
            onClick={handleCreateOrUpdate}
          />
          {editingId && (
            <Button
              label="Cancelar"
              icon="pi pi-times"
              className="p-button-secondary"
              onClick={handleCancelEdit}
            />
          )}
        </div>
      </div>

      <DataTable value={unicorns} tableStyle={{ marginTop: '2rem' }}>
        <Column field="name" header="Nombre" />
        <Column field="color" header="Color" />
        <Column field="age" header="Edad" />
        <Column field="Power" header="Poder Mágico" />
        <Column header="Acciones" body={actionBodyTemplate} />
      </DataTable>
    </div>
  );
};

export default UnicornsView;
