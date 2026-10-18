import Product from "../models/ProductModels.js"

export const getProductsByFilters = async (req, res) => {
    try {
        const { id } = req.params
        console.log(req.params.id)
        const {includeInactive, sort, category, page = 1, limit = 10 } = req.query
        const targetCategory = id || category
        let query = {}
        if (targetCategory && targetCategory !== 'all' && targetCategory !== 'undefined') {
            query.category = { $regex: new RegExp(`^${targetCategory}$`, 'i') }
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
            images,
            sizes,
            colors,
            isFeatured,
        } = req.body

        const existingProduct = await Product.findOne({
            title: title,
            category: category
        });

        const requireFields = { title, description, price, stock, category, images }

        if (Object.values(requireFields).some(val => val === undefined || val === null || val === "")) {
            return res.status(400).json({ message: 'Please provide all required fields' })
        } else if (existingProduct) {
            return res.status(400).json({
                message: "Product Already Exists"
            })
        } else {

            const product = new Product({
                title,
                description,
                price,
                discountPrice: discountPrice || 0,
                stock,
                category,
                collectionName: collectionName || null,
                images,
                sizes: sizes || [],
                colors: colors || [],
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
        product.title = req.body.title || product.title;
        product.description = req.body.description || product.description;
        product.price = req.body.price !== undefined ? req.body.price : product.price;
        product.discountPrice = req.body.discountPrice !== undefined ? req.body.discountPrice : product.discountPrice;
        product.stock = req.body.stock !== undefined ? req.body.stock : product.stock;
        product.category = req.body.category || product.category;
        product.collectionName = req.body.collectionName !== undefined ? req.body.collectionName : product.collectionName;
        product.images = req.body.images || product.images;
        product.sizes = req.body.sizes || product.sizes;
        product.colors = req.body.colors || product.colors;
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