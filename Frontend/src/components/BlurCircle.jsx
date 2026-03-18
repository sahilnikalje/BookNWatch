
//! this is used to add the blureed color section 
//! we are  creating it separately so that we can use it anywhere

const BlurCircle = ({top='auto', left='auto', right='auto', bottom='auto'}) => {
  return (
    <div className="absolute -z-50 h-58 aspect-square rounded-full bg-primary/30 blur-3xl"
         style={{
            top:top,
            left:left,
            right:right,
            bottom:bottom
        }}
    >
    </div>
  )
}

export default BlurCircle