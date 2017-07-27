import wepy from 'wepy'
import storage from '../utils/storage'

const baseUrl = 'http://10.156.18.232:8400/api' // http://booking.ffan.me/api'

const wxRequest = async (url, params = {}, notice = '加载中...') => {
  if (wepy.hideToast) {
    wepy.hideToast()
  }

  if (notice !== '') {
    wepy.showToast({
      title: notice,
      icon: 'loading',
      mask: true,
      duration: 20000
    })
  }

  const token = await storage.get('token')

  console.log(url, params.data)
  let res = await wepy.request({
    url: url,
    method: params.method || 'GET',
    data: params.data || {},
    header: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + token
    }
  })

  if (wepy.hideToast) {
    wepy.hideToast()
  }

  if (res.statusCode !== 200) {
    // error
    // return res.data
  } else if (res.data.code === '401') {
    await storage.set('userInfo', null)
    await storage.set('token', '')
  }

  return res.data
}

const login = params => wxRequest(baseUrl + '/user/login', {
  data: params,
  method: 'POST'
})

const bind = params => wxRequest(baseUrl + '/user/bind', {
  data: params,
  method: 'POST'
})

const meetingRoom = params => wxRequest(baseUrl + '/meeting_rooms', {
  data: params,
  method: 'GET'
})

const bookingList = params => wxRequest(baseUrl + '/bookings', {
  data: params,
  method: 'GET'
})
const cancelBook = params => wxRequest(baseUrl + '/bookings/' + params.id, {
  method: 'DELETE'
})
const getBook = params => wxRequest(baseUrl + '/bookings/' + params.id, {
  method: 'GET'
})
const addBook = params => wxRequest(baseUrl + '/bookings', {
  data: params,
  method: 'POST'
})

const getLocations = () => wxRequest(baseUrl + '/locations', {
  method: 'GET'
})

const booking = params => wxRequest(baseUrl + '/bookings', {
  data: params,
  method: 'POST'
})

const feedback = params => wxRequest(baseUrl + '/feedback', {
  data: params,
  method: 'POST'
})

const getSchedules = () => wxRequest(baseUrl + '/schedules', {
  method: 'GET'
})

const getUserInfo = (params) => wxRequest(baseUrl + '/users/' + params.id, {
  method: 'GET'
})

const getSuperUsers = (params) => wxRequest(baseUrl + '/superusers', {
  method: 'GET'
}, '')

export default {
  feedback,
  addBook,
  cancelBook,
  getBook,
  bookingList,
  login,
  bind,
  meetingRoom,
  getLocations,
  booking,
  getSchedules,
  getUserInfo,
  getSuperUsers
}
