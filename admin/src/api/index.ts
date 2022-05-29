import service from '@/utils/request'

export function coursesList(params:any) {
  return service({
    url: '/courses',
    method: 'get',
    params,
  })
}