export const debounce = (fn, delay) => {
    let timeoutID;

    return (e) => { 
        if(timeoutID){ 
            clearTimeout(timeoutID);
            timeoutID = undefined;
        };
        timeoutID = setTimeout(() => fn(e), delay)
    }
}