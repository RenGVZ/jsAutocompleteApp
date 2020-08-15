const searchText = document.getElementById('search').textContent;
const matchList = document.getElementById('match-list');


// 2. make searchStates function with async and searchText in the first line leading to an arrow function
const searchStates = async searchText => {
  // make a res variable equal to await fetch('./data/states.json')
  const res = await fetch('./states.json');
  // make states variable and set it equal to await res.json()
  const states = await res.json();
  // make matches variable equal to calling filter on states
  let matches = states.filter(state => {
    // make regex var that equals new RegExp(`^${searchText}`, 'gi')
    const regex = new RegExp(`^${searchText}`, 'gi');
    // return the state name match OR the states abbreviation if it matches the regexp
    return state.name.match(regex) || state.abbr.match(regex)
  });
  // if check: if there's nothing in the searchTexxt , the matches array should be empty and the matchList's innerHtml should be empty
  if (searchText.length === 0) {
    matches = [];
    matchList.innerHTML = ''
  }

  // call the outputHtml function with matches passed in
  outputHtml(matches);
}
// 3. make an outputHtml function that takes in matches
const outputHtml = (matches) => {
  // if check: if the matches aren't empty 
  if (matches.length > 0) {
    // make an html variable that calls map on matches
    const html = matches.map(match =>
      // for each match, make a div with class of card card-body
      // make h4 tag with the match.name and match.state inside
      // make span with class texxt-primary and match.capital inside
      // finally add a <small> tag with the matches latitude and longitude inside
      ` <div class='card card-body'>
          <h4>${match.name} (${match.abbr})
          <span class='text-primary'>${match.capital}</span></h4>
          <small>Lat. ${match.lat}, Long. ${match.long}</small>
        </div>
      `
    ).join('')
  // join the mapped matches
  // take the matchList and set its innerhtml to the html variable
  matchList.innerHTML = html
  }
}

// 1. add an event listener input to search and add a searchStates callback with the value of search passed in
search.addEventListener('input', () => searchStates(search.value));