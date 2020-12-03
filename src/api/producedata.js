import request from '@/utils/request'

export function getList(query) {
  return request({
    url: 'https://localhost:44338/producedata/get',
    method: 'get',
    params: query
  })
}
export function searchData(name) {
  return request({
    url: 'https://localhost:44338/producedata/getname/'+name,
    method: 'get',
   
  })
}
export function createData(year, month, date, variety, area, count) {
  return request({
    url: 'https://localhost:44338/producedata/post',
    method: 'post',
    params:{year, month, date, variety, area, count}
  })
}
export function updateData(id,year, month, date, variety, area, count) {
  return request({
    url: 'https://localhost:44338/producedata/put',
    method: 'put',
    params:{id,year, month, date, variety, area, count}
  })
}