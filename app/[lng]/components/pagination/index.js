export default function Pagination({ page = '01', title = 'TOKEN', desc = '/ / /', className, centerClassName, total = '04' }) {
    return <>
        <div className={`w-full h-[48px] text-[12px] text-[#E3E3E3] flex items-center justify-between relative px-[40px] max-qw:px-3 ${className}`}>
            <div className="flex items-center">
                <section className="">
                    <span>[</span>
                    <span>&nbsp;&nbsp;&nbsp;</span>
                    <span>{page}</span>
                    <span>&nbsp;&nbsp;&nbsp;</span>
                    <span>/</span>
                    <span>&nbsp;&nbsp;&nbsp;</span>
                    <span>{total}</span>
                    <span>&nbsp;&nbsp;&nbsp;</span>
                    <span>]</span>
                </section>
                <section className="opacity-[0.3] ml-2">{title}</section>
            </div>
            <div className={`opacity-[0.3] absolute left-1/2 -translate-x-1/2 ${centerClassName}`}>
                BNHP
            </div>
            <div className="opacity-[0.3]">
                {desc}
            </div>
        </div>
    </>
}