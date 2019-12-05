/*
 * Copyright ©️ 2019 GaltProject Society Construction and Terraforming Company
 * (Founded by [Nikolai Popeka](https://github.com/npopeka)
 *
 * Copyright ©️ 2019 Galt•Core Blockchain Company
 * (Founded by [Nikolai Popeka](https://github.com/npopeka) by
 * [Basic Agreement](ipfs/QmaCiXUmSrP16Gz8Jdzq6AJESY1EAANmmwha15uR3c1bsS)).
 */

const isNumber = require('lodash/isNumber');
const isDate = require('lodash/isDate');
const isArray = require('lodash/isArray');

import * as moment from 'moment';

export default class Helper {
  static uuidv4() {
    return (([1e7] as any) + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, c =>
      (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
    )
  }

  static openWindow(url, title, callback) {
    const auth_window = window.open(url, title, 'width=900,height=600');

    const pollTimer = window.setInterval(function () {
      if (!auth_window || auth_window.closed !== false) { // !== is required for compatibility with Opera
        window.clearInterval(pollTimer);
        onWindowClose();
      }
    }, 200);

    function onWindowClose() {

      callback();
    }
  }

  static updateUserProgress(user, progress) {
    user[progress.Type + '_progress'] = progress;
  }

  static updateUserProgressesList(user) {
    if (user.UserProgresses && user.UserProgresses.length) {
      user.UserProgresses.forEach((progress) => {
        Helper.updateUserProgress(user, progress);
      })
    }
  }

  static now() {
    return Math.round(new Date().getTime() / 1000);
  }

  static humanDate(date) {
    return moment(date).format("D MMMM YYYY H:mm:ss");
  }

  static callOnEnterEvent(callback) {
    return (event) => event.code === 'Enter' && !event.shiftKey ? callback() : null;
  }

  static download(filename, text) {
    const element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
    element.setAttribute('download', filename);

    element.style.display = 'none';
    document.body.appendChild(element);

    element.click();

    document.body.removeChild(element);
  }

  static beautyNumber(number) {
    number = parseFloat(number);
    number = Math.round(number * 100) / 100;
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
  }

  static beautyDate(date) {
    if (!isDate(date) && isNumber(parseInt(date))) {
      date = new Date(parseInt(date) * 1000);
    }
    let mDate = moment(date);
    let now = moment();

    if (now.diff(mDate, 'hours') >= 24)
      return mDate.format("D MMMM YYYY H:mm:ss");
    else
      return mDate.fromNow();
  }

  static beautyPeriod(period, unit: any = "seconds") {
    var eventMDuration = moment.duration(parseInt(period), unit);
    var eventDurationArray = [];
    if (eventMDuration.years() > 0) {
      eventDurationArray.push(eventMDuration.years() + ' years');
      eventMDuration.subtract(eventMDuration.years(), 'years')
    }
    if (eventMDuration.months() > 0) {
      eventDurationArray.push(eventMDuration.months() + ' months');
      eventMDuration.subtract(eventMDuration.months(), 'months')
    }
    // if (eventMDuration.weeks() > 0) {
    //     eventDurationArray.push(eventMDuration.weeks() + ' weeks');
    //     eventMDuration.subtract(eventMDuration.weeks(), 'weeks')
    // }
    if (eventMDuration.days() > 0) {
      eventDurationArray.push(eventMDuration.days() + ' days');
      eventMDuration.subtract(eventMDuration.days(), 'days')
    }
    if (eventMDuration.hours() > 0) {
      eventDurationArray.push(eventMDuration.hours() + ' hours');
      eventMDuration.subtract(eventMDuration.hours(), 'hours')
    }
    if (eventMDuration.minutes() > 0) {
      let seconds = eventMDuration.seconds();
      eventDurationArray.push(eventMDuration.minutes() + ':' + (seconds < 10 ? '0' + seconds : seconds));
    } else if (eventMDuration.seconds() > 0) {
      let seconds = eventMDuration.seconds();
      eventDurationArray.push('0:' + (seconds < 10 ? '0' + seconds : seconds));
    }
    return eventDurationArray.length === 1 ? eventDurationArray[0] :
      eventDurationArray.join(' and ')
  }

  static copyToClipboard(str) {
    const el = document.createElement('textarea');
    el.value = str;
    el.setAttribute('readonly', '');
    el.style.position = 'absolute';
    el.style.left = '-9999px';
    document.body.appendChild(el);
    el.select();
    document.execCommand('copy');
    document.body.removeChild(el);
  }

  static parseArray(abi) {
    if (!isArray(abi)) {
      try {
        abi = JSON.parse(abi);
      } catch (e) {
        abi = [];
      }
    }
    return abi || [];
  }

  static splitStringToArray(str) {
    return (str || '').trim().split(/[,\s]+/)
  }

  static isMobile() {
    let check = false;
    (function (a) {
      if (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0, 4))) check = true;
    })(navigator.userAgent || navigator.vendor || (window as any).opera);
    return check;
  }
}
