const apiType = 'user';

token = 'b6e11cae499a29d375abe68d8aebd39d130850ee';


// function formatQueryParams(params){
//   const queryItems = Object.keys(params)
//     .map(key => `${key}=${params[key]}`);
//   return queryItems.join('&');
// }

function displayResults(responseJson){
  $('#results-list').empty();
  $('#js-error-message').empty();
  for(let i = 0; i< responseJson.length; i++){
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
    $('#results-list').empty();
    const searchTerm = $('#js-search-term').val();
   
    getUserRepos(searchTerm);
   
  });
}

$(watchForm);