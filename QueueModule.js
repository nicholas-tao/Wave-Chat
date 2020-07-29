var Queue = (module.exports = {
  uList: [],
  onAdd: function (newUser) {
    //initial function is empty
  },
  registerOnAdd: function (func) {
    this.onAdd = func;
    console.log("onAdd successfully registered.");
  },
  addUser: function (newUser) {
    if (!this.uList.includes(newUser)) {
      console.log("adding user!");
      this.uList.push(newUser);
      this.onAdd(newUser);
    }
  },
  delUser: function (user) {
    //console.log("user: ", user); //this works fine
    let index = this.uList.findIndex((s) => s.email == user.email); //find user from uList
    //console.log("uList[0]: ", this.uList[0]);
    // console.log("index: ", index);
    if (index >= 0) {
      this.uList.splice(index, 1);
      //console.log("removing the user now");
    }
  },
});
