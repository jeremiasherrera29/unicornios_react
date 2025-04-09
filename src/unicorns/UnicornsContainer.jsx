import React, { useEffect, useState } from 'react';
import UnicornsView from './UnicornsView';

const API_BASE = 'https://crudcrud.com/api/ede92fd55cba485fba2791a242c20224/unicorns';

const UnicornsContainer = () => {
  const [unicorns, setUnicorns] = useState([]);

  const fetchUnicorns = async () => {
    try {
      const res = await fetch(API_BASE);
      const data = await res.json();
      setUnicorns(data);
    } catch (error) {
      console.error("Error al traer unicornios:", error);
    }
  };

  const createUnicorn = async (unicorn) => {
    try {
      await fetch(API_BASE, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(unicorn),
      });
      fetchUnicorns();
    } catch (error) {
      console.error("Error al crear unicornio:", error);
    }
  };

  const deleteUnicorn = async (id) => {
    try {
      await fetch(`${API_BASE}/${id}`, {
        method: 'DELETE',
      });
      fetchUnicorns();
    } catch (error) {
      console.error("Error al eliminar unicornio:", error);
    }
  };

  const updateUnicorn = async (id, updatedUnicorn) => {
    try {
      await fetch(`${API_BASE}/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedUnicorn),
      });
      fetchUnicorns();
    } catch (error) {
      console.error("Error al actualizar unicornio:", error);
    }
  };

  useEffect(() => {
    fetchUnicorns();
  }, []);

  return (
    <UnicornsView
      unicorns={unicorns}
      onCreate={createUnicorn}
      onDelete={deleteUnicorn}
      onUpdate={updateUnicorn}
    />
  );
};

export default UnicornsContainer;
