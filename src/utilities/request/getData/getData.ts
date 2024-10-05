import { axios } from '@/lib/axiosInstance'

type Args = {
  url: string
}

export async function getData<ResponseData>(args: Args): Promise<ResponseData> {
  const response = await axios.get<ResponseData>(args.url)

  // if response.data doesn't match ResponseData schema it will throw an error

  return response.data
}
