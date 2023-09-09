require('dotenv').config();
const axios = require('axios');

const pexKey = process.env.PEXELSKEY;

const getPexelsData = async () => {
	try {
		const pexelsApiUrlVideos = 'https://api.pexels.com/videos/search';
		const pexelsApiUrlPhotos = 'https://api.pexels.com/v1/search';
		const apiKey = pexKey;
		//console.log(apiKey);

		const [videosResponse, photosResponse] = await Promise.all([
			axios.get(pexelsApiUrlVideos, {
				params: {
					per_page: 8,
					query: 'interior design'
				},
				headers: {
					Authorization: apiKey
				}
			}),
			axios.get(pexelsApiUrlPhotos, {
				params: {
					per_page: 1,
					query: 'interior design'
				},
				headers: {
					Authorization: apiKey
				}
			})
		]);

		const videos = videosResponse.data.videos || [];
		const photos = photosResponse.data.photos || [];
		const mergedData = [...videos, ...photos];
		//console.log('SERVER', mergedData);

		return mergedData;
	} catch (error) {
		console.error('Error fetching data from Pexels:', error);
		throw error;
	}
};

module.exports = { getPexelsData };
