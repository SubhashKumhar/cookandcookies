const express = require("express");
const router = express();

const mongoose = require("mongoose");
const Product = require("../Models/Product");
const Banner = require("../Models/Banner");
const Category = require("../Models/Category");
const Order = require("../Models/Order");
const Joi = require("joi");

const productListSchema = Joi.object({
  product_cat: Joi.string().required(),
});
const addProductSchema = Joi.object({
  product_name: Joi.string().required(),
  product_cat: Joi.string().required(),
  image: Joi.string().required(),
  customize: Joi.boolean().required(),
  price: Joi.number().required(),
});
const addCategorySchema = Joi.object({
  category_name: Joi.string().required(),
  image: Joi.string().optional(),
});

const updateCategorySchema = Joi.object({
  category_name: Joi.string().required(),
  image: Joi.string().optional(),
  _id: Joi.string().required(),
});
const addBannerSchema = Joi.object({
  banner_content: Joi.string().optional(),
  image: Joi.string().required(),
});
const updateProductSchema = Joi.object({
  product_name: Joi.string().required(),
  product_cat: Joi.string().required(),
  image: Joi.string().required(),
  customize: Joi.boolean().required(),
  price: Joi.number().required(),
  _id: Joi.string().required(),
});

const updateBannerSchema = Joi.object({
  banner_content: Joi.string().optional(),
  image: Joi.string().required(),
  _id: Joi.string().required(),
});

const productDetailSchema = Joi.object({
  _id: Joi.string().required(),
});

const createOrderSchema = Joi.object({
  user_detail: Joi.object().keys({
    customer_name: Joi.string().required(),
    mobile: Joi.string().required(),
    email: Joi.string().required(),
    address: Joi.string().required(),
    landmark: Joi.string().required(),
  }),
  products: Joi.array().items(Joi.object({
    _id:Joi.string().required(),
    category_name: Joi.string().required(),
    customize: Joi.boolean().required(),
    image: Joi.string().required(),
    initial_price: Joi.number().required(),
    price: Joi.number().required(),
    product_cat: Joi.string().required(),
    product_name: Joi.string().required(),
    quantity: Joi.number().required(),
  })),
  total_amount: Joi.number().required(),
})
const sendRes = (status, code, data = [], msg = "") => {
  return {
    status,
    code,
    data,
    msg,
  };
};
// Product API
router.get("/product-list", async (req, res) => {
  try {
    let validate = productListSchema.validate(req.query);
    if (validate.error) {
      res.json(sendRes(false, 404, "", "error"));
    } else {
      if (req.query.product_cat == 'all') {
        let getAllProducts = await Product.find({});
        if (!getAllProducts) {
          res.json(sendRes(false, 404, "", "error"));
        } else {
          return res.json(sendRes(true, 200, getAllProducts.reverse(), "Successfully get"));
        }
      } else {
        let products = await Product.find({ product_cat: mongoose.Types.ObjectId(req.query.product_cat) });
        if (!products) {
          res.json(sendRes(false, 404, "", "error"));
        } else {
          return res.json(sendRes(true, 200, products.reverse(), "Successfully get"));
        }
      }

    }
  } catch (err) {
    console.log("err", err);
    return res.json(sendRes(false, 404, "", "data not found"));
  }
});


router.post("/product-add", async (req, res) => {
  console.log(req.body, 'req');
  try {
    const validate = addProductSchema.validate(req.body);
    if (validate.error) {
      res.json(sendRes(false, 404, "", "error"));
    } else {
      let category = await Category.find({
        _id: mongoose.Types.ObjectId(req.body.product_cat),
      });
      if (!category) {
        return res.json(sendRes(false, 404, "", "DATA_NULL"));
      } else {
        let saveProduct = await Product.create({
          product_name: req.body.product_name,
          product_cat: req.body.product_cat,
          image: req.body.image,
          customize: req.body.customize,
          price: req.body.price,
          category_name: category[0].category_name,
        });

        if (!saveProduct) {
          return res.json(sendRes(false, 404, "", "DATA_NULL"));
        } else {
          return res.json(sendRes(true, 200, "", "Successfully added"));
        }
      }
    }
  } catch (error) {
    console.log('error', error)
    res.json(sendRes(false, 500, [], error));
  }
});

