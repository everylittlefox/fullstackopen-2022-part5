const USER_KEY = 'bloglist-user'

export const persistUser = (user) => {
  localStorage.setItem(USER_KEY, JSON.stringify(user))
}
export const retrieveUser = () => {
  const userJson = localStorage.getItem(USER_KEY)
  if (userJson) {
    try {
      return JSON.parse(userJson)
    } catch {
      return null
    }
  }
  return null
}
export const resetUser = () => {
  localStorage.removeItem(USER_KEY)
}
