const CryptoJS = require("crypto-js");

// MD5 '12654987' --> 60f6c0f4991073bdb49b56b3d38f2645
const md5 = (data) => {
    return CryptoJS.MD5(data).toString();
};
module.exports = md5;