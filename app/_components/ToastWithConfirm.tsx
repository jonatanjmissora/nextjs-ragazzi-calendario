import React from 'react'
import toast from 'react-hot-toast';

export default function ToastWithConfirm({t, title, content}: {t: any, title?: string, content: string}) {
  return (
   <div className="bg-slate-600 text-black p-6 rounded-xl flex flex-col items-center gap-2">
    <div className='w-full flex justify-between items-center gap-1'>
        <p className='font-bold text-xl tracking-wider'>{title}</p>
        <button className="btn btn-primary" onClick={() => toast.dismiss(t.id)}>X</button>
    </div>
        <code className="bg-slate-600 text-black">{content}</code>
    </div>
  )
}
