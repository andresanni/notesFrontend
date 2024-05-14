const Footer = () => {
	const footerStyle = {
		color: 'green',
		fontStyle: 'italic',
		fontSize: 16,
	};

	return (
		<footer style={footerStyle}>
			<em>
				Note app, Department of Computer Science, University of Helsinki 2024
			</em>
		</footer>
	);
};

export default Footer;