router.put("/product-update", async (req, res) => {
  console.log(req.body.product_cat, 'req.body.product_cat');
  try {
    const validate = updateProductSchema.validate(req.body);
    if (validate.error) {
      res.json(sendRes(false, 404, "", "error"));
    } else {
      let category = await Category.find({
        _id: mongoose.Types.ObjectId(req.body.product_cat),
      });

      if (!category) {
        return res.json(sendRes(false, 404, "", "DATA_NULL"));
      } else {
        let updateProduct = await Product.findByIdAndUpdate(
          mongoose.Types.ObjectId(req.body._id),
          {
            product_name: req.body.product_name,
            product_cat: req.body.product_cat,
            image: req.body.image,
            customize: req.body.customize,
            price: req.body.price,
            category_name: category[0].category_name,
          }
        );

        if (!updateProduct) {
          return res.json(sendRes(false, 404, "", "DATA_NULL"));
        } else {
          return res.json(sendRes(true, 200, "", "Successfully update"));
        }
      }
    }
  } catch (error) {
    res.json(sendRes(false, 500, [], error));
  }
});

router.delete("/product-delete/:id", (req, res) => {
  let _id = req.params.id;
  Product.findOne({
    _id,
  }).exec((err, post) => {
    if (err || !post) {
      console.log(err, "err");
      return res.json(sendRes(false, 422, [], "Product could't found"));
    }
    if (post._id.toString() === _id.toString()) {
      console.log(post, "post");
      post.remove().then((result) => {
        res.json(sendRes(true, 200, [], "Delete Product Successfully"));
      });
    }
  });
});

router.get("/product-detail", async (req, res) => {
  try {
    let validate = productDetailSchema.validate(req.query);
    if (validate.error) {
      res.json(sendRes(false, 404, "", "error"));
    } else {
      let viewProducts = await Product.find({ _id: mongoose.Types.ObjectId(req.query._id) });
      if (!viewProducts) {
        res.json(sendRes(false, 404, "", "error"));
      } else {
        return res.json(sendRes(true, 200, viewProducts[0], "Successfully get"));
      }
    }
  } catch (err) {
    console.log("err", err);
    return res.json(sendRes(false, 404, "", "data not found"));
  }
});

// Banner API

router.get("/banner-list", async (req, res) => {
  try {
    let result = await Banner.find({});
    if (!result) {
      return res.json(sendRes(false, 404, "", "DATA_NULL"));
    } else {
      res.json(sendRes(true, 200, result.reverse(), "Banner list successfully"));
    }
  } catch (error) {
    return res.json(sendRes(false, 404, "", "DATA_NULL"));
  }
});
router.post("/banner-add", async (req, res) => {
  console.log(req.body, 'req');
  try {
    const validate = addBannerSchema.validate(req.body);
    if (validate.error) {
      res.json(sendRes(false, 404, "", "error"));
    } else {
      let saveBanner = await Banner.create({
        banner_content: req.body.banner_content,
        image: req.body.image,
      });

      if (!saveBanner) {
        return res.json(sendRes(false, 404, "", "DATA_NULL"));
      } else {
        return res.json(sendRes(true, 200, "", "Successfully add Banner"));
      }
    }
  } catch (error) {
    res.json(sendRes(false, 500, [], error));
  }
});

router.put("/banner-update", async (req, res) => {
  console.log('banner-update', req.body);
  try {
    const validate = updateBannerSchema.validate(req.body);
    if (validate.error) {
      res.json(sendRes(false, 404, "", "error"));
    } else {
      let updateBanner = await Banner.findByIdAndUpdate(
        mongoose.Types.ObjectId(req.body._id),
        {
          banner_content: req.body.banner_content,
          image: req.body.image,
        }
      );

      if (!updateBanner) {
        return res.json(sendRes(false, 404, "", "DATA_NULL"));
      } else {
        return res.json(sendRes(true, 200, "", "Successfully added"));
      }
    }
  } catch (error) {
    res.json(sendRes(false, 500, [], error));
  }
});

