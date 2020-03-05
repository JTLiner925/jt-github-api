const apiType = 'owner';
const searchURL = 'https://api.github.com/users';

function formatQueryParams(params){
  const queryItems = Object.keys(params)
    .map(key => `${key}=${params[key]}`);
  return queryItems.join('&');
}

function displayResults(responseJson, maxResults){
  $('#results-list').empty();
  for(let i = 0; i< responseJson.username.length & i<maxResults; i++){
    $('#results-list').append(
      `<li><h3>${responseJson.username[i].full_name}</h3>
      <h4><a href="${responseJson.username[i].url}">${responseJson.username[i].name}</a></h4>
      </li>`
    );}
  $('#results').removeClass('hidden');
}
function getUserRepos(query, maxResults=20) {
  const params = {
    q: query,
    language: 'en',
  };
  const queryString = formatQueryParams(params);
  const url = searchURL + '?' + queryString;
  console.log(url);

  const options = {
    headers: new Headers({
      "type": apiType})
  };

  fetch(url, options)
    .then(response => { 
      if(response.ok){
        return response.json();
      }
      throw new Error(response.statusText);
    })
    .then(responseJson => displayResults(responseJson, maxResults))
    .catch(err => { $('#js-error-message')
      .text(`Something went wrong: ${err.message}`);
    });
    
}

function watchForm(){
  $('form').submit(event => {
    event.preventDefault();
    const searchTerm = $('#js-search-term').val();
    const maxResults = $('#js-max-results').val();
    getUserRepos(searchTerm, maxResults);
  });
}

$(watchForm);