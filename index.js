// *
// * program to search data on redit using redit api
// *
// todo: check other truncate functions online
// todo: handling urls inside post.selftext


import reddit from './redditApi';
// * dom elements
const textInput = document.getElementById("search");
const rangeInput = document.getElementById("range");
const relevance = document.getElementById("relevance");
const latest = document.getElementById("latest");
const errorMsg = document.getElementById("error");
const output = document.getElementById("output");

// * functions
function submit(event){
	const text = textInput.value;
	const sortBy = (relevance.checked)?"relevance":"new";
	const searchLimit = rangeInput.value;
	// * checking for empty input:
	if(text == ''){
		showMessage("enter a search item");
	}
	// * clearing search value
	textInput.value = '';
	textInput.focus();

	// * reddit search: (handled inside module)
	let outputContent = '';
	reddit.search(text,sortBy,searchLimit)
	.then(result => {
		result.forEach(post => {
			let img = (post.preview)?post.preview.images[0].source.url:"https://proxy.duckduckgo.com/iu/?u=http%3A%2F%2Fdwglogo.com%2Fwp-content%2Fuploads%2F2015%2F11%2FReddit-Mascot-Logo.png&f=1";
			
			outputContent += `<div class="card-outer">
				<img src ="${img}">
				<div class="card">
					<h4>${post.title}</h4>
					<p>${reduceTextContent(post.selftext,100)}</p>
					<div class="center">
					<a class="btn-submit card-btn" href="${post.url}" target="_blank">Read more</a>
				</div>
				</div>
			</div>`;
			console.log(post);
		});
		output.innerHTML = outputContent;
	});
	document.getElementById("output-container").style.display = "block";
}

function showMessage(message){
	const error = document.createElement("p");
	error.innerText = message;
	errorMsg.appendChild(error);
	errorMsg.style.display = "block";
	// set time out:
	setTimeout(()=>{
		errorMsg.removeChild(error);
		errorMsg.style.display = "none";
	},3000);
}

// * event listeners
document.querySelector(".submit").addEventListener("click",submit);
//* enter also does same
textInput.addEventListener("keydown",event=>{
	if(event.keyCode === 13)
		submit();
});


// *trucate the text content:
// todo: check other truncate functions online
// todo: handling urls inside post.selftext
function reduceTextContent(text,limit){
	let index = text.indexOf(' ',limit);
	return (index != -1)?text.substring(0,index):
											text;
}

// ! NOT REQUIRED !
// * as its compulsary for one of the radio buttons to be checked 
// //function changeState(event){
// //	if(this.value == "on"){
// //		this.value = "off";
// //	}
// //	else{
// //		this.checked = false;
// //		this.value = "on";
// //	}
// //}

// * event listeners
//// relevance.addEventListener("click",changeState);
// //latest.addEventListener("click",changeState);