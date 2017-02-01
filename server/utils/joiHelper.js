'use strict';

exports.joiDetailsToObject = (details) => {

    const obj = {};
    details.forEach((detail) => {

        const path = detail.path.split('.');
        if (path.length === 1) {
            obj[path[0]] = detail;
        }
        else {
            let _obj = obj;
            path.forEach((pathFrag) => {

                if (!_obj[pathFrag]) {
                    _obj[pathFrag] = {};
                }
                _obj = _obj[pathFrag];
            });
            _obj = detail;
        }
    });

    return obj;
};

