import { useEffect, useState } from "react";
import { addProduct, updateProduct } from "../services/Admin_Services/AdminProductServices";


const INITIAL_FORM = {
    title: '',
    description: '',
    price: '',
    discountPrice: '',
    stock: '',
    category: 'Apparel',
    collectionName: '',
    sizes: [],
    isFeatured: false,
};

export function useProductForm({ isOpen, editingProduct, onSuccess, onClose }) {
    const [formData, setFormData] = useState(INITIAL_FORM)
    const [existingImages, setExistingImages] = useState([])
    const [selectedFiles, setSelectedFiles] = useState([])
    const [previews, setPreviews] = useState([]);
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        if (editingProduct) {
            setFormData({
                title: editingProduct.title || '',
                description: editingProduct.description || '',
                price: editingProduct.price || '',
                discountPrice: editingProduct.discountPrice || '',
                stock: editingProduct.stock ?? '',
                category: editingProduct.category || 'Apparel',
                collectionName: editingProduct.collectionName || '',
                sizes: editingProduct.sizes || [],
                isFeatured: editingProduct.isFeatured || false,
            });
            setExistingImages(editingProduct.images || []);
        } else {
            setFormData(INITIAL_FORM);
            setExistingImages([]);
        }
        setSelectedFiles([]);
        setPreviews([]);
        setError('');
    }, [editingProduct, isOpen]);

    useEffect(() => {
        return () => previews.forEach((url) => URL.revokeObjectURL(url))
    }, [previews])

    const updateField = (field, value) => {
        setFormData((prev) => ({...prev, [field]: value}))
    }

    const toggleSize = (size) => {
        setFormData((prev) => ({
            ...prev,
            sizes: prev.sizes.includes(size)
                ? prev.sizes.filter((s) => s !== size)
                : [...prev.sizes, size],
        }));
    };

    const addImages = (filesList) => {
        const files = Array.from(filesList)
        if (!files.length) return

        if (existingImages.length + selectedFiles.length + files.length > 5) {
            setError('Maximum 5 images are allowed per product.');
            return;
        }

        setError('')
        setSelectedFiles((prev) => [...prev, ...files])
        setPreviews((prev) => [...prev, ...files.map((f) => URL.createObjectURL(f))])
    }

    const removeExistingImage = (index) => {
        setExistingImages((prev) => prev.filter((_, i) => i !== index))
    }

    const removeNewImage = (index) => {
        URL.revokeObjectURL(previews[index])
        setSelectedFiles((prev) => prev.filter((_, i) => i !== index))
    }

    const handleSubmit = async (e) => {

        e.preventDefault()
        setError('')

        if (existingImages.length + selectedFiles.length === 0) {
            setError('Please select at least one product image.');
            return;
        }

        setSaving(true)

        try {
            const payload = new FormData()

            payload.append('title', formData.title)
            payload.append('description', formData.description);
            payload.append('price', Number(formData.price));
            payload.append('discountPrice', Number(formData.discountPrice) || 0);
            payload.append('stock', Number(formData.stock));
            payload.append('status', Number(formData.stock) > 0 ? 'active' : 'out_of_stock');
            payload.append('category', formData.category);
            payload.append('collectionName', formData.collectionName || '');
            payload.append('isFeatured', formData.isFeatured);
            payload.append('sizes', JSON.stringify(formData.sizes));

            if (editingProduct?._id) {
                payload.append('existingImages', JSON.stringify(existingImages))
            }

            selectedFiles.forEach((file) => payload.append('images', file))

            const response = editingProduct?._id
            ? await updateProduct(editingProduct._id, payload)
            : await addProduct(payload)

            if (response?.success || response) {
                onClose();
                if (typeof onSuccess === 'function') await onSuccess();
            }

        } catch (err) {
            setError(err.response?.data?.message || err.message || 'Failed to save product');
        } finally {
            setSaving(false)
        }

    }

    return {
        formData,
        existingImages,
        previews,
        saving,
        error,
        totalImagesCount: existingImages.length + previews.length,
        updateField,
        toggleSize,
        addImages,
        removeExistingImage,
        removeNewImage,
        handleSubmit,
    }
}