var Queue = module.exports = {
    uList: [],
    onAdd: function(newUser) {
        //initial function is empty
    },
    registerOnAdd: function(func) {
        this.onAdd = func;
        console.log("onAdd successfully registered.")
    },
    addUser: function(newUser) {
        console.log("adding user!")
        this.uList.push(newUser)
        this.onAdd(newUser);
    },
    delUser: function(user) {
        let index = this.uList.findIndex(user);
        if(index >= 0) {
            this.uList.splice(index, 1);
        }
    }
}