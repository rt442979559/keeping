import service from '@/utils/request'

export function episodeList(params?:any) {
  return service({
    url: '/episode',
    method: 'get',
    params,
  })
}

export function episodeCreate(data:any) {
  return service({
    url: '/episode',
    method: 'post',
    data,
  })
}

export function episodeUpdata(id:any,data:any) {
  return service({
    url: `/episode/${id}`,
    method: 'put',
    data
  })
}

export function episodeRemove(id:any) {
  return service({
    url: `/episode/${id}`,
    method: 'delete',
  })
}

export function episodeOption(params?:any) {
  return service({
    url: `/episode/option`,
    method: 'get',
    params
  })
}