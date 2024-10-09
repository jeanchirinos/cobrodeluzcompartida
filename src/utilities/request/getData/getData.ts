import { axios } from '@/lib/axiosInstance'

type Args = {
  url: string
}

export async function getData<ResponseData>(args: Args): Promise<ResponseData> {
  const response = await axios.get<ResponseData>(args.url)

  return response.data
}
