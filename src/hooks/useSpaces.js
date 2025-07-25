import { useState, useEffect } from 'react';
import * as spacesService from '../services/spaces';

export const useSpaces = () => {
    const [spaces, setSpaces] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    // Fetch all spaces
    const fetchSpaces = async () => {
        setLoading(true);
        setError(null);
        try {
            const data = await spacesService.getSpaces();
            setSpaces(data);
        } catch (err) {
            setError(err.message || 'Failed to fetch spaces');
            console.error('Error fetching spaces:', err);
        } finally {
            setLoading(false);
        }
    };

    // Fetch space by ID
    const getSpaceById = async (id) => {
        setLoading(true);
        setError(null);
        try {
            const space = await spacesService.getSpaceById(id);
            return space;
        } catch (err) {
            setError(err.message || 'Failed to fetch space');
            console.error('Error fetching space:', err);
            throw err;
        } finally {
            setLoading(false);
        }
    };

    // Search spaces with filters
    const searchSpaces = async (filters) => {
        setLoading(true);
        setError(null);
        try {
            const data = await spacesService.searchSpaces(filters);
            setSpaces(data);
            return data;
        } catch (err) {
            setError(err.message || 'Failed to search spaces');
            console.error('Error searching spaces:', err);
        } finally {
            setLoading(false);
        }
    };

    // Create space (admin only)
    const createSpace = async (spaceData) => {
        setLoading(true);
        setError(null);
        try {
            const newSpace = await spacesService.createSpace(spaceData);
            setSpaces(prev => [...prev, newSpace]);
            return newSpace;
        } catch (err) {
            setError(err.message || 'Failed to create space');
            console.error('Error creating space:', err);
            throw err;
        } finally {
            setLoading(false);
        }
    };

    // Update space (admin only)
    const updateSpace = async (id, spaceData) => {
        setLoading(true);
        setError(null);
        try {
            const updatedSpace = await spacesService.updateSpace(id, spaceData);
            setSpaces(prev => prev.map(space => 
                space.id === id ? updatedSpace : space
            ));
            return updatedSpace;
        } catch (err) {
            setError(err.message || 'Failed to update space');
            console.error('Error updating space:', err);
            throw err;
        } finally {
            setLoading(false);
        }
    };

    // Delete space (admin only)
    const deleteSpace = async (id) => {
        setLoading(true);
        setError(null);
        try {
            await spacesService.deleteSpace(id);
            setSpaces(prev => prev.filter(space => space.id !== id));
        } catch (err) {
            setError(err.message || 'Failed to delete space');
            console.error('Error deleting space:', err);
            throw err;
        } finally {
            setLoading(false);
        }
    };

    // Initialize by fetching spaces
    useEffect(() => {
        fetchSpaces();
    }, []);

    return {
        spaces,
        loading,
        error,
        fetchSpaces,
        getSpaceById,
        searchSpaces,
        createSpace,
        updateSpace,
        deleteSpace,
        refreshSpaces: fetchSpaces
    };
};

export default useSpaces;
