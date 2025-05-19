import Address from "../models/Address.js"
// Add Address : /api/address/add
export const addAddress = async(req,res)=>{
try{
    const {address,userId} = req.body
    await Address.create({...address,userId})
    res.json({success:true,message:"Address added successfully"})
}
catch(error){
console.log(error.message);
res.json({success:false,message:error.message});
}
}

//Get Address : /api/address/get
export const getAddress = async(req,res)=>{
    console.log("Logging error");
    try{
        const { userId } = req.query;
        console.log(userId)
        if (!userId) {
            return res.status(400).json({ success: false, message: "userId is required" });
        }
        const addresses = await Address.find({ userId });
        res.json({success:true,addresses})
    }catch(error)
    {
        console.log(error.message);
        res.json({success:false,message:error.message});
    }
}