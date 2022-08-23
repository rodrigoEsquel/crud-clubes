const getFileExtension = (filename) => /\.[a-z]*$/.exec(filename).pop();

export default getFileExtension;
