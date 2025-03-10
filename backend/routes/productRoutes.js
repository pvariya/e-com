const expresss = require("express");
const { protect, admin } = require("../middleware/authMiddleware");
const Product = require("../models/Product");
const { $where } = require("../models/User");
const productRouter = expresss.Router();

productRouter.post("/", protect, admin, async (req, res) => {
  try {
    const {
      name,
      description,
      price,
      discountPrice,
      countInStock,
      sku,
      category,
      brand,
      colors,
      sizes,
      collections,
      material,
      gender,
      img,
      isFeatured,
      isPublished,
      dimensions,
      tags,
      weight,
    } = req.body;

    const product = await Product.create({
      name,
      description,
      price,
      discountPrice,
      countInStock,
      sku,
      category,
      brand,
      colors,
      sizes,
      collections,
      material,
      gender,
      img,
      isFeatured,
      isPublished,
      dimensions,
      tags,
      weight,
      user: req.user._id,
    });

    // const createProduct =await product.save();
    res.status(201).json(product);
  } catch (error) {
    console.log(error);
    res.status(500).send("server error: " + error);
  }
});

productRouter.put("/:id", protect, admin, async (req, res) => {
  try {
    const {
      name,
      description,
      price,
      discountPrice,
      countInStock,
      sku,
      category,
      brand,
      colors,
      sizes,
      collections,
      material,
      gender,
      img,
      isFeatured,
      isPublished,
      dimensions,
      tags,
      weight,
    } = req.body;

    const product = await Product.findById(req.params.id);
    if (product) {
      product.name = name || product.name;
      product.description = description || product.description;
      product.price = price || product.price || product.price;
      product.discountPrice = discountPrice || product.discountPrice;
      product.countInStock = countInStock || product.countInStock;
      product.sku = sku || product.sku;
      product.category = category || product.category;
      product.brand = brand || product.brand;
      product.colors = colors || product.colors;
      product.sizes = sizes || product.sizes;
      product.collections = collections || product.collections;
      product.material = material || product.material;
      product.gender = gender || product.gender;
      product.img = img || product.img;
      product.isFeatured =
        isFeatured !== undefined ? isFeatured : product.isFeatured;
      product.isPublished =
        isPublished !== undefined ? isPublished : product.isPublished;
      product.dimensions = dimensions || product.dimensions;
      product.tags = tags || product.tags;
      product.weight = weight || product.weight;
    }

    const updateProduct = await product.save();
    res.json(updateProduct);
  } catch (error) {
    console.log(error);
    res.status(500).send("server error: " + error);
  }
});

productRouter.delete("/:id", protect, admin, async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (product) {
      await product.deleteOne();
      res.json({ message: "Product deleted successfully" });
    } else {
      res.status(404).json({ message: "Product not found" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send("server error: " + error);
  }
});

productRouter.get("/", async (req, res) => {
  try {
    const {
      collection,
      size,
      color,
      gender,
      minPrice,
      maxPrice,
      sortBy,
      search,
      category,
      material,
      brand,
      limit,
    } = req.query;

    let query = {};
    if (collection && collection.toLocaleLowerCase() !== "all") {
      query.collections = collection;
    }
    if (category && category.toLocaleLowerCase() !== "all") {
      query.category = category;
    }

    if (material) {
      query.material = { $in: material.split(",") };
    }
    if (brand) {
      query.brand = { $in: brand.split(",") };
    }
    if (size) {
      query.sizes = { $in: size.split(",") };
    }

    if (color) {
      query.colors = { $in: [color] };
    }
    if (gender) {
      query.gender = gender;
    }
    if (minPrice || maxPrice) {
      query.price = {};
      if (minPrice) {
        query.price.$gte = Number(minPrice);
      }
      if (maxPrice) {
        query.price.$lte = Number(maxPrice);
      }
    }

    if (search) {
      query.$or = [
        { name: { $regex: search, $options: "i" } },
        { description: { $regex: search, $options: "i" } },
      ];
    }
    let sort = {};
    if (sortBy) {
      switch (sortBy) {
        case "priceAsc":
          sort = { price: 1 };
          break;
        case "priceDesc":
          sort = { price: -1 };
          break;
        case "priceDesc":
          sort = { rating: -1 };
          break;
        default:
          break;
      }
    }

    let products = await Product.find(query)
      .sort(sort)
      .limit(Number(limit) || 0);
    res.json(products);
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Server error");
  }
});

productRouter.get("/bestSeller", async (req, res) => {
  try {
    const products = await Product.findOne().sort({
      rating: -1,
    });
    if (products) {
      res.send(products);
    } else {
      res.status(404).json({ message: "No Best seller found" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send("Server error");
  }
});

productRouter.get("/new-arrivals", async (req, res) => {
  try {
    const product = await Product.find()
      .sort({ createdAt: -1 })
      .limit(8)
      res.json(product);
  } catch (error) {
    console.log(error);
    res.status(500).send("Server error");
  }
});
productRouter.get("/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (product) {
      res.json(product);
    } else {
      res.status(404).json({ message: "Product not found" });
    }
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Server error");
  }
});

productRouter.get("/similer/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const product = await Product.findById(id);
    if (!product) return res.status(404).send("Product not found");

    const similerProduct = await Product.find({
      _id: { $ne: id },
      category: product.category,
      gender: product.gender,
    }).limit(4);
    res.json(similerProduct);
  } catch (error) {
    console.log(error);
    res.status(500).send("Server error");
  }
});

module.exports = productRouter;
