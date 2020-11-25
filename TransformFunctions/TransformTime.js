const TrasofrmTime = (seconds, type) => {
    if (type === 'date') {
        return (new Date(seconds * 1000).toDateString().split('', 10).join(''))
    } else {
        return(new Date(seconds * 1000).toTimeString().split('', 5).join(''))
    }

}

module.exports =  TrasofrmTime