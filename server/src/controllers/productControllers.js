import Product from "../models/ProductModels.js"



export const getAllProducts = async (req, res) => {
    try {
        let getproducts = await Product.find()
        res.status(200).json({
            success: true,
            message: "Products retrieved successfully",
            count: getproducts.length,
            products: getproducts
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
                message: "Yeh product pehle se added hai! Agar stock barhana hai toh inventory update karein."
            })
        }else{

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