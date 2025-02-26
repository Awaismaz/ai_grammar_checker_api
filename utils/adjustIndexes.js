const adjustIndexes = (errors, originalText) => {
	return errors.map((error) => {
		const {word, startIndex, endIndex, suggestion} = error;
		const actualWord = originalText.slice(startIndex, endIndex);
		console.log('actualWord:', actualWord);
		console.log('Word:', word);
		
		if (actualWord !== word) {
			const correctedStartIndex = originalText.indexOf(word);
			if (correctedStartIndex !== -1) {
				return {
					...error,
					startIndex: correctedStartIndex,
					endIndex: correctedStartIndex + word.length,
				};
			}
		}
		return error;
	});
};

module.exports = adjustIndexes;