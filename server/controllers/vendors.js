import Vendor from "../models/Vendor.js"
export const getVendorProfile = async(req, res, next)=>{
    try{
        const id = req.id;
        const profile = await Vendor.findById(id, "id firstName lastName email")
        res.status(200).json(profile)
    }
    catch(err){
        next(err)
    }
}