const Item = require('../../models/item');
const Favorites = require('../../models/favorites');
const User = require('../../models/user');

module.exports = {
	index,
	show,
	getFavorites,
	addToFavorites,
	removeFromFavorites
};

function jsonItem(req, res) {
	res.json(res.locals.data.todo);
}

function jsonItems(req, res) {
	res.json(res.locals.data.todos);
}

/****** R - Read ********/
async function index(req, res, next) {
	try {
		const items = await Item.find({}).sort('name').populate('category').exec();
		// re-sort based upon the sortOrder of the categories
		items.sort((a, b) => a.category.sortOrder - b.category.sortOrder);
		res.status(200).json(items);
	} catch (e) {
		res.status(400).json({ msg: e.message });
	}
}

async function show(req, res) {
	try {
		const item = await Item.findById(req.params.id);
		res.status(200).json(item);
	} catch (e) {
		res.status(400).json({ msg: e.message });
	}
}

async function getFavorites(req, res) {
	try {
		const favorites = await Favorites.find({
			user: req.user._id
			// isLiked: true
		})
			.sort('-updatedAt')
			.exec();
		res.status(200).json(favorites);
	} catch (error) {
		res.status(400).json({ msg: error.message });
	}
}

async function addToFavorites(req, res, next) {
	try {
		const item = await Item.findById(req.params.id);
		const user = await User.findById(req.user._id).populate('favorites');
		console.log(user);
		if (!item) {
			return res.status(404).json({ msg: 'Item not found' });
		}
		if (!user.favorites) {
			const newFavorites = new Favorites({
				user: req.user._id,
				items: [item], // Use 'items' as per your schema
				user: Favorites.isliked === true
			});
			await newFavorites.save();
			user.favorites = newFavorites._id;
		} else {
			// Check if the item is already in the user's favorites to avoid duplicates
			if (!user.favorites.items.includes(item._id)) {
				user.favorites.items.push(item._id);
			} else {
				return res.status(404).json({ msg: 'Item already in favorites' });
			}
		}
		await user.save();
		res.json(user);
	} catch (e) {
		console.error('Error:', e);
		res.status(500).json({ msg: 'Server error' });
	}
}

async function removeFromFavorites(req, res, next) {
	try {
		const item = await Item.findById(req.params.id);
		const user = await User.findById(req.user._id).populate('favorites');
		console.log(user);
		if (!item) {
			return res.status(404).json({ msg: 'Item not found' });
		}
		if (!user.favorites) {
			const newFavorites = new Favorites({
				user: req.user._id,
				items: [item] // Use 'items' as per your schema
			});
			await newFavorites.save();
			user.favorites = newFavorites._id;
		} else {
			// Check if the item is already in the user's favorites to avoid duplicates
			if (!user.favorites.items.includes(item._id)) {
				user.favorites.items.pull(item._id);
			} else {
				return res.status(404).json({ msg: 'Item already in favorites' });
			}
		}
		await user.save();
		res.json(user);
	} catch (e) {
		console.error('Error:', e);
		res.status(500).json({ msg: 'Server error' });
	}
}