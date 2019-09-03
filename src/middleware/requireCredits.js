module.exports = (req, res) => {
	if (req.user.credits < 1) {
		return res.status(402).send({ error: 'Insufficient credits.' });
	}
};
