import { UserInstance } from "../../database/interfaces/user.interface";

export type EmailPayload = {
    to: UserInstance;
    subject: string;
    text?: string;
    htmlTemplate?: string;
}