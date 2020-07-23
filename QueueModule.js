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
        console.log(newUser);
        this.uList.push(newUser)
        this.onAdd(newUser);
    },
}