import MobileDetect from 'mobile-detect';
const mobileDetect = new MobileDetect(navigator.userAgent);

const device = app.device = {
  isMobile: !!mobileDetect.mobile(),
  isMobilePhone: mobileDetect.mobile() && !mobileDetect.tablet(),
  isMobileTablet: !!mobileDetect.tablet(),
  isIos: mobileDetect.is('iOS'),
  isAndroid: mobileDetect.is('AndroidOS'),
  isIPhone: mobileDetect.is('iPhone'),
  isIPad: mobileDetect.is('iPad'),
  isWeChat: navigator.userAgent.indexOf('MicroMessenger') > 0,
  isWeChatDevTool: navigator.userAgent.indexOf('wechatdevtools') > 0,
  isWechatPC: navigator.userAgent.indexOf('WindowsWechat') > 0 || navigator.userAgent.indexOf('MacWechat') > 0,
  isWechatPC_Win: navigator.userAgent.indexOf('WindowsWechat') > 0 && navigator.userAgent.indexOf('MacWechat') < 0,
  isWechatPC_Mac: navigator.userAgent.indexOf('MacWechat') > 0,
  isQQBrowser: navigator.userAgent.indexOf('MQQBrowser') > 0,
  isDingTalk: navigator.userAgent.indexOf('DingTalk') > 0,
  androidVersion: mobileDetect.version('Android') || -1,
  iosVersion: mobileDetect.version('iOS') || -1,
  webKitVersion: mobileDetect.version('Webkit'),
  oldBrowser: mobileDetect.version('Webkit') < 537
};
const macros = null;

export { device, macros };
