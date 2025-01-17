import { post, get, rdelete, put } from './request';
import { getDeliveryTarget_mock } from './devLink';
import { target } from './productionLink';
import { getDomain } from '../utils/common';
import type { DeliveryTarget } from '../interface/deliveryTarget';
import type { QueryDeliveryTarget } from '../model/deliveryTarget';

const baseURLOject = getDomain();
const isMock = baseURLOject.MOCK;

export function getDeliveryTarget(params: QueryDeliveryTarget) {
  const url = isMock ? getDeliveryTarget_mock : target;
  return get(url, { params: params }).then((res) => res);
}

export function createDeliveryTarget(params: DeliveryTarget) {
  const url = isMock ? getDeliveryTarget_mock : target;
  return post(url, params);
}

export function deleteDeliveryTarget(params: { name: string }) {
  const url = isMock ? getDeliveryTarget_mock : `${target}/${params.name}`;
  return rdelete(url, params);
}

export function updateDeliveryTarget(params: DeliveryTarget) {
  const url = isMock ? getDeliveryTarget_mock : `${target}/${params.name}`;
  return put(url, params);
}
