module.exports.roomDocList = [];
module.exports.roomDoc = class roomDoc {
    constructor(room) {
        this.room = room;
        this.c = 0;
        module.exports.roomDocList.push(this);
    }
    get count() {
        return this.c;
    }
    set count(num) {

        if(num >= 2) {
            
            const index = module.exports.roomDocList.indexOf(this);
            module.exports.roomDocList.splice(index, 1);

        }
        else {
            this.c = num;
        }
    }
};