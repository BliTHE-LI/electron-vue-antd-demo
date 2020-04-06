import { deviceEnquire, DEVICE_TYPE } from '@/utils/device'
import { mapState } from 'vuex'
const mixinDevice = {
    computed: {
        ...mapState({
            device: state => state.app.device
        })
    },
    methods: {
        isMobile() {
            return this.device === DEVICE_TYPE.MOBILE
        },
        isDesktop() {
            return this.device === DEVICE_TYPE.DESKTOP
        },
        isTablet() {
            return this.device === DEVICE_TYPE.TABLET
        }
    }
}
export default mixinDevice;
