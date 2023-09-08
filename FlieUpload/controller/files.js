const File = require("../models/File");
const cloudinary = require('cloudinary').v2;

//controller for localimage
const localUpload = async (req, res) => {
    try {
        const fileupload = req.files.file;
        console.log(fileupload);
        let path =
            __dirname + "/files/" + Date.now() + `.${fileupload.name.split(".")[1]}`;
        fileupload.mv(path, (err) => {
            console.log("Unable tp load");
        });
        res.json({
            message: "Success fully uploaded on server",
            success: true,
        });
    } catch (error) {
        console.log(error);
        res.json({
            success: false,
            message: "Server error",
        });
    }
};
// -------------------------------------------------------



const uploadOnCloudinary = async (file, folder) => {
    const options = {
        folder: folder // Specify the folder where you want to store the uploaded image
    };


    const result = await cloudinary.uploader.upload(file.tempFilePath, options);
    return result;
};





const imageUpload = async (req, res) => {
    try {

        const { name, tag, email } = req.body;
        console.log(name, tag, email);
        const file = req.files.imagefile;
        console.log(file)
        //validation
        const supportedType = ["jpeg", "jpg", "png"];
        const fileType = file.name.split('.')[1].toLowerCase();
        console.log(fileType);
        if (!supportedType.includes(fileType)) {
            return res.status(415).json({
                success: false,
                message: "Image type is not supported please choose appropriate type"
            });
        }

        else {
            //now we have to upload on cluodinary 
            console.log(file.tempFilePath)
            const response = await uploadOnCloudinary(file, "ammarFolder");
            console.log(response)


            // db me entry save kerna
            const fileData = new File({
                name,
                url: response.secure_url,
                email,
                tag
            });

            const savedResponse = await fileData.save();
            res.json({
                success: true,
                message: "Image is succesfully uploaded"
            })
        }
    } catch (error) {
        console.error(error);
        res.json({
            success: false,
            message: "Server side error"
        })
    }

};
// --------------vedio handler--------------------------------
const uploadVideoOnCloudinary = async (file, folder) => {
    const options = {
        folder: folder // Specify the folder where you want to store the uploaded image
    };
    console.log(file.tempFilePath);
    options.resource_type = "auto";
    const result = await cloudinary.uploader.upload(file.tempFilePath, options);
    return result;
}
const videoUpload = async (req, res) => {
    try {

        const { name, email, tag } = req.body;
        console.log(name, email, tag);
        const videoFile = req.files.videoUpload;
        console.log(videoFile);
        const supportedFileType = ["mp4", "mv"];
        const fileType = videoFile.name.split('.')[1];
        console.log(fileType);
        if (!supportedFileType.includes(fileType)) {
            return res.status(415).json({
                sucess: false,
                message: "Please upload correct file type"
            });
        }
        else {
            //upload on cloudinary

            const response = await uploadVideoOnCloudinary(videoFile, "ammarFolder");
            console.log(response);
            //update in database also
            const videoData = new File({
                name, email, url: response.secure_url, tag
            });
            res.json({
                sucess: true,
                message: "SuccessFully updated on database"
            })
        }

    } catch (error) {
        res.json({
            sucess: false,
            message: "Server side error"
        });
    }

}


























module.exports = { localUpload, imageUpload, videoUpload };



