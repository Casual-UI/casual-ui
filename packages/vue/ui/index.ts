import 'casual-styles'
import CButton from './src/components/basic/button/CButton.vue'
import CIcon from './src/components/basic/icon/CIcon.vue'
import CLoading from './src/components/basic/loading/CLoading.vue'
import CLoadingAudio from './src/components/basic/loading/CLoadingAudio.vue'
import CLoadingBar from './src/components/basic/loading/CLoadingBar.vue'
import CLoadingClock from './src/components/basic/loading/CLoadingClock.vue'
import CLoadingComment from './src/components/basic/loading/CLoadingComment.vue'
import CLoadingCube from './src/components/basic/loading/CLoadingCube.vue'
import CLoadingDot from './src/components/basic/loading/CLoadingDot.vue'
import CLoadingSpinBox from './src/components/basic/loading/CLoadingSpinBox.vue'
import CTable from './src/components/table/CTable.vue'
import CInput from './src/components/form/CInput.vue'
import CTooltip from './src/components/popup/CTooltip.vue'
import CExpansion from './src/components/interact/CExpansion.vue'
import CSelect from './src/components/form/CSelect.vue'
import CTag from './src/components/basic/CTag.vue'
import CRadio from './src/components/form/CRadio.vue'
import useClickOutside from './src/usable/useClickOutside'
import type { App, Plugin } from 'vue'
import useInjectSize from './src/usable/useInjectSize'
import CCheckbox from './src/components/form/CCheckbox.vue'
import CCheckboxGroup from './src/components/form/CCheckboxGroup.vue'
import CDialog from './src/components/popup/CDialog.vue'
import CList from './src/components/list/CList.vue'
import CItem from './src/components/list/CItem.vue'
import CToggle from './src/components/form/CToggle.vue'
import CNotification from './src/components/popup/CNotification.vue'
import NotificationPlugin, {
  useNotifications,
} from './src/plugins/notification'
import CPopup from './src/components/popup/CPopup.vue'
import CDatePicker from './src/components/form/date-picker/CDatePicker.vue'
import CDropdown from './src/components/interact/CDropdown.vue'
import CLoadingDots from './src/components/basic/loading/CLoadingDots.vue'
import CLoadingBars from './src/components/basic/loading/CLoadingBars.vue'
import CLoadingGear from './src/components/basic/loading/CLoadingGear.vue'
import CLoadingLattice from './src/components/basic/loading/CLoadingLattice.vue'
import CLoadingHeart from './src/components/basic/loading/CLoadingHeart.vue'
import CLoadingHourglass from './src/components/basic/loading/CLoadingHourglass.vue'
import CLoadingInfinity from './src/components/basic/loading/CLoadingInfinity.vue'
import CLoadingCircleBars from './src/components/basic/loading/CLoadingCircleBars.vue'
import CLoadingOrbit from './src/components/basic/loading/CLoadingOrbit.vue'
import CLoadingOval from './src/components/basic/loading/CLoadingOval.vue'
import CLoadingPie from './src/components/basic/loading/CLoadingPie.vue'
import CLoadingPuff from './src/components/basic/loading/CLoadingPuff.vue'
import CLoadingWifi from './src/components/basic/loading/CLoadingWifi.vue'
import CLoadingRings from './src/components/basic/loading/CLoadingRings.vue'
import CLoadingTail from './src/components/basic/loading/CLoadingTail.vue'
import useSizeThemeClass from './src/usable/useSizeThemeClass'
import useInjectTheme from './src/usable/useInjectTheme'
import useVModel, { useDefaultVModel } from './src/usable/useVModel'
import useInjectProp from './src/usable/useInjectProp'
import CDatePanel from './src/components/form/date-picker/CDatePanel.vue'
import CDatePanelHeader from './src/components/form/date-picker/CDatePanelHeader.vue'
import CYearPanel from './src/components/form/date-picker/CYearPanel.vue'
import CMonthPanel from './src/components/form/date-picker/CMonthPanel.vue'
import CTabs from './src/components/interact/CTabs.vue'
import useScreen from './src/usable/useScreen'
import CForm from './src/components/form/CForm.vue'
import CFormItem from './src/components/form/CFormItem.vue'
import CRadioGroup from './src/components/form/CRadioGroup.vue'
import useValidator from './src/components/form/useValidator'
import CInnerLoading from './src/components/basic/loading/CInnerLoading.vue'
import { vLoading } from './src/directives'

