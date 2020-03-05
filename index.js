const apiType = 'user';

token = 'f19bc45e52427997e6c6956710b1726fc24d2f13';


// function formatQueryParams(params){
//   const queryItems = Object.keys(params)
//     .map(key => `${key}=${params[key]}`);
//   return queryItems.join('&');
// }

function displayResults(responseJson){
  $('#results-list').empty();
  for(let i = 0; i< responseJson; i++){
    $('#results-list').append(
      `<li><h3>${responseJson[i].full_name}</h3>
      <h4><a href="${responseJson[i].url}">${responseJson[i].name}</a></h4>
      </li>`
    );}
  $('#results').removeClass('hidden');
  
}
function getUserRepos(handle) {
  // const searchURL = ;
  // const params = {
  //   q: query,
  //   language: 'en',
  // };
  // const queryString = formatQueryParams(params);
  const url = `https://api.github.com/users/${handle}/repos`;
  // console.log(url);

  const options = {
    headers: new Headers({
      // "type": apiType,
      'Accept': 'application/vnd.github.nebula-preview+json',
      "Authorization": token})
      
  };

  fetch(url, options)
    .then(response => { 
      if(response.ok){
        return response.json();
      }
      throw new Error(response.statusText);
    })
    .then(responseJson => displayResults(responseJson))
    .catch(err => { $('#js-error-message')
      .text(`Something went wrong: ${err.message}`);
    });
    
}

function watchForm(){
  $('form').submit(event => {
    event.preventDefault();
    
    const searchTerm = $('#js-search-term').val();
   
    getUserRepos(searchTerm);
  });
}

$(watchForm);