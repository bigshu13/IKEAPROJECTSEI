const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const itemSchema = require('./itemSchema');
const item = require('./item');

const lineItemSchema = new Schema ({
    quantity: {type: Number, default: 1},
    item: itemSchema
}, {
    timestamps: true,
    toJSON: {virtuals: true }
});

lineItemSchema.virtual('extPrice').get(function() {
    return this.quantity * this.item.price;
});

const orderSchema = new Schema({
    user: {type: Schema.Types.ObjectId, ref: 'User'},
    lineItems: [lineItemSchema],
    isPaid: {type: Boolean, default: false}
}, {
    timestamps: true, 
    toJSON: {virtuals: true}
});

orderSchema.virtual('orderTotal').get(function() {
    return this.lineItems.reduce((total, item) => total + item.extPrice, 0);
});

orderSchema.virtual('totalQty').get(function() {
    return this.lineItems.reduce((total, item) => total + item.quantity, 0);
});

orderSchema.virtual('orderId').get(function() {
    return this.id.slice(-6).toUpperCase();
})

orderSchema.statics.getCart = function(userId) {
    return this.findOneAndUpdate(
        {user: userId, isPaid: false},
        {user: userId},
        {upsert: true, new: true}
    );
};

orderSchema.methods.addItemToCart = async function(itemId) {
    const cart = this;

    const lineItem = cart.lineItems.find(lineItem => lineItem.item._id.equals(itemId));
    if (lineItem) {
        lineItem.quantity += 1;
    } else {
        const item = await mongoose.model('Item').findById(itemId);
        cart.lineItems.addToSet({item});
    }
    return cart.save();
};


orderSchema.methods.setItemQuantity = function(itemId, newQuantity) {
    const cart = this;

    const lineItem = cart.lineItems.find(lineItem => lineItem.item._id.equals(itemId));
    if (lineItem && newQuantity <= 0) {

        lineItem.deleteOne();
    } else if (lineItem) {
        lineItem.quantity = newQuantity;
    }
    return cart.save();
};

module.exports = mongoose.model('Order', orderSchema);