// formate large numbers to add commmas at every 3 digits
export const formatNumberWithCommas = (num) => {
  const numString = num.toString().split('');
  let counter = 0;

  for(let i = numString.length-1; i >= 0; i--) {
    const isMod3 = (counter % 3 === 0);
    if(isMod3 && i !== numString.length-1) {
      numString.splice(i+1, 0, ',')
    }
    counter++;
  }

  return numString.join('')
}

// function returns date in a user friendly and readable format
export const formatDate = (rawDate) => {
  // const isoDate = date;
  const date = new Date(rawDate);

  const day = date.getDate();
  const month = date.getMonth();
  const year = date.getFullYear();
  const hour = date.getHours();
  const minutes = date.getMinutes();

  const dataString = `${day}/${month}/${year} at ${hour}:${minutes}`
  // console.log(dataString)
  // console.log(formattedDate.getUtc)
  // console.log(formattedDate.toString().slice(0, -34));
  return dataString;
}
