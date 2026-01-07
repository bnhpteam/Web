// import { getT } from '../../i18n'
// import { Link } from '../components/Link'
import Mod1 from './mod1'
import Mod2 from './mod2'
import Mod3 from './mod3'
import Mod4 from './mod4'
import Mod5 from './mod5'
export default async function AhoyHome() {
    // const { t } = await getT('second-page', { lng: 'en' })

    return (
        <>
            <div className="overflow-x-hidden">
                <Mod1 />
                <Mod2 />
                <Mod3 />
                <Mod4 />
                <Mod5 />
            </div>
        </>
    )
}
