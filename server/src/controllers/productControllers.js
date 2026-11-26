import mongoose from "mongoose";
import Product from "../models/ProductModels.js"
import { deleteFromCloudinary, uploadToCloudinary } from "../config/cloudinary.js";

const parseField = (field, fallback = []) => {
    if (!field) return fallback
    if (typeof field === "string") {
        try {
            return JSON.parse(field)
        } catch {
            return fallback
        }
    }
    return field
}

export const getProductById = async (req, res) => {
    try {
        const { id } = req.params

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({
                success: false,
                message: 'Invalid product ID format'
            })
        }
        const product = await Product.findById(id).lean()

        if (!product) {
            return res.status(404).json({
                success: false,
                message: 'Product not found'
            });
        }

        res.status(200).json({
            success: true,
            product
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Server Error: Unable to fetch product',
            error: error.message
        });
    }
}

export const getProductsByFilters = async (req, res) => {
    try {
        const { id } = req.params
        console.log(req.params.id)
        const { includeInactive, sort, category, search, page = 1, limit = 10 } = req.query
        const targetCategory = id || category || 'all'
        let query = {}

        const cleanSearch = (search && search !== 'undefined') ? String(search).trim() : '';
        if (cleanSearch !== '') {
            query.$or = [
                { title: { $regex: cleanSearch, $options: 'i' } },
                { category: { $regex: cleanSearch, $options: 'i' } },
                { sku: { $regex: cleanSearch, $options: 'i' } }
            ];
        }


        const isAllCategory = !targetCategory ||
            String(targetCategory).toLowerCase() === 'all' ||
            targetCategory === 'undefined';

        if (!isAllCategory) {
            query.category = { $regex: new RegExp(`^${targetCategory}$`, 'i') };
        }

        if (includeInactive === 'true' || req.user?.role === 'admin') {
            // Admin sees all products (Active, Out of Stock, Inactive)
        } else {
            // Customers see 'active' and 'out_of_stock' items, but NOT 'inactive' items
            query.status = { $in: ['active', 'out_of_stock'] };
        }

        let sortOptions = {}
        if (sort === 'price-low') {
            sortOptions.price = 1
        } else if (sort === 'price-high') {
            sortOptions.price = -1
        } else if (sort === 'newest') {
            sortOptions.createdAt = -1
        } else {
            sortOptions = { isFeatured: -1, createdAt: -1 }
        }

        const skip = (Number(page) - 1) * Number(limit)

        const products = await Product.find(query)
            .sort(sortOptions)
            .skip(skip)
            .limit(Number(limit))
            .lean()

        const totalProducts = await Product.countDocuments(query)

        res.status(200).json({
            success: true,
            count: products.length,
            totalProducts,
            totalPages: Math.ceil(totalProducts / limit),
            currentPage: Number(page),
            products
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Server Error: Unable to fetch products",
            error: error.message
        });
    }
}

export const createProduct = async (req, res) => {
    try {
        const {
            title,
            description,
            price,
            discountPrice,
            stock,
            category,
            collectionName,
            sizes,
            colors,
            isFeatured,
        } = req.body

        const existingProduct = await Product.findOne({
            title: title,
            category: category
        });

        const requireFields = { title, description, price, stock, category}

        if (Object.values(requireFields).some(val => val === undefined || val === null || val === "")) {

            return res.status(400).json({ message: 'Please provide all required fields' })

        } else if (existingProduct) {

            return res.status(400).json({
                success: false,
                message: "Product Already Exists"
            })

        } else if (!req.files || req.files.length === 0) {

            return res.status(400).json({
                success: false,
                message: 'Please upload at least one product image'
            });

        } else {

            const uploadImages = await Promise.all(
                req.files.map((file) => uploadToCloudinary(file.buffer))
            )

            const formatImages = uploadImages.map((img, index) => ({
                url: img.url,
                public_id: img.public_id,
                isPrimary: index === 0
            }))

            const product = new Product({
                title,
                description,
                price: Number(price),
                discountPrice: discountPrice ? Number(discountPrice) : 0,
                stock: Number(stock),
                category,
                collectionName: collectionName || null,
                images: formatImages,
                sizes: parseField(sizes, []),
                colors: parseField(colors, []),
                isFeatured: isFeatured || false
            })

            const createdProduct = await product.save()
            res.status(201).json({
                success: true,
                message: "Product Created Successfully",
                createdProduct
            })
        }
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to create product",
            error: error.message,
        });
    }
}
export const updateProduct = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id)
        if (!product) {
            return res.status(404).json({ message: "Product Not Found" })
        }

        let finalImages = product.images

        if (req.body.existingImages !== undefined) {
            const keptImages = parseField(req.body.existingImages, [])
            const keptIds = new Set(keptImages.map(img => img.public_id))

            const removeImages = product.images.filter(
                img => img.public_id && !keptIds.has(img.public_id)
            )

            if (removeImages.length > 0) {
                await Promise.all(removeImages.map(img => deleteFromCloudinary(img.public_id)))
            }
            finalImages = keptImages
        }

        if (req.files && req.files.length > 0) {

            const uploadedNew = await Promise.all(
                req.files.map((file) => uploadToCloudinary(file.buffer))
            )

            const formatNew = uploadedNew.map((img) => ({
                url: img.url,
                public_id: img.public_id,
                isprimary: false
            }))

            finalImages = [...finalImages, ...formatNew]
        }

        if (finalImages.length === 0) {
            return res.status(400).json({
                success: false,
                message: "Product must have at least one image"
            });
        }

        if (!finalImages.some(img => img.isPrimary)) {
            finalImages[0].isPrimary = true;
        }


        product.title = req.body.title || product.title;
        product.description = req.body.description || product.description;
        product.price = req.body.price !== undefined ? req.body.price : product.price;
        product.discountPrice = req.body.discountPrice !== undefined ? req.body.discountPrice : product.discountPrice;
        product.stock = req.body.stock !== undefined ? req.body.stock : product.stock;
        product.category = req.body.category || product.category;
        product.collectionName = req.body.collectionName !== undefined ? req.body.collectionName : product.collectionName;
        product.images = finalImages
        product.sizes =req.body.sizes !== undefined ? parseField(req.body.sizes, []) : product.sizes;
        product.colors = product.colors = req.body.colors !== undefined ? parseField(req.body.colors, []) : product.colors;
        product.isFeatured = req.body.isFeatured !== undefined ? req.body.isFeatured : product.isFeatured;
        product.status = req.body.status || product.status;

        const updatedProduct = await product.save()
        return res.status(201).json({
            message: "Product Updated Succesfully",
            success: true,
            updatedProduct

        })

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to update product",
            error: error.message,
        });
    }
}
export const deleteProduct = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id)
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

        if (product.images && product.images.length > 0) {
            await Promise.all(
                product.images.map((img) => deleteFromCloudinary(img.public_id))
            )
        }

        await product.deleteOne();
        res.json({
            message: 'Product deleted successfully',
            success: true
        });
    } catch (error) {
        res.status(500).json({
            message: 'Server error while deleting product',
            success: false
        });
    }
}