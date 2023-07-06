const notFoundMiddleWare = (req, res) => {
    res.status(404).send('うるさい！');
};

export default notFoundMiddleWare;