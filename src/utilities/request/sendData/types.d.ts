type CommonAttributesResponse = { msg: string }

export type SuccesResponse<ResponseData> = { ok: true; data: ResponseData } & CommonAttributesResponse
export type ErrorResponse = { ok: false; data: null } & CommonAttributesResponse

type CustomResponse<ResponseData> = SuccesResponse<ResponseData> | ErrorResponse
