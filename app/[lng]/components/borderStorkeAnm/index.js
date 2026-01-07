export default function BorderStrokeAnm({ children }) {
    return <>
        <div className='w-full h-full relative'>
            <div className='w-0 h-0 absolute top-0 right-0 border-white  group-hover:w-full group-hover:h-full ease-in-out duration-500 group-hover:border-t group-hover:border-r' />
            <div className='w-0 h-0 absolute bottom-0 left-0 border-white  group-hover:w-full group-hover:h-full ease-in-out duration-500 group-hover:border-b group-hover:border-l' />
            <div className='w-full h-full relative z-1'>
                {children}
            </div>
        </div>
    </>
}