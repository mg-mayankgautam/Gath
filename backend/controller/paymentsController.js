const Razorpay = require('razorpay');
const bodyparser = require('body-parser');
const fs = require('fs');
const Order = require('../models/ordersDB.js');  // Import the Order model
// const productsDB = require("../models/productsDB.js")
const nodemailer = require('nodemailer');

// Replace with your Razorpay credentials
const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET,
});


module.exports.createOrder = async (req, res) => {
    try {
        console.log('reached create-order');
        const { amount, currency, receipt, notes } = req.body;

        // Validate inputs
        if (!amount || !currency || !receipt) {
            return res.status(400).json({ status: 'error', message: 'Invalid input data' });
        }

        const options = {
            amount: amount * 100, // Convert to smallest unit
            currency,
            receipt,
            notes,
        };
        console.log('2');

        const order = await razorpay.orders.create(options);
        console.log('reached create-order', order);


        // Save order to MongoDB
        const newOrder = new Order({
            order_id: order.id,
            amount: order.amount,
            currency: order.currency,
            receipt: order.receipt,
            status: 'created',
        });

        await newOrder.save();  // Save the order to the database

        res.status(201).json(order); // Send order details to frontend
    } catch (error) {
        console.error('Order creation error:', error);
        res.status(500).json({ status: 'error', message: 'Error creating order' });
    }
};



const { validateWebhookSignature } = require('razorpay/dist/utils/razorpay-utils');

// Route to handle payment verification
module.exports.verifyPayment = async (req, res) => {
    try {
        const { razorpay_order_id, razorpay_payment_id, razorpay_signature,
            firstName, lastName, email, phone, country, address, city, state, totalPrice, cartItems }
            = req.body;

        const updatedCartItems = await Promise.all(
            cartItems.map(async (product) => {
                const foundProduct = await Order.findById(product.id).select("code name"); // Fetch only code and name
                if (foundProduct) {
                    return {
                        code: foundProduct.code,
                        name: foundProduct.name,
                        quantity: product.quantity, // Retain quantity if needed
                        price: product.price,
                        metal: product.metal || "Not Selected",  // Default metal to "Not Selected"
                        option: product.option || "NA",  // Default option to "Not Specified"
                        shape: product.shape || "NA",  // Default shape to "Unknown Shape"
                        size: product.size || "NA",  // Default size to "Unknown Size"
                        sizeType: product.sizeType || "NA",
                    };
                }
                return null; // Handle cases where the product is not found
            })
        );

        // Remove null values (in case some products were not found)
        const filteredCartItems = updatedCartItems.filter(item => item !== null);
        console.log(filteredCartItems);



        if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
            return res.status(400).json({ status: 'error', message: 'Invalid payment data' });
        }

        const secret = process.env.RAZORPAY_KEY_SECRET;
        const body = razorpay_order_id + '|' + razorpay_payment_id;

        const isValidSignature = validateWebhookSignature(body, razorpay_signature, secret);

        if (isValidSignature) {
            // Update order status in MongoDB
            const order = await Order.findOne({ order_id: razorpay_order_id });

            if (order) {
                order.status = 'paid';
                order.payment_id = razorpay_payment_id;
                await order.save();  // Save the updated order

                let transporter = nodemailer.createTransport({
                    service: 'gmail',
                    auth: {
                        user: 'noreply.moheera@gmail.com',
                        pass: 'hnnoaicgnezlcjzu'
                    }
                });



                let mailContent = {
                    from: 'noreply.moheera@gmail.com',
                    to: 'moheerajewels@gmail.com',
                    subject: `Order Confirmation - ${razorpay_order_id}`,
                    text:
                        `A new Order has been received. Below are the details:
                
            Order Details:
                ${filteredCartItems.map((item, index) => {
                            return `
                    ${index + 1}. Product Code: ${item.code} - ${item.name} 
                - Quantity: ${item.quantity} 
                - Price: ${item.price} 
                - Metal: ${item.metal || "Not Selected"}
                - Option: ${item.option || "NA"}
                - Shape: ${item.shape || "NA"}
                - Size: ${item.size || "NA"}
                - Size Type: ${item.sizeType || "NA"} 
                    `
                        }
                        )}

            Client Details 
                - Name: ${firstName} ${lastName}  
                - Email: ${email}  
                - Phone: ${phone}  
                - Country: ${country}  
                - Address: ${address}  
                - City: ${city}  
                - State: ${state}  

            Total Price Paid: ${totalPrice} 

                
            Best Regards
                `
                }

                let customerMailContent = {
                    from: 'noreply.moheera@gmail.com',
                    to: email, // Customer's email
                    subject: `Your Order Confirmation - ${razorpay_order_id}`,
                    text: `Thank you for your order! Below are the details of your purchase:
                
            Order Details:
                ${filteredCartItems.map((item, index) => {
                        return `
                    ${index + 1}. Product Code: ${item.code} - ${item.name} 
                - Quantity: ${item.quantity} 
                - Price: ${item.price} 
                - Metal: ${item.metal || "Not Selected"}
                - Option: ${item.option || "NA"}
                - Shape: ${item.shape || "NA"}
                - Size: ${item.size || "NA"}
                - Size Type: ${item.sizeType || "NA"} 
                    `
                    }
                    )}

            Your Details 
                - Name: ${firstName} ${lastName}  
                - Email: ${email}  
                - Phone: ${phone}  
                - Country: ${country}  
                - Address: ${address}  
                - City: ${city}  
                - State: ${state}  

            Total Price Paid: ${totalPrice} 
                
            We will notify you once your order is shipped. Thank you for shopping with us!
                
            Best Regards
                    `
                };

                // Send email to owner
                transporter.sendMail(mailContent, function (err, val) {
                    if (err) {
                        console.log(err);
                        res.send({ status: 'error', message: 'Error sending email to owner' });
                    } else {
                        console.log(val.response, 'Email sent to owner');
                    }
                });

                transporter.sendMail(customerMailContent, function (err, val) {
                    if (err) {
                        console.log(err)
                        res.send({ status: 'error', message: 'Error Booking Appointment, try again' });
                    } else {
                        console.log(val.response, 'mail sent success')
                        res.send({ status: 'success', message: 'Appointment Booked Successfully' });
                    }

                })

            }

            res.status(200).json({ status: 'ok', message: 'Payment verification successful' });

        } else {
            res.status(400).json({ status: 'verification_failed', message: 'Invalid signature' });
        }
    } catch (error) {
        console.error('Payment verification error:', error);
        res.status(500).json({ status: 'error', message: 'Error verifying payment' });
    }
};
