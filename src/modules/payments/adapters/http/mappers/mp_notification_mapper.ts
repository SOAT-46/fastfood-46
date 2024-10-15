import { Notification } from "../../../domain/models";

export const mapToDomain = (body: any): Notification => {
  const { resource, topic } = body;
  return new Notification(resource, topic);
};
