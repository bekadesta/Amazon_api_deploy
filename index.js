const express = require("express")
const cors = require("cors")
  
const dotenv = require("dotenv");
dotenv.config()

// We initialize stripe with the key
const stripe = require("stripe")(process.env.STRIPE_KEY);



const app = express();
//Initializing express
app.use(cors({origin:true}))

app.use(express.json());


app.get("/", (req, res) => {
    res.status(200).json({
        message: "Successful!"
    })
})

app.post("/payment/create" , async(req, res) => {
    const total = req.query.total

    if(total > 0) {
        // console.log("Payment Recieved", total)
        // res.send(total)
        const paymentIntent = await stripe.paymentIntents.create({
            amount: total, 
            currency: "usd"
        }
        )
        res.status(201).json({
            clientSecret: paymentIntent.client_secret
        })
    }else{
        res.status(404).json(
    {
        message: "Total must be > 0"
    }
        )
    }
})

app.listen(5000, (err)=>{
    if(err) throw err
    console.log("Amazon Server running on port 5000")
})

