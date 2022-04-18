import 'casual-styles'
import CButton from './components/basic/button/CButton.vue'
import CIcon from './components/basic/icon/CIcon.vue'
import CLoading from './components/basic/loading/CLoading.vue'
import CLoadingAudio from './components/basic/loading/CLoadingAudio.vue'
import CLoadingBar from './components/basic/loading/CLoadingBar.vue'
import CLoadingClock from './components/basic/loading/CLoadingClock.vue'
import CLoadingComment from './components/basic/loading/CLoadingComment.vue'
import CLoadingCube from './components/basic/loading/CLoadingCube.vue'
import CLoadingDot from './components/basic/loading/CLoadingDot.vue'
import CLoadingSpinBox from './components/basic/loading/CLoadingSpinBox.vue'
import CTable from './components/table/CTable.vue'
import CInput from './components/form/CInput.vue'
import CTooltip from './components/popup/CTooltip.vue'
import CExpansion from './components/interact/CExpansion.vue'
import CSelect from './components/form/CSelect.vue'
import CTag from './components/basic/CTag.vue'
import CRadio from './components/form/CRadio.vue'
import useClickOutside from './usable/useClickOutside'
import type { App, Plugin } from 'vue'
import useInjectSize from './usable/useInjectSize'
import CCheckbox from './components/form/CCheckbox.vue'
import CCheckboxGroup from './components/form/CCheckboxGroup.vue'
import CDialog from './components/popup/CDialog.vue'
import CList from './components/list/CList.vue'
import CItem from './components/list/CItem.vue'
import CToggle from './components/form/CToggle.vue'
import CNotification from './components/popup/CNotification.vue'
import NotificationPlugin, { useNotifications } from './plugins/notification'
import CPopup from './components/popup/CPopup.vue'
import CDatePicker from './components/form/date-picker/CDatePicker.vue'
import CDropdown from './components/interact/CDropdown.vue'
import CLoadingDots from './components/basic/loading/CLoadingDots.vue'
import CLoadingBars from './components/basic/loading/CLoadingBars.vue'
import CLoadingGear from './components/basic/loading/CLoadingGear.vue'
import CLoadingLattice from './components/basic/loading/CLoadingLattice.vue'
import CLoadingHeart from './components/basic/loading/CLoadingHeart.vue'
import CLoadingHourglass from './components/basic/loading/CLoadingHourglass.vue'
import CLoadingInfinity from './components/basic/loading/CLoadingInfinity.vue'
import CLoadingCircleBars from './components/basic/loading/CLoadingCircleBars.vue'
import CLoadingOrbit from './components/basic/loading/CLoadingOrbit.vue'
import CLoadingOval from './components/basic/loading/CLoadingOval.vue'
import CLoadingPie from './components/basic/loading/CLoadingPie.vue'
import CLoadingPuff from './components/basic/loading/CLoadingPuff.vue'
import CLoadingWifi from './components/basic/loading/CLoadingWifi.vue'
import CLoadingRings from './components/basic/loading/CLoadingRings.vue'
import CLoadingTail from './components/basic/loading/CLoadingTail.vue'
import useSizeThemeClass from './usable/useSizeThemeClass'
import useInjectTheme from './usable/useInjectTheme'
import useVModel, { useDefaultVModel } from './usable/useVModel'
import useInjectProp from './usable/useInjectProp'
import CDatePanel from './components/form/date-picker/CDatePanel.vue'
import CDatePanelHeader from './components/form/date-picker/CDatePanelHeader.vue'
import CYearPanel from './components/form/date-picker/CYearPanel.vue'
import CMonthPanel from './components/form/date-picker/CMonthPanel.vue'
import CTabs from './components/interact/CTabs.vue'
import useScreen from './usable/useScreen'
import CForm from './components/form/CForm.vue'
import CFormItem from './components/form/CFormItem.vue'
import CRadioGroup from './components/form/CRadioGroup.vue'
import useValidator from './components/form/useValidator'
import CInnerLoading from './components/basic/loading/CInnerLoading.vue'
import { vLoading } from './directives'

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
