import { createContext, useCallback, useEffect, useState } from "react";
import { deleteCustomer, getAllCustomers, getCustomerDetails, updateCustomerRole } from "../services/Admin_Services/AdminCustomerServices";

export const CustomerContext = createContext()


export const CustomerProvider = ({ children }) => {

    const [customers, setCustomers] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState("")
    const [actionLoading, setActionLoading] = useState(false)

    const [selectedCustomer, setSelectedCustomer] = useState(null);
    const [customerOrders, setCustomerOrders] = useState([]);
    const [modalLoading, setModalLoading] = useState(false);

    const fetchCustomers = useCallback(async () => {
        setLoading(true)
        setError("")

        try {
            const res = await getAllCustomers()

            if (res.success) {
                setCustomers(res.customers || []);
            }
        } catch (error) {
            setError(err.response?.data?.message || "Failed to load customers.");
        } finally {
            setLoading(false)
        }
    }, [])

    useEffect(() => {
        fetchCustomers()
    }, [fetchCustomers])

    const viewCustomerDetails = async (id) => {
        setModalLoading(true)
        setError("")
        try {
            const res = await getCustomerDetails(id)

            if (res.success) {
                setSelectedCustomer(res.customer)
                setCustomerOrders(res.orders || [])
            }
        } catch (error) {
            setError(error.response?.data?.message || "Failed to fetch customer details.");
        } finally {
            setModalLoading(false);
        }
    }

    const closeCustomerModal = async () => {
        setSelectedCustomer(null)
        setCustomerOrders([])
    }

    const changeCustomerRole = async (id, role) => {
        setActionLoading(true)
        setError("")
        try {
            const res = await updateCustomerRole(id, role);
            console.log(res)
            if (res?.success) {
                setCustomers((prev) =>
                    prev.map((c) => (c._id === id ? { ...c, role: role } : c))
                );
                return true;
            }
        } catch (error) {
            setError(error.response?.data?.message || "Failed to update role.");
            return false;
        } finally {
            setActionLoading(false)
        }
    }

    const removeCustomer = async (id) => {
        setActionLoading(true)
        setError("")

        try {
            const res = await deleteCustomer(id);
            if (res?.success) {
                setCustomers((prev) => prev.filter((c) => c._id !== id));
                return true;
            }
        } catch (error) {
            setError(err.response?.data?.message || "Failed to delete customer.");
            return false;
        } finally {
            setActionLoading(false);
        }

    }

    return (
        <CustomerContext.Provider value={{ customers, loading, error, actionLoading, selectedCustomer, customerOrders, modalLoading, fetchCustomers, viewCustomerDetails, closeCustomerModal, changeCustomerRole, removeCustomer }}>
            {children}
        </CustomerContext.Provider>
    )
}