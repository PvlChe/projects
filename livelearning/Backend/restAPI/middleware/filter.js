const filter = require('express').Router();

const queries = {offset: 'number', filter: 'string', limit: 'number', search: 'string'};


filter.use((req, res, next) => {
    if (res.locals.items && Array.isArray(res.locals.items)) {
        for (let query in req.query) {
            if(!(query in queries)){
                res.locals.items.forEach((elem, index) => {
                    if (req.query[query] != elem[query]) {
                        delete res.locals.items[index];
                    }
                });
                //delete every null object
                res.locals.items = res.locals.items.filter(elem => elem);
            }

        }

        if (req.query.offset) {
            //check if offset longer item length
            if (req.query.offset >= res.locals.items.length) {
                let err = new HttpError('Bad Offset Parameter', codes.wrongrequest);
                next(err);
                return;
            }
            res.locals.items.splice(0, req.query.offset);
        }

        if (req.query.limit) {
            //checks if limit is smaller than item length

            if (req.query.limit < res.locals.items.length) {

                res.locals.items.splice(req.query.limit);
            }
        }
    }
    next();
});

module.exports = filter;

