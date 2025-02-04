import Vendor from "../models/Vendor.js"
export const getVendorProfile = (req, res, next)=>{
    try{
        const id = req.id;
        const profile = Vendor.findById(id)
        console.log(profile)
        res.status(200).json(profile)
    }
    catch(err){
        next(err)
    }
}