const TrasofrmTime = (seconds, type) => {
    if (type === 'date') {
        return (new Date(seconds * 1000).toDateString())
    } else {
        return(new Date(seconds * 1000).toTimeString().split('', 5).join(''))
    }

}

module.exports =  TrasofrmTime