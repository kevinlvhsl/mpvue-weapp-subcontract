import env from '../env'

export const host = env === 'development' ? 'https://gateway-test.ibubuji.com' : 'https://gateway.ibubuji.com'
export const tabs = ['pages/index/main', 'pages/gift/main', 'pages/my/main']
// showStatus表示的意思
export const ORDER_STATUS = {
  1: '已下单',
  2: '待发货',
  3: '待收货',
  4: '已完成',
  5: '已取消',
  6: '退款中',
  7: '已退款',
  8: '退款失败',
}
export const STATUS_STR = {
  ONE: 1,
  TWO: 2,
  THREE: 3,
  FOUR: 4,
  FIVE: 5,
  SIX: 6,
  SEVEN: 7,
  EIGHT: 8,
}
export const DESC_LIST = [
  '1.付款成功后6小时内，如果商品未发货，用户可申请退款。',
  '2.收货后24小时内，如存在质量问题，用户可申请退款。',
  '3.由于买家原因收货地址错误、擅自更改配送时间、派送地址发生延迟收货等而导致步步鸡变质或损坏的，我司不予理赔。',
  '4.商品使用优惠券支付时，按照实际付款金额退款。',
  '5.礼券产品（包括提货券）一经售出不予退货退款。',
  '6.如对商品有任何疑问，可关注“步步鸡”公众号联系客服。',
  '7.退款规则的最终解释权归上海连陌信息技术有限公司所有。',
]
export const ORDER_TYPE = {
  1: '众筹',
  2: '预售',
  3: '零售',
  4: '实体卡',
  5: '电子卡',
  6: '实体卡兑换',
  7: '电子卡兑换',
  8: '合并转赠',
}
export const CARD_STATUS_MAP = {
  ENABLE: 2, // 可使用
  USED: 3, // 已使用
  EXPIRED: 4, // 已过期
  strs: ['可使用', '已使用', '已过期']
}
export const APP_CONFIG = {
  BUBUJI_INDEX_TOP: 'http://p-za-chicken.oss-cn-hzfinance.aliyuncs.com/bubuji/mp-config/index-top.png',
  BUBUJI_INDEX_BANNER: [{ type: 'mp', img: 'http://p-za-chicken.oss-cn-hzfinance.aliyuncs.com/bubuji/mp-config/banner-1.png', url: '' }],
  BUBUJI_INDEX_STATUS_COLOR: '#ffffff',
  BUBUJI_INDEX_TITLE_COLOR: '#000000',
  BUBUJI_INDEX_BG_COLOR: '#ffffff',
  BUBUJI_GIFT_TOP: 'http://p-za-chicken.oss-cn-hzfinance.aliyuncs.com/bubuji/mp-config/gift-top.png',
  BUBUJI_GIFT_BG: 'http://p-za-chicken.oss-cn-hzfinance.aliyuncs.com/bubuji/mp-config/gift-bg.jpg',
  BUBUJI_GIFT_STATUS_COLOR: '#ffffff',
  BUBUJI_GIFT_TITLE_COLOR: '#000000',
  EVENT_ENABLED: 'false', // 抽奖等活动 配置
  EVENT_POPOVER_ENABLED: 'false',
  EVENT_POPOVER_IMG: '',
  EVENT_POPOVER_URL: ''
}
const config = {
  // https://mta.qq.com/  埋点
  'App id': '500637097',
  'App Secret key': '3faeb231dc5b6149c3412fcb08651194',
  DEV: 'development',
  PROD: 'production',
  OSS_PREV: 'https://p-za-chicken.oss-cn-hzfinance.aliyuncs.com/bubuji',
  OSS_HOST: 'https://p-za-chicken.oss-cn-hzfinance.aliyuncs.com',
  OSS_DIR_REFUND: 'bubuji/refundImg',
  OSS_DIR_COMMENT: 'bubuji/commentImg',
  ORDER_STATUS,
  STATUS_STR,
  DESC_LIST
}
export default config