const CasualUI: Plugin = {
  install: (app: App) => {
    app.component('CTabs', CTabs)
    app.component('CButton', CButton)
    app.component('CLoading', CLoading)
    app.component('CLoadingAudio', CLoadingAudio)
    app.component('CLoadingBar', CLoadingBar)
    app.component('CLoadingClock', CLoadingClock)
    app.component('CLoadingComment', CLoadingComment)
    app.component('CLoadingCube', CLoadingCube)
    app.component('CLoadingDot', CLoadingDot)
    app.component('CLoadingSpinBox', CLoadingSpinBox)
    app.component('CTable', CTable)
    app.component('CInput', CInput)
    app.component('CIcon', CIcon)
    app.component('CTooltip', CTooltip)
    app.component('CExpansion', CExpansion)
    app.component('CSelect', CSelect)
    app.component('CTag', CTag)
    app.component('CRadio', CRadio)
    app.component('CCheckbox', CCheckbox)
    app.component('CCheckboxGroup', CCheckboxGroup)
    app.component('CDialog', CDialog)
    app.component('CList', CList)
    app.component('CItem', CItem)
    app.component('CToggle', CToggle)
    app.component('CDatePicker', CDatePicker)
    app.component('CDropdown', CDropdown)
    app.component('CLoadingDots', CLoadingDots)
    app.component('CLoadingBars', CLoadingBars)
    app.component('CLoadingGear', CLoadingGear)
    app.component('CLoadingLattice', CLoadingLattice)
    app.component('CLoadingHeart', CLoadingHeart)
    app.component('CLoadingHourglass', CLoadingHourglass)
    app.component('CLoadingInfinity', CLoadingInfinity)
    app.component('CLoadingCircleBars', CLoadingCircleBars)
    app.component('CLoadingOrbit', CLoadingOrbit)
    app.component('CLoadingOval', CLoadingOval)
    app.component('CLoadingPuff', CLoadingPuff)
    app.component('CLoadingPie', CLoadingPie)
    app.component('CLoadingRings', CLoadingRings)
    app.component('CLoadingWifi', CLoadingWifi)
    app.component('CLoadingTail', CLoadingTail)
    app.component('ODatePanel', CDatePanel)
    app.component('CNotification', CNotification)
    app.component('CForm', CForm)
    app.component('CFormItem', CFormItem)
    app.component('CRadioGroup', CRadioGroup)
    app.component('CInnerLoading', CInnerLoading)

    app.directive('loading', vLoading)

    app.use(NotificationPlugin)
  },
}

export default CasualUI

export {
  CTabs,
  CButton,
  CIcon,
  CLoading,
  CLoadingAudio,
  CLoadingBar,
  CLoadingClock,
  CLoadingComment,
  CLoadingCube,
  CLoadingDot,
  CCheckbox,
  CDropdown,
  CLoadingSpinBox,
  CTable,
  CInput,
  CRadioGroup,
  CTooltip,
  CExpansion,
  CSelect,
  CDatePicker,
  CDialog,
  CItem,
  CNotification,
  CList,
  CCheckboxGroup,
  CLoadingBars,
  CLoadingCircleBars,
  CLoadingDots,
  CLoadingGear,
  CLoadingHeart,
  CLoadingHourglass,
  CLoadingInfinity,
  CLoadingLattice,
  CLoadingOrbit,
  CLoadingOval,
  CLoadingPie,
  CLoadingPuff,
  CLoadingRings,
  CLoadingTail,
  CLoadingWifi,
  CRadio,
  CPopup,
  CTag,
  CToggle,
  CDatePanel,
  CMonthPanel,
  CDatePanelHeader,
  CYearPanel,
  CForm,
  CFormItem,
  useClickOutside,
  useInjectSize,
  useNotifications,
  CInnerLoading,
  useInjectProp,
  useSizeThemeClass,
  useInjectTheme,
  useVModel,
  useDefaultVModel,
  useScreen,
  useValidator,
  vLoading,
}
