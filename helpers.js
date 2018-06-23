module.exports = {
    generateNum: (id) => {
        let num;
        if (id < 10) {
            num = "00" + String(id);
        } else if (id < 100) {
            num = "0" + String(id);
        } else {
            num = String(id);
        }
        return num;
    }
}