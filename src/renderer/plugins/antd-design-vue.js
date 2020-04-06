import Vue from 'vue'
import {
    Affix,
    Anchor,
    AutoComplete,
    Alert,
    Avatar,
    BackTop,
    Badge,
    Breadcrumb,
    Button,
    Card,
    Checkbox,
    Col,
    DatePicker,
    Divider,
    Dropdown,
    Form,
    Icon,
    Input,
    InputNumber,
    Layout,
    List,
    LocaleProvider,
    message,
    Menu,
    Modal,
    notification,
    Pagination,
    Popconfirm,
    Popover,
    Progress,
    Radio,
    Row,
    Select,
    Slider,
    Spin,
    Steps,
    Switch,
    Tabs,
    Tag,
    TimePicker,
    Timeline,
    Tooltip,
    // Mention,
    Upload,
    // version,
    Drawer,
    Skeleton,
    Comment,
    ConfigProvider,
    PageHeader
} from 'ant-design-vue'

Vue.prototype.$message = message
Vue.prototype.$notification = notification
// 局配置方法，在调用前提前配置，全局一次生效。
Vue.prototype.$notification.config({
    top: '66px'
})
Vue.prototype.$info = Modal.info
Vue.prototype.$success = Modal.success
Vue.prototype.$error = Modal.error
Vue.prototype.$warning = Modal.warning
Vue.prototype.$confirm = Modal.confirm

/* v1.1.3+ registration methods */
Vue.use(Affix)
Vue.use(Anchor)
Vue.use(AutoComplete)
Vue.use(Alert)
Vue.use(Avatar)
Vue.use(BackTop)
Vue.use(Badge)
Vue.use(Breadcrumb)
Vue.use(Button)
Vue.use(Card)
Vue.use(Checkbox)
Vue.use(Col)
Vue.use(DatePicker)
Vue.use(Divider)
Vue.use(Drawer)
Vue.use(Dropdown)
Vue.use(Form)
Vue.use(Icon)
Vue.use(Input)
Vue.use(InputNumber)
Vue.use(Layout)
Vue.use(List)
Vue.use(LocaleProvider)
Vue.use(Menu)
Vue.use(Modal)
Vue.use(Pagination)
Vue.use(Popconfirm)
Vue.use(Popover)
Vue.use(Progress)
Vue.use(Radio)
Vue.use(Row)
Vue.use(Select)
Vue.use(Slider)
Vue.use(Spin)
Vue.use(Steps)
Vue.use(Switch)
Vue.use(Tabs)
Vue.use(Tag)
Vue.use(TimePicker)
Vue.use(Timeline)
Vue.use(Tooltip)
Vue.use(Upload)
Vue.use(Skeleton)
Vue.use(Comment)
Vue.use(ConfigProvider)
Vue.use(PageHeader)
