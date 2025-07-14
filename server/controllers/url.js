const Url = require('../models/Url');
const validateUrl = require('../utils/validateUrl');
const generateUniqueId = require('../utils/generateUniqueId');

async function createShortUrl(req, res) {
    const { url } = req.body;
    const clientUrl = process.env.BASE_URL;

    if (!validateUrl(url)) {
        return res.status(400).json({ message: 'Invalid URL' });
    }

    try {
        
        const existingUrl = await Url.findOne({ url });
        if (existingUrl) {
            const shortUrl = `${clientUrl}/${existingUrl.shortUrlId}`;
            console.log('URL already exists:', shortUrl);
            return res.status(200).json({
                shortUrl: shortUrl,
                clicks: existingUrl.clicks,   
            });
        }

        const shortUrlId = await generateUniqueId();

        const newUrlDoc = new Url({
            url,
            shortUrlId,
            date: new Date(),
        });

        await newUrlDoc.save();

        const shortUrl = `${clientUrl}/${shortUrlId}`;
        return res.status(200).json({
            shortUrl: shortUrl,
            clicks: 0,
        });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: 'Server Error' });
    }
}

async function redirectToOriginalUrl(req, res) {
    const { shortUrlId } = req.params;

    try {
        const urlDoc = await Url.findOne({ shortUrlId });

        if (!urlDoc) {
            return res.status(404).json({ message: 'No URL found' });
        }

        await Url.findByIdAndUpdate(urlDoc._id, { $inc: { clicks: 1 } });


        return res.status(200).redirect(urlDoc.url);
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: 'Server Error' });
    }
}

async function deleteUrl(req, res) {
    const { url } = req.body;

    try {
        const deletedUrl = await Url.deleteOne({ url });

        if (deletedUrl.deletedCount === 0) {
            return res.status(400).json({ message: 'No such URL found' });
        }

        return res.status(200).json({ message: `URL ${url} deleted` });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: 'Server Error' });
    }
}

module.exports = {
    createShortUrl,
    redirectToOriginalUrl,
    deleteUrl,
};
