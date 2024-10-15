export class HttpClient {
  public constructor(
    public readonly notificationUrl: string,
    public readonly webhookUrl: string,
    public readonly accessToken: string
  ) {}
}
