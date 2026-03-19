export const dateFormat=(date)=>{
    return new Date(date).toLocaleString('en-US', {
        weekday:'short',
        monthL:'long',
        dat:'numeric',
        hour:'numeric',
        minute:'numeric'
    })
}