export default class ServiceResponse<T> {
    public success: boolean;
    public message: string;
    public data: T | null;

    constructor(success: boolean, message: string, data: T | null = null) {
        this.success = success;
        this.message = message;
        this.data = data;
    }

    public static success<T>(data: T, message: string = "Success"): ServiceResponse<T> {
        return new ServiceResponse<T>(true, message, data);
    }

    public static error<T>(message: string, data: T | null = null): ServiceResponse<T> {
        return new ServiceResponse<T>(false, message, data);
    }
}
