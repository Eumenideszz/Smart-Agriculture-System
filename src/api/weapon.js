import request from '@/utils/request'

export function getList(){
    return request({
        url:'https://localhost:44338/weapons',
        method:'get',
        
    })
}