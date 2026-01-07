// import { getT } from '../../i18n'
import Mod1 from './mod1'
import Mod2 from './mod2'
import Mod3 from './mod3'
export default async function AhoySolutions() {
    // const { t } = await getT('second-page')

    return (
        <>
            <div className="w-full overflow-x-hidden">
                <Mod1 />
                <Mod2 />
                <Mod3 />
            </div>
        </>
    )
}
