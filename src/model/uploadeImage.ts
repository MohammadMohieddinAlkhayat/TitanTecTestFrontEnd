export interface Message {
    type: string;
    content: string;
}

export interface Result {
    fileName: string;
    isUploadedSuccessFully: boolean;
}

export interface Upload_Image {
    isOk: boolean;
    message: Message;
    result: Result;
}