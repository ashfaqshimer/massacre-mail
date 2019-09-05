module.exports = survey => {
	return `
	<html>
		<body>
			<div className='center'>
				<h3>I'd like your input!</h3>
				<p>Please answer the following question:</p>
				<p>${survey.body}</p>
			</div>
			<div>
				<a href='${process.env.REDIRECT_URL}/api/feedback'>Yes</a>
			</div>
			<div>
				<a href='${process.env.REDIRECT_URL}/api/feedback'>No</a>
			</div>
		</body>
	</html>`;
};
