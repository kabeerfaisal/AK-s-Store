import mongoose from 'mongoose';

const productSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Product title is required'],
      trim: true,
      maxlength: [120, 'Title cannot exceed 120 characters'],
    },
    slug: {
      type: String,
      unique: true,
      lowercase: true,
      index: true,
    },
    description: {
      type: String,
      required: [true, 'Product description is required'],
    },
    sku: {
      type: String,
      unique: true,
      uppercase: true,
      trim: true,
    },
    price: {
      type: Number,
      required: [true, 'Price is required'],
      min: [0, 'Price must be a positive number'],
    },
    discountPrice: {
      type: Number,
      default: 0,
      validate: {
        validator: function (value) {
          return value < this.price;
        },
        message: 'Discount price ({VALUE}) must be lower than actual price',
      },
    },
    stock: {
      type: Number,
      required: [true, 'Stock quantity is required'],
      min: [0, 'Stock cannot be negative'],
      default: 0,
    },
    status: {
      type: String,
      enum: ['active', 'draft', 'out_of_stock'],
      default: 'active',
    },
    category: {
      type: String,
      required: [true, 'Category is required'],
      trim: true,
      index: true,
    },
    collectionName: {
      type: String,
      trim: true,
      default: null,
    },
    images: [
      {
        url: { type: String, required: true },
        public_id: { type: String },
        isPrimary: { type: Boolean, default: false },
      },
    ],
    sizes: [
      {
        type: String,
        enum: ['XS', 'S', 'M', 'L', 'XL', 'XXL', 'Standard'],
      },
    ],
    colors: [
      {
        name: { type: String },
        hex: { type: String },
      },
    ],
    isFeatured: {
      type: Boolean,
      default: false,
    },
    ratings: {
      average: { type: Number, default: 0, min: 0, max: 5 },
      count: { type: Number, default: 0 },
    },
  },
  {
    timestamps: true,
  }
);

// 1. Auto-generate Slug & SKU before validation
productSchema.pre('validate', function () {
  // Auto Generate Slug from Title (e.g. "Royal Silk Scarf" -> "royal-silk-scarf-a8f3")
  if (this.title && (!this.slug || this.isModified('title'))) {
    const baseSlug = this.title
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9 -]/g, '') 
      .replace(/\s+/g, '-')     
      .replace(/-+/g, '-');       

    const randomHash = Math.random().toString(36).substring(2, 7);
    this.slug = `${baseSlug}-${randomHash}`;
  }

  // Auto Generate SKU (e.g. Category "Apparel" -> "APP-9B2X71")
  if (!this.sku) {
    const categoryPrefix = this.category
      ? this.category.substring(0, 3).toUpperCase()
      : 'PRD';
    const randomCode = Math.random().toString(36).substring(2, 8).toUpperCase();
    this.sku = `${categoryPrefix}-${randomCode}`;
  }

});

// 2. Auto-update status based on stock level
productSchema.pre('save', function () {
  if (this.stock === 0 && this.status !== 'draft') {
    this.status = 'out_of_stock';
  } else if (this.stock > 0 && this.status === 'out_of_stock') {
    this.status = 'active';
  }
});

const Product = mongoose.models.Product || mongoose.model('Product', productSchema);

export default Product;