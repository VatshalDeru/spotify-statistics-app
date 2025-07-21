// creates the header string in UserDataList compponent depening on the data type and time range
export const createDataListHeader = (dataType, timeRange) => {
  if(dataType === 'recentlyPlayedTracks') return 'Recently Played Tracks';

  // log error if either the data or timeRange are not passed in
  if(!dataType || !timeRange) {
    console.error('incorect dataType or timeRange provided.');
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
    default:
      console.error('incorect dataType provided.');
      return;
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
    default:
      console.error('incorect timeRange provided.');
      return;
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
    default:
      console.error('Invalid key provided');
      return undefined;
  }
}

// check if userProfileData object in context has all the values
export function isUserProfileDataComplete(userProfileData) {
  if (!userProfileData) return false;
    
  return (
    userProfileData?.external_urls?.spotify &&
    userProfileData?.images[0]?.url &&
    userProfileData?.display_name &&
    userProfileData?.id &&
    (userProfileData?.followers?.total >= 0)
  );
}

export function isUserListeningDataComplete(userListeningData) {
  if (!userListeningData) return false;

  const { topArtists, topTracks, recentlyPlayedTracks } = userListeningData;

    
  return Boolean(
    (topArtists?.short_term && topArtists?.short_term?.length >= 1 && topArtists?.short_term?.length <= 20) &&
    (topArtists?.medium_term && topArtists?.medium_term?.length >= 1 && topArtists?.medium_term?.length <= 20) &&
    (topArtists?.long_term && topArtists?.long_term?.length >= 1 && topArtists?.long_term?.length <= 20) &&
    (topTracks?.short_term && topTracks?.short_term?.length >= 1 && topTracks?.short_term?.length <= 20) &&
    (topTracks?.medium_term && topTracks?.medium_term?.length >= 1 && topTracks?.medium_term?.length <= 20) &&
    (topTracks?.long_term && topTracks?.long_term?.length >= 1 && topTracks?.long_term?.length <= 20) &&
    (recentlyPlayedTracks?.length >= 1 && recentlyPlayedTracks?.length <= 20)
  )
}