router.delete("/banner-delete/:id", (req, res) => {
  let _id = req.params.id;
  console.log(_id, '_id');
  Banner.findOne({
    _id,
  }).exec((err, post) => {
    if (err || !post) {
      console.log(err, "err");
      return res.json(sendRes(false, 422, [], "Banner could't found"));
    }
    if (post._id.toString() === _id.toString()) {
      console.log(post, "post");
      post.remove().then((result) => {
        res.json(sendRes(true, 200, [], "Delete Banner Successfully"));
      });
    }
  });
});

// Category API

router.get("/category-list", async (req, res) => {
  try {
    let result = await Category.find({});
    if (!result) {
      return res.json(sendRes(false, 404, "", "DATA_NULL"));
    } else {
      res.json(sendRes(true, 200, result.reverse(), "Category list successfully"));
    }
  } catch (error) {
    return res.json(sendRes(false, 404, "", "DATA_NULL"));
  }
});

router.post("/category-add", async (req, res) => {
  try {
    const validate = addCategorySchema.validate(req.body);
    if (validate.error) {
      res.json(sendRes(false, 404, "", "error"));
    } else {
      let saveCategory = await Category.create({
        category_name: req.body.category_name,
        image: req.body.image,
      });

      if (!saveCategory) {
        return res.json(sendRes(false, 404, "", "DATA_NULL"));
      } else {
        return res.json(sendRes(true, 200, "", "Successfully add Category"));
      }
    }
  } catch (error) {
    console.log("error", error);
    res.json(sendRes(false, 500, [], error));
  }
});

router.put("/category-update", async (req, res) => {
  try {
    const validate = updateCategorySchema.validate(req.body);
    if (validate.error) {
      res.json(sendRes(false, 404, "", "error"));
    } else {
      let updateCategory = await Category.findByIdAndUpdate(
        mongoose.Types.ObjectId(req.body._id),
        {
          category_name: req.body.category_name,
          description: req.body.description,
        }
      );

      if (!updateCategory) {
        return res.json(sendRes(false, 404, "", "DATA_NULL"));
      } else {
        return res.json(sendRes(true, 200, "", "Successfully added"));
      }
    }
  } catch (error) {
    res.json(sendRes(false, 500, [], error));
  }
});

router.delete("/category-delete/:id", (req, res) => {
  let _id = req.params.id;
  Category.findOne({
    _id,
  }).exec((err, post) => {
    if (err || !post) {
      console.log(err, "err");
      return res.json(sendRes(false, 422, [], "Category could't found"));
    }
    if (post._id.toString() === _id.toString()) {
      console.log(post, "post");
      post.remove().then((result) => {
        res.json(sendRes(true, 200, [], "Delete Category Successfully"));
      });
    }
  });
});

// Order API
router.post("/create-order", (req, res) => {
  let { user_detail, products, total_amount } = req.body;
  const validate = createOrderSchema.validate(req.body);
  if (validate.error) {
    console.log(validate.error,'errro');
    res.json(sendRes(false, 404, "", "error"));
  } else {
    const post = new Order({
      user_detail,
      products,
      total_amount
    });
    post
      .save()
      .then((result) => {
        console.log(result, "result");

        res.json(sendRes(true, 200, {order_id:result._id}, "Place your order successfully"));

      })
      .catch((err) => {
        res.json(sendRes(false, 500, [], err));
      });
  }
});
router.get("/order-list", async (req, res) => {
  try {
    let result = await Order.find({});
    if (!result) {
      return res.json(sendRes(false, 404, "", "DATA_NULL"));
    } else {
      res.json(sendRes(true, 200, result.reverse(), "Orders list successfully"));
    }
  } catch (error) {
    return res.json(sendRes(false, 404, "", "DATA_NULL"));
  }
});

module.exports = router;