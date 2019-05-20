export default {
	search:function(text,sortBy,searchLimit){
		return fetch(`http://www.reddit.com/search.json?q=${text}&sort=${sortBy}&limit=${searchLimit}`)
		.then(response => response.json())
		.then(data=>
			{
				return (data.data.children.map(data => data.data));
			})
		.catch(err => console.log(err));
	}
};