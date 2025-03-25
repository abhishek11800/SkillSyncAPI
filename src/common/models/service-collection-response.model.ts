export default class ServiceCollectionResponse<T> {
    public success: boolean;
    public message: string;
    public count: number;
    public data: T[] | null;

    constructor(success: boolean, message: string, data: T[] | null = null) {
        this.success = success;
        this.message = message;
        this.count = data ? data.length : 0;
        this.data = data;
    }

    public static success<T>(data: T[], message: string = "Success"): ServiceCollectionResponse<T> {
        return new ServiceCollectionResponse<T>(true, message, data);
    }

    public static error<T>(message: string, data: T[] | null = null): ServiceCollectionResponse<T> {
        return new ServiceCollectionResponse<T>(false, message, data);
    }
}
