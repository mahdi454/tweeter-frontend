import { X } from 'lucide-react';
import React, { useState, createContext, useContext, ReactNode, cloneElement } from 'react';
import { createPortal } from "react-dom";
import { useCloseOut } from "../hooks/useClose";
interface ModalContextType {
    showModel: string;
    open: (name: string) => void;
    close: () => void;
  }
  
  const ModalContext = createContext<ModalContextType>({
    showModel: '',
    open: () => {},
    close: () => {}
  });

function Modal({ children }: { children: ReactNode }) {
  const [showModel, setShowModel] = useState('');
  const close = () => setShowModel("");
  const open = (name: string) => setShowModel(name);
  
  return (
    <ModalContext.Provider value={{ showModel, open, close }}>
      {children}
    </ModalContext.Provider>
  );
}

function Open({ children, opens }: { children: ReactNode, opens: string }) {
  const { open } = useContext(ModalContext);
  
  return cloneElement(children as React.ReactElement<any>, { onClick: () => open(opens) });
}

function Window({ children, name }: { children: ReactNode, name: string}) {
  const { showModel, close } = useContext(ModalContext);
  const ref = useCloseOut(close);
  if (name !== showModel) return null;
  return createPortal(
    <div className="fixed top-0 left-0 h-screen w-full backdrop-blur-[1px] z-50" >
      <div className="w-full h-screen bg-slate-200 dark:bg-black sm:absolute sm:top-[50%] sm:left-[50%] sm:w-[580px] sm:h-[400px] sm:translate-x-[-50%] sm:translate-y-[-50%] sm:rounded-xl" ref={ref}>
     <div className='relative p-2'>
     <button className=" text-2xl  top-3 left-3 p-1.5 hover:bg-slate-300 rounded-full dark:hover:bg-slate-800" onClick={close}><X /></button>
     </div>
        <div>{React.cloneElement(children as React.ReactElement<any>, { onClose: close })}</div>
      </div>
    </div>,
    document.body
  );
  
}

Modal.Open = Open;
Modal.Window = Window;

export default Modal;

// function Window({ children, name }: { children: ReactNode, name: string}) {
//   const { showModel, close } = useContext(ModalContext);
//   const ref = useCloseOut(close);

//   const handleSubmit = () => {
//     // Call the close function when the form is submitted
//     close();
//   };

//   if (name !== showModel) return null;
//   return createPortal(
//     <div className="fixed top-0 left-0 h-screen w-full backdrop-blur-[1px] z-20" >
//       <div className="w-full h-screen bg-slate-200 dark:bg-black sm:absolute sm:top-[50%] sm:left-[50%] sm:w-[580px] sm:h-[400px] sm:translate-x-[-50%] sm:translate-y-[-50%] sm:rounded-xl" ref={ref}>
//         <div className='relative p-2'>
//           <button className=" text-2xl  top-3 left-3 p-1.5 hover:bg-slate-300 rounded-full dark:hover:bg-slate-800" onClick={close}><X /></button>
//         </div>
//         {/* Pass the handleSubmit function to the form */}
//         <div>{React.cloneElement(children as React.ReactElement<any>, { onSubmit: handleSubmit })}</div>
//       </div>
//     </div>,
//     document.body
//   );
// }
