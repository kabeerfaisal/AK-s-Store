import Product from "../models/ProductModels.js"



export const getAllProducts = async (req, res)=>{
try {
    let getproducts = await Product.find()
    res.status(200).json({success: true,
      message: "Products retrieved successfully",
      count: getproducts.length,
      products: getproducts} )
} catch (error) {
    res.status(500).json({
      success: false,
      message: "Server Error: Unable to fetch products",
      error: error.message
    });
}
}


export const createProduct = async (req, res)=>{
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

    const requireFields = {title, description, price, stock, category, images}
    if (Object.values(requireFields).some(val => val === undefined || val === null || val === "")) {
        return res.status(400).json({message: 'Please provide all required fields'})
    }

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
    res.status(201).json(createdProduct)
} catch (error) {
    // console.error('EXACT ERROR LOCATION:', error.stack);
    console.error('Error creating product:', error.message);
    res.status(500).json({ message: error.message || 'Server error while creating product' });
}
}
// const updateProduct = (req, res)=>{
// try {
    
// } catch (error) {
    
// }
// }
export const deleteProduct = async (req, res)=>{
try {
    const product = await Product.findById(req.params.id)
   if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    await product.deleteOne();
    res.json({ message: 'Product deleted successfully' });
} catch (error) {
    res.status(500).json({ message: 'Server error while deleting product' });
}
}