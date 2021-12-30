import getLunar from './getLunar';
import { pad } from './module'

export default function getFestival(dateObj, date) {
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
    '@' + pad(Math.ceil((new Date(dateArr[1], dateArr[2]-1, dateArr[3]) - new Date(dateArr[1] + '/1/1')) / (60 * 60 * 24 * 1e3)) + 1, 4),
  ];

  let holiday = {
    '0101': ['元旦节', 'New year'],
    '0214': ['情人节', `Valentine's day`],
    '0308': ['国际妇女节', `International women's day`],
    '0315': ['国际消费者权益日', `International consumer rights day`],
    '0312': ['植树节', `Arbor day`],
    '0422': ['世界地球日', `Earth day`],
    '0501': ['国际劳动节', `International labour day`],
    '0504': ['青年节', `Youth day`],
    '0512': ['国际护士节', `International nurses day`],
    '0518': ['国际博物馆日', `International museum day`],
    '0601': ['国际儿童节', `International children's day`],
    '0605': ['世界环境日', `World environment day`],
    '0623': ['国际奥林匹克日', `International olympic day`],
    '0624': ['世界骨质疏松日', `World osteoporosis day`],
    '0701': ['建党节', `Party's building day`],
    '0801': ['建军节', `Army's day`],
    '0910': ['教师节', `Teacher's day`],
    '1001': ['国庆', 'National day'],
    '1024': ['中国程序员节', `Chinese programmer's day`],
    '1224': ['平安夜', `Christmas Eve`],
    '1225': ['圣诞节', `Christmas Day`],
    '1226': ['毛泽东诞辰', `Zedong Mao birthday`],
    '1117': ['世界学生日', `World student's day`],
    '1201': ['世界艾滋病日', `World AIDS day`],
    '*0101': ['春节', 'Chinese year'],
    '*0115': ['元宵节', 'Lantern day'],
    '*0202': ['龙头节', 'Dragon head day'],
    '*0505': ['端午节', 'Dragon boat day'],
    '*0707': ['乞巧节', 'Qi qiao day'],
    '*0715': ['中元节', 'Ghost day'],
    '*0815': ['中秋节', 'Moon day'],
    '*0909': ['重阳节', 'Chongyang day'],
    '*1001': ['寒衣节', 'Winter clothing day'],
    '*1015': ['下元节', 'Xiayuan day'],
    '*1208': ['腊八节', 'Laba day'],
    '*1223': ['祭灶节', 'Stove day'],
    '*1229': lunarInfo.isLeap ? ['除夕', `Year's Eve`] : '',
    '*1230': lunarInfo.isLeap ? '' : ['除夕', `Year's Eve`],
    '#0520': ['母亲节', `Mother's day`],
    '#0630': ['父亲节', `Father's day`],
    '@0256': ['俄罗斯程序员节', `Russian programmer's day`]
  };
  if (date.replaceHolidayConf) holiday = date.replaceHolidayConf;
  if (date.editHolidayConf) Object.assign(holiday, date.editHolidayConf);

  const festivalList = {
    cn: [],
    en: [],
  };
  getDate.forEach(res => {
    // debugger
    if (holiday && holiday[res]) {
      festivalList.cn.push(holiday[res][0]);
      festivalList.en.push(holiday[res][1]);
    }
  });
  return festivalList;
}
