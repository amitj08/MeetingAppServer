const getPage = ( arr, page, pageSize ) => {
    const firstIdx = ( page - 1 ) * pageSize;
    return arr.slice( firstIdx, firstIdx + pageSize );
};

module.exports = {
    getPage
};