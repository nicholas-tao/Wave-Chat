var enterButton = document.getElementById("enter");
var input = document.getElementById("userInput");
var ul = document.querySelector("#customUl");
var item = document.getElementsByTagName("li");
var cbs = document.querySelectorAll("[type=checkbox]");
[].forEach.call(cbs, function (cb) {
	cb.addEventListener("click", function() {
		if(this.checked) {
			const rawResponse = fetch('dashboard/append', {
			method: 'POST',
			headers: {
			  'Accept': 'application/json',
			  'Content-Type': 'application/json'
			},
			body: JSON.stringify({append: this.name})
		  }).then(response => console.log(response));
		  console.log("Append to Interests Request Sent")
		}
		else {
			const rawResponse = fetch('/dashboard/delete', { //send POST request to delete from db
			method: 'POST',
			headers: {
			  'Accept': 'application/json',
			  'Content-Type': 'application/json'
			},
			body: JSON.stringify({del: this.name})
		  }).then(response => console.log(response));
		  console.log("Delete Interests Update Sent")
		}
		
	})
})



//LOAD INTERESTS FROM DB
const rawResponse = fetch('/dashboard/load', {
	method: 'GET',
	headers: {
		'Accept': 'application/json'
	}
}).then(response => response.json())
	.then(data => {
		console.log(data)
		for(let i = 0; i < data.length; i++) {
			document.getElementById(data[i] + "-box").checked = true
		}
	})


