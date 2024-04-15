import BaseController from './baseController';

export default class UserController extends BaseController {
  async getUser(userId) {
    return this.request()
      .method('GET')
      .url(`users/${userId}`)
      .send();
  }

  async getUsers(queryParams = {}) {
    const urlQuery = new URLSearchParams(queryParams);
    return this.request()
      .method('GET')
      .url('users')
      .searchParams(urlQuery)
      .send();
  }

  async addUser(user) {
    return this.request()
      .method('POST')
      .url('users')
      .headers({ test: 'test' })
      .body(user)
      .send();
  }

  async deletetUser(userId) {
    return this.request()
      .method('DELETE')
      .url(`users/${userId}`)
      .send();
  }

  async updateUser(userId, user, method = 'PUT') {
    return this.request()
      .method(method)
      .url(`users/${userId}`)
      .body(user)
      .send();
  }

  async getUserPosts(userId, queryParams = {}) {
    const urlQuery = new URLSearchParams(queryParams);
    return this.request()
      .method('GET')
      .url(`users/${userId}/posts`)
      .searchParams(urlQuery)
      .send();
  }

  async getUserTodos(userId, queryParams = {}) {
    const urlQuery = new URLSearchParams(queryParams);
    return this.request()
      .method('GET')
      .url(`users/${userId}/todos`)
      .searchParams(urlQuery)
      .send();
  }

  async addUserPost(userId, post) {
    return this.request()
      .method('POST')
      .url(`users/${userId}/posts`)
      .body(post)
      .send();
  }

  async addUserTodo(userId, todo) {
    return this.request()
      .method('POST')
      .url(`users/${userId}/todos`)
      .body(todo)
      .send();
  }
}
