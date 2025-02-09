import sharp from "sharp"
import path from "path"
import fs from "fs"
const reduceSize = async(req, res, next)=>{
    let tempPath;
    try{
        if (!req.file || !req.file.path) {
            throw new Error("File not found in request.");
          }
        const originalPath = req.file.path;
        tempPath = path.join(path.dirname(originalPath), `temp-${req.file.filename}`)
        await sharp(originalPath).resize(300, 300).toFile(tempPath)
        //replace the original image by reduced sized image
        await fs.promises.rename(tempPath, originalPath)
        next()
    }
    catch(err){
        if(tempPath){
            try{
                await fs.promises.unlink(tempPath)
            }
            catch(deleteErr){
                console.log("Error deleting temp file")
                next(deleteErr)
            }
        }
        next(err)
    }
}
export default reduceSize;