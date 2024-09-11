import express from "express";
import Order from "../mongodb/models/order.js";

const router = express.Router();

router.route('/').post(async (req, res) => {
  try {
    const {buyer,seller,itemId,itemimage,itemname,itemauthor,itemprice,itemquantity} = req.body;
    const newOrder = Order.create({
        buyer: buyer,
        seller: seller,
        itemId: itemId,
        itemimage: itemimage,
        itemname: itemname,
        itemauthor: itemauthor,
        itemprice: itemprice,
        itemquantity: itemquantity
    })
    res.status(200).json({success: true, data: newOrder});
  } catch (error) {
    res.status(500).json({success: false, message: 'Could not store the order details'});
  }
});

router.route('/:id').get(async (req,res) => {
  const {id} = req.params;
  try{
    const data = await Order.find({buyer: id});
    res.status(200).json({success: true, data: data});
  }catch(error){
    res.status(500).json({success: false, message: ''})
  }
})
router.route('/sales/:id').get(async (req,res) => {
  const {id} = req.params;
  try{
    const data = await Order.find({seller: id});
    res.status(200).json({success: true, data: data});
  }catch(error){
    res.status(500).json({success: false, message: ''})
  }
})

export default router;
