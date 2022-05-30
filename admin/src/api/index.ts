import service from '@/utils/request'

export function coursesList(params:any) {
  return service({
    url: '/courses',
    method: 'get',
    params,
  })
}

export function coursesCreate(data:any) {
  return service({
    url: '/courses',
    method: 'post',
    data,
  })
}

export function coursesUpdata(id:any,data:any) {
  return service({
    url: `/courses/${id}`,
    method: 'put',
    data
  })
}

export function coursesInfo(id:any) {
  return service({
    url: `/courses/${id}`,
    method: 'get',
  })
}

export function coursesRemove(id:any) {
  return service({
    url: `/courses/${id}`,
    method: 'delete',
  })
}