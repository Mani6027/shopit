class APIFeatures{
    constructor(query, queryStr){
        this.query = query;
        this.queryStr = queryStr;
    }

    search() {
        const keyword = this.queryStr.keyword ? {
            name:{
                $regex: this.queryStr.keyword,
                $options: 'i'
            }
        } : {}
        
        // TODO: implement callback function to avoid getting metadata.
        this.query = this.query.find(keyword);
        return this;
    }

    filter(){

        const queryCopy = {...this.queryStr};

        // Removing fields from the queryStr
        const removeFields = ['keyword', 'limit', 'page']
        removeFields.forEach(el => delete queryCopy[el]);
        
        // Advanced filter for price, ratings etc
        // queryCopy = queryCopy.map(el => el.)
        let queryStr = JSON.stringify(queryCopy)
        queryStr = queryStr.replace(/\b(gt|gte|lt|lte)\b/g, match => `$${match}`)

        // TODO: implement callback function to avoid getting metadata.
        // By avoiding metadata we can reduce response time.
        this.query = this.query.find(JSON.parse(queryStr));
        return this;
    }

    pagination(resultPerPage) {
        const currentPage = Number(this.queryStr.page) || 1;
        const skip = resultPerPage * (currentPage - 1);

        // TODO: implement callback function to avoid getting metadata.
        this.query = this.query.limit(resultPerPage).skip(skip)
        return this;

    }
}

module.exports = APIFeatures