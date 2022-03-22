export const CoursePics = (imageNumber) => {

    let url = ""
    switch (imageNumber) {
        case 1:
            url = require('../Assets/1.jpg');
            break;
        case 2:
            url = require('../Assets/2.jpg');
            break;
        case 3:
            url = require('../Assets/3.jpg');
            break;
        case 4:
            url = require('../Assets/4.jpg');
            break;
        case 5:
            url = require('../Assets/5.jpg');
            break;
        default:
            url = require('../Assets/1.jpg');
    }
    return url
}
