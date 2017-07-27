import wepy from 'wepy'

const get = async (key, defaults = null) => {
  try {
    const value = await wepy.getStorage({ key })
    return value.data
  } catch (e) {
    return defaults
  }
}

const set = async (key, data = null) => {
  try {
    await wepy.setStorage({ key, data })
    return data
  } catch (e) {
    return false
  }
}

const remove = async (key) => {
  try {
    await wepy.removeStorage({ key })
    return true
  } catch (e) {
    return false
  }
}

export default {
  get,
  set,
  remove
}
