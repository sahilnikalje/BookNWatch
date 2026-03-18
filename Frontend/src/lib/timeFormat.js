//todo this is the function, which will convert the time format

const timeFormat=(minutes)=>{
    const hours=Math.floor(minutes/60)
    const minutesRemainer=minutes%60
    return `${hours}h ${minutesRemainer}m`
}
export default timeFormat