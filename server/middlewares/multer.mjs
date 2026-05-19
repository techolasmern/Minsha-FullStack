import multer from "multer";

const storage = multer.diskStorage({
    destination: (request, file, callback) => { 
        callback(null, "./uploads");
    },
    filename: (request, file, callback) => { 
        const [_, extension] = file.mimetype.split("/");
        const fileName = crypto.randomUUID() + "." + extension;
        callback(null, fileName);
    },
});

export const upload = multer({ storage });

