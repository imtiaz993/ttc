import express from 'express';
import multer from 'multer';
import cors from 'cors';
import { PNG } from 'pngjs';
import BlinkDiff from 'blink-diff';
import sharp from 'sharp';
import fs from 'fs';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import userRoutes from "./routes/User.js"
import connectDB from "./config/db.js";
dotenv.config();

const app = express();
const port = process.env.PORT || 8080;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const storage = multer.memoryStorage();
const upload = multer({
    storage: storage,
    limits: { fileSize: 20 * 1024 * 1024 },

});

connectDB()

const convertToPngBuffer = async (buffer) => {
    const convertedBuffer = await sharp(buffer)
        .ensureAlpha()
        .resize(400, 400, { fit: 'cover' })
        .png()
        .toBuffer();
    return convertedBuffer;
};


const createTempFile = async (buffer, suffix = '.png') => {
    const tempDir = path.join(__dirname, 'temp');
    if (!fs.existsSync(tempDir)) fs.mkdirSync(tempDir, { recursive: true });

    const tempPath = path.join(
        tempDir,
        `temp_${Date.now()}_${Math.random().toString(36).substring(2, 8)}${suffix}`
    );
    await sharp(buffer).png().toFile(tempPath);
    return tempPath;
};


const cleanupTempFiles = (paths) => {
    for (const filePath of paths) {
        if (fs.existsSync(filePath)) {
            try {
                fs.unlinkSync(filePath);
            } catch (err) {
                console.error('Temp file cleanup error:', err);
            }
        }
    }
};


app.post('/api/compare-images', upload.fields([
    { name: 'image1', maxCount: 1 },
    { name: 'image2', maxCount: 1 }
]), async (req, res) => {
    const tempFiles = [];

    try {
        const files = req.files;
        if (!files?.image1 || !files?.image2) {
            return res.status(400).json({ success: false, message: 'Both images are required' });
        }

        const image1Buffer = files.image1[0].buffer;
        const image2Buffer = files.image2[0].buffer;

        const isHTML = (buffer) => buffer.toString('utf8', 0, 100).includes('<html');
        if (isHTML(image1Buffer) || isHTML(image2Buffer)) {
            return res.status(400).json({ success: false, message: 'Invalid image file' });
        }

        const png1 = await convertToPngBuffer(image1Buffer);
        const png2 = await convertToPngBuffer(image2Buffer);

        const temp1 = await createTempFile(png1);
        const temp2 = await createTempFile(png2);
        const diffPath = path.join(__dirname, 'temp', `diff_${Date.now()}.png`);

        tempFiles.push(temp1, temp2, diffPath);

        const diff = new BlinkDiff({
            imageAPath: temp1,
            imageBPath: temp2,
            imageOutputPath: diffPath,
            thresholdType: BlinkDiff.THRESHOLD_PERCENT,
            threshold: 0.15,
            delta: 50,
            outputMaskOpacity: 0.9,
            outputMaskRed: 255,
            outputMaskGreen: 0,
            outputMaskBlue: 0,
            imageOutputLimit: BlinkDiff.OUTPUT_DIFFERENT
        });

        const result = await new Promise((resolve, reject) => {
            diff.run((err, res) => (err ? reject(err) : resolve(res)));
        });

        const totalPixels = result.width * result.height;
        const similarity = totalPixels > 0
            ? ((totalPixels - result.differences) / totalPixels * 100).toFixed(2)
            : '0.00';

        const isMatched = parseFloat(similarity) >= 20;

        res.json({
            success: true,
            isMatched,
            similarityPercentage: similarity,
            difference: result.differences,
            message: isMatched ? 'Images match' : `Images differ by ${result.differences} pixels`
        });
    } catch (error) {
        console.error('Image comparison error:', error);
        res.status(500).json({
            success: false,
            message: 'Image comparison failed',
            error: error.message
        });
    } finally {
        setTimeout(() => cleanupTempFiles(tempFiles), 1000);
    }
});

app.use('/api/users', userRoutes);

// Server
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
