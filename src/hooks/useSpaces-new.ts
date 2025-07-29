import { useState, useEffect } from 'react';
import { getSpaces, getSpaceById, createSpace, updateSpace, deleteSpace } from '../services/spaces';
import type { Space, CreateSpaceData } from '../services/spaces';

export const useSpaces = () => {
  const [spaces, setSpaces] = useState<Space[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchSpaces = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await getSpaces();
      setSpaces(data);
    } catch (err: any) {
      setError(err.detail || 'Failed to fetch spaces');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSpaces();
  }, []);

  const createNewSpace = async (spaceData: CreateSpaceData): Promise<Space> => {
    try {
      setError(null);
      const newSpace = await createSpace(spaceData);
      setSpaces(prev => [...prev, newSpace]);
      return newSpace;
    } catch (err: any) {
      setError(err.detail || 'Failed to create space');
      throw err;
    }
  };

  const updateExistingSpace = async (id: number, spaceData: Partial<CreateSpaceData>): Promise<Space> => {
    try {
      setError(null);
      const updatedSpace = await updateSpace(id, spaceData);
      setSpaces(prev => prev.map(space => space.id === id ? updatedSpace : space));
      return updatedSpace;
    } catch (err: any) {
      setError(err.detail || 'Failed to update space');
      throw err;
    }
  };

  const deleteExistingSpace = async (id: number): Promise<void> => {
    try {
      setError(null);
      await deleteSpace(id);
      setSpaces(prev => prev.filter(space => space.id !== id));
    } catch (err: any) {
      setError(err.detail || 'Failed to delete space');
      throw err;
    }
  };

  return {
    spaces,
    loading,
    error,
    refetch: fetchSpaces,
    createSpace: createNewSpace,
    updateSpace: updateExistingSpace,
    deleteSpace: deleteExistingSpace,
  };
};

export const useSpace = (id: number) => {
  const [space, setSpace] = useState<Space | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSpace = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await getSpaceById(id);
        setSpace(data);
      } catch (err: any) {
        setError(err.detail || 'Failed to fetch space');
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchSpace();
    }
  }, [id]);

  return {
    space,
    loading,
    error,
  };
};
