import { AxiosRequestConfig } from "axios";
import ApiService from "../utils/api-services";
import { Upload_Image, Result } from "../model/uploadeImage";
class UploadService extends ApiService {
  constructor(config?: AxiosRequestConfig) {
    super({ baseURL: `${process.env.REACT_APP_BASE_URL}/api/`, ...config });
  }

  public UploadEmployeeImage = async (image: FormData): Promise<Result> => {
    const result: Upload_Image = await this.post(`/Employee/Upload`, image);
    if (!result.isOk) {
      throw new Error(result.message.content + "");
    }
    if (result.isOk) {
      return result.result;
    }

    return result.result;
  };
}

export const upload = new UploadService();
