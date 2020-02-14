import getLunar from './getLunar';

export default function getFestival(dateObj) {

  /**
   * 补前导零(0)
   * @param {number} str 字符
   * @param {number} len 长度
   * @param {string} placeholder 前导占位符
   * @returns {string}
   */
  function pad(str, len, placeholder = '0') {
    str += '';
    if (str.length < len) {
      return new Array(++len - str.length).join(placeholder) + str;
    } else {
      return str;
    }
  }

  const dateArr = dateObj.match(/(\d{4})(\d{2})(\d{2})/);
  const curDate = new Date(`${ dateArr[1] }-${ dateArr[2] }-${ dateArr[3] }`);

  /**
   * 当前月中第几周
   * @return {number}
   */
  function getWeekInMonth() {
    const d = curDate.getDate();
    const w = curDate.getDay();
    return Math.ceil((d + 6 - w) / 7) - 1;
  }

  // 获取农历
  const lunarInfoFn = () => getLunar.solar2lunar(dateArr[1], dateArr[2], dateArr[3]);
  const lunarInfo = lunarInfoFn();
  lunarInfo.lcDay = pad(lunarInfo.lDay, 2);
  lunarInfo.lcMonth = pad(lunarInfo.lMonth, 2);

  const getDate = [
    dateArr[2] + dateArr[3],
    '*' + lunarInfo.lcMonth + lunarInfo.lcDay,
    '#' + dateArr[2] + getWeekInMonth() + curDate.getDay(),
  ];

  let holiday = {
    '0101': ['元旦节', 'New Year'],
    '0214': ['情人节', `Valentine's Day`],
    '0308': ['国际妇女节', `International Women's Day`],
    '0315': ['国际消费者权益日', `International Consumer Rights Day`],
    '0312': ['植树节', `Arbor Day`],
    '0422': ['世界地球日', `Earth Day`],
    '0501': ['国际劳动节', `International Labour Day`],
    '0504': ['青年节', `Youth day`],
    '0512': ['国际护士节', `International Nurses Day`],
    '0518': ['国际博物馆日', `International Museum Day`],
    '0601': ['国际儿童节', `International Children's Day`],
    '0605': ['世界环境日', `World Environment Day`],
    '0623': ['国际奥林匹克日', `International Olympic Day`],
    '0624': ['世界骨质疏松日', `World Osteoporosis Day`],
    '0701': ['建党节', `Founding day`],
    '0801': ['建军节', `Army Day`],
    '0910': ['教师节', `Teachers' Day`],
    '1224': ['平安夜', `Christmas Eve`],
    '1117': ['世界学生日', `World student day`],
    '1201': ['世界艾滋病日', `World AIDS Day`],
    '1001': ['国庆', 'National Day'],
    '*0101': ['春节', 'Chinese Year'],
    '*0115': ['元宵节', 'Lantern Festival'],
    '*0202': ['龙头节', 'Dragon head festival'],
    '*0505': ['端午节', 'Dragon Boat Festival'],
    '*0707': ['乞巧节', 'Qi Qiao Festival'],
    '*0715': ['中元节', 'Ghost Festival'],
    '*0815': ['中秋节', 'Moon Festival'],
    '*0909': ['重阳节', 'Chongyang Festival'],
    '*1001': ['寒衣节', 'Winter clothing festival'],
    '*1015': ['下元节', 'Xia Yuan Festival'],
    '*1208': ['腊八节', 'Laba Festival'],
    '*1223': ['祭灶节', 'Stove Festival'],
    '*1229': lunarInfo.isLeap ? ['除夕', `Year's Eve`] : '',
    '*1230': lunarInfo.isLeap ? '' : ['除夕', `Year's Eve`],
    '#0520': ['母亲节', `Mother's Day`],
    '#0630': ['父亲节', `Father's day`],
  };
  if (date.replaceHolidayConf) holiday = date.replaceHolidayConf;
  if (date.editHolidayConf) Object.assign(holiday, date.exitHolidayConf);
  // edit, add
  const festivalList = {
    cn: [],
    en: [],
  };
  getDate.forEach(res => {
    if (holiday && holiday[res]) {
      festivalList.cn.push(holiday[res][0]);
      festivalList.en.push(holiday[res][1]);
    }
  });
  return festivalList;
}
