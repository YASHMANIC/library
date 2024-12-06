"use client"

interface VideoPlayerProps {
    videoUrl:string
    height:string
    width:string
}

const VideoPlayer = ({videoUrl,height,width}:VideoPlayerProps) => {
    const isMp4 = videoUrl.replace(".ts", ".mp4");
   return (
    <div>
        <video controls  className="w-full aspect-video" src={videoUrl} height={height} width={width} typeof="video/mp4"></video>
    </div>
   )
  
}

export default VideoPlayer