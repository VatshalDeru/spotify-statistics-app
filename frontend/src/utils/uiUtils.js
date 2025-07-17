// creates the header string in UserDataList compponent depening on the data type and time range
export const createDataListHeader = (dataType, timeRange) => {
  if(dataType === 'recentlyPlayedTracks') return 'Recently Played Tracks';

  // log error if either the data or timeRange are not passed in
  if(!dataType || !timeRange) {
    console.error('incorect dataType and timeRange provided.');
    return;
  }

  let headerString = '';

  // append the string unique to each data Type
  switch(dataType) {
    case 'topArtists':
      headerString += 'Top Artists';
      break;
    case 'topTracks':
      headerString += 'Top Tracks'
      break;
  }

  headerString += ' in the last ';

  // append the string unique to each time range
  switch(timeRange) {
    case 'short_term':
      headerString += '4 weeks';
      break;
    case 'medium_term':
      headerString += '6 months';
      break;
    case 'long_term':
      headerString += '12 months';
      break;
  }

  return headerString;
}

// function takes a selectedConfig property value and returns a value we can display in the UI
export const getDisplayConfigText= (key) => {
  switch(key) {
    case 'topArtists' : return 'Top Artists'
    case 'topTracks' : return 'Top Tracks'
    case 'recentlyPlayedTracks' : return 'Recently Played'
    case 'short_term' : return '4 Weeks'
    case 'medium_term' : return '6 Months'
    case 'long_term' : return '12 Months'
  }
}
