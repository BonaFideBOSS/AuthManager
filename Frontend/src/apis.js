const BASE_URL = '//127.0.0.1:8000/api'

export default {
  baseURL: BASE_URL,

  userAvatarURL: BASE_URL + '/static/avatars',
  avatarGet: {
    url: BASE_URL + '/avatar/',
    method: 'GET'
  },

  // Auth APIs
  login: {
    url: BASE_URL + '/login/',
    method: 'POST'
  },
  register: {
    url: BASE_URL + '/register/',
    method: 'POST'
  },

  // User Account APIs
  accountRead: {
    url: BASE_URL + '/account/',
    method: 'GET'
  },
  accountUpdate: {
    url: BASE_URL + '/account/',
    method: 'PUT'
  },
  accountDelete: {
    url: BASE_URL + '/account/',
    method: 'DELETE'
  },

  // User Manager APIs
  userList: {
    url: BASE_URL + '/users/all/',
    method: 'GET',
    permission: 'user_read'
  },
  userRead: {
    url: BASE_URL + '/users/',
    method: 'GET',
    permission: 'user_read'
  },
  userUpdate: {
    url: BASE_URL + '/users/',
    method: 'PUT',
    permission: 'user_update'
  },
  userDelete: {
    url: BASE_URL + '/users/',
    method: 'DELETE',
    permission: 'user_delete'
  },
  userDeleteMany: {
    url: BASE_URL + '/users/many/',
    method: 'DELETE',
    permission: 'user_delete'
  },

  // Role Manager APIs
  roleList: {
    url: BASE_URL + '/roles/',
    method: 'GET',
    permission: 'role_read'
  },
  roleCreate: {
    url: BASE_URL + '/roles/',
    method: 'POST',
    permission: 'role_create'
  },
  roleUpdate: {
    url: BASE_URL + '/roles/',
    method: 'PUT',
    permission: 'role_update'
  },
  roleDelete: {
    url: BASE_URL + '/roles/',
    method: 'DELETE',
    permission: 'role_delete'
  },
  roleDeleteMany: {
    url: BASE_URL + '/roles/many/',
    method: 'DELETE',
    permission: 'role_delete'
  },

  // Permission Manager APIs
  permissionList: {
    url: BASE_URL + '/permissions/',
    method: 'GET',
    permission: 'role_read'
  },
  permissionCreate: {
    url: BASE_URL + '/permissions/',
    method: 'POST',
    permission: 'permission_create'
  },
  permissionUpdate: {
    url: BASE_URL + '/permissions/',
    method: 'PUT',
    permission: 'permission_update'
  },
  permissionDelete: {
    url: BASE_URL + '/permissions/',
    method: 'DELETE',
    permission: 'permission_delete'
  },
  permissioneleteMany: {
    url: BASE_URL + '/permissions/many/',
    method: 'DELETE',
    permission: 'permission_delete'
  },

  // Misc APIs
  dbCount: {
    url: BASE_URL + '/misc/db-count/',
    method: 'GET'
  }
}
