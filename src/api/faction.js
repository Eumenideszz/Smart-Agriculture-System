import request from '@/utils/request'

export function getList(query) {
  return request({
    url: 'https://localhost:44338/factions/get',
    method: 'get',
    params: query
  })
}
export function search(name) {
  return request({
    url: 'https://localhost:44338/factions/getname/'+name,
    method: 'get',
   
  })
}
export function createArticle(name,demo) {
  return request({
    url: 'https://localhost:44338/factions/post',
    method: 'post',
    params:{name,demo}
  })
}
export function updateArticle(id,name,demo) {
  return request({
    url: 'https://localhost:44338/factions/put',
    method: 'put',
    params:{id,name,demo}
  })
}

