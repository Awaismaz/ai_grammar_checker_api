const User = require('../models/User');

exports.register = async (req, res) => {
	try {
		const {email, password} = req.body;
		const user = new User({email, password});
		await user.save();
		req.session.userId = user._id;
		res.status(201)
		   .json({message: 'User registered', user});
	} catch (err) {
		res.status(400)
		   .json({error: err.message});
	}
};

exports.login = async (req, res) => {
	try {
		const {email, password} = req.body;
		const user = await User.findOne({email});
		if (!user || !(await user.comparePassword(password))) {
			return res.status(401)
			          .json({error: 'Invalid credentials'});
		}
		req.session.userId = user._id;
		res.json({message: 'Login successful'});
	} catch (err) {
		res.status(500)
		   .json({error: err.message});
	}
};

exports.logout = (req, res) => {
	req.session.destroy(err => {
		if (err) {
			return res.status(500)
			          .json({error: 'Logout failed'});
		}
		res.clearCookie('connect.sid');
		res.json({message: 'Logged out'});
	});
};

exports.getUserSession = async (req, res) => {
	try {
		const user = await User.findById(req.session.userId)
		                       .select('-password');
		if (!user) {
			req.session.destroy();
			return res.status(404)
			          .json({error: 'User not found'});
		}
		res.json({message: 'Session valid', user});
	} catch (err) {
		res.status(500)
		   .json({error: 'Server error'});
	}
};

