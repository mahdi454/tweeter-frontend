import { cn } from "@/lib/utils";
interface Props {
  loading?: boolean;
  isFull?: boolean;
  className?: string;
  circleSize?: number;
  color?: string;
}
function Loader({
  loading = false,
  isFull = true,
  className,
  circleSize = 5,
  color="#ebf1f1c8f"
}: Props) {
  if (!loading) {
    return null;
  }

  const loaderFullScreen = (
    <div className="fixed top-0 left-0 h-screen w-full backdrop-blur-[1px] z-30">
      <div
        className={cn(
          "flex justify-center items-center gap-10 h-screen",
          className
        )}
      >
        <div   style={{backgroundColor:color}}  
          className={` w-${circleSize} h-${circleSize} delay-0 rounded-full deley animate-ping `}
        >
          &#8203;
        </div>
        <div   style={{backgroundColor:color}}  
          className={` w-${circleSize} h-${circleSize} delay-300 rounded-full animate-ping`}
        >
          &#8203;
        </div>
        <div  style={{backgroundColor:color}}  
          className={` w-${circleSize} h-${circleSize} delay-700 rounded-full animate-ping`}
        >
          &#8203;
        </div>
      </div>
    </div>
  );
  const loaderSmall = (
    <div className={cn(" flex gap-10", className)}>
         <div   style={{backgroundColor:color}}  
          className={` w-${circleSize} h-${circleSize} delay-0 rounded-full deley animate-ping `}
        >
          &#8203;
        </div>
        <div  style={{backgroundColor:color}}  
          className={` w-${circleSize} h-${circleSize} delay-300 rounded-full animate-ping`}
        >
          &#8203;
        </div>
        <div  style={{backgroundColor:color}}  
          className={` w-${circleSize} h-${circleSize} delay-700 rounded-full animate-ping`}
        >
          &#8203;
        </div>
    </div>
  );
  return isFull ? loaderFullScreen : loaderSmall;
}

export default Loader;

// interface LoaderProps {
//   circleSize?: number;
//   color?: string;
//   className?:string;
// }
// function LoadingCircle({ circleSize = 5, color = "slate",className }: LoaderProps) {
//   return (
//     <div
//       className={cn("w-5 h-5 bg-slate-100 rounded-full animate-ping",className)}
//     >
//       &#8203;
//     </div>
//   );
// }