import { useCallback, useEffect, useState } from "react";
import { getUsers, addUser, deleteUser, updateUser } from "./useApi";

export function useAuth() {
    const [user, setUser] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchUser = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await getUsers();
            setUser(response.data || response); 
        } catch (error) {
            console.error("Error saat mengambil data pengguna:", error);
            setError('Data pengguna tidak ditemukan');
        } finally {
            setLoading(false);
        }
    }, []);

    const registerUser = useCallback(async (userData) => {
        setLoading(true);
        setError(null);
        try {
            const response = await addUser(userData);
            await fetchUser(); 
            return response.data || response;
        } catch (error) {
            console.error("Error saat menambahkan pengguna baru:", error);
            setError('Registrasi gagal');
            throw error;
        } finally {
            setLoading(false);
        }
    }, [fetchUser]);

    const deleteUserById = useCallback(async (userId) => {
        setLoading(true);
        setError(null);
        try {
            const response = await deleteUser(userId);
            await fetchUser();
            return response.data || response;
        } catch (error) {
            console.error("Error saat menghapus pengguna:", error);
            setError('Pengguna tidak ditemukan');
            throw error;
        } finally {
            setLoading(false);
        }
    }, [fetchUser]);

    const updateUserById = useCallback(async (userId, updatedData) => {
        setLoading(true);
        setError(null);
        try {
            const response = await updateUser(userId, updatedData);
            await fetchUser();
            return response.data || response;
        } catch (error) {
            console.error("Error saat memperbarui pengguna:", error);
            setError('Perbaruan pengguna gagal');
            throw error;
        } finally {
            setLoading(false);
        }
    }, [fetchUser]);

    useEffect(() => {
        fetchUser();
    }, [fetchUser]);
    
    return {
        user,
        loading,
        error,
        fetchUser,
        registerUser,
        deleteUserById,
        updateUserById
    };
}