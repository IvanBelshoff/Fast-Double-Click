import { Api } from "@/app/api/services/api-config";
import { IHistorico } from "@/shared/interfaces";
import { isAxiosError } from "axios";

export interface IResponseError {
    message: string;
    code: number | undefined;
}

export interface IResponseErrosGeneric {
    response?: {
        data: {
            errors?: {
                default?: string
            }
        },
        status?: string
    }
}

export interface IHistoricoLoader {
    errors?: {
        default?: string,
        status?: number
    },
    sucess?: {
        data: IHistorico[];
        totalCount: number;
    }
}

export interface ILoaderHistorico {
    response?: {
        data: {
            errors?: {
                default?: string
            },

        }
    }
}

async function getAll(filter?: string, page?: string, limit?: string, sort?: string): Promise<IHistoricoLoader | undefined> {

    try {
        const res = await Api().get('/historico', {
            params: {
                filter: filter,
                page: page,
                limit: limit,
                sort: sort
            }
        });

        if (res.status == 200) {

            const data: IHistoricoLoader = {
                sucess: {
                    data: res.data,
                    totalCount: Number(res.headers['x-total-count'] || 0),
                }
            };

            return data;
        }

    } catch (error) {

        if (isAxiosError(error)) {

            const errors = (error as ILoaderHistorico).response?.data.errors;

            const responseError: IResponseError = {
                message: errors?.default || 'Erro ao consultar o registros.',
                code: error.code == 'ECONNREFUSED' ? 502 : error.response?.status
            };

            if (error.response?.status == 500 || error.code == 'ECONNREFUSED') {
                const error: IHistoricoLoader = {
                    errors: {
                        default: responseError.message,
                        status: responseError.code
                    },

                };

                return error;
            }


            const response: IHistoricoLoader = {
                errors: errors
            };
            // Retorno dos erros
            return response;

        }

        const errors = (error as IResponseErrosGeneric).response;

        const response: IHistoricoLoader = {
            errors: {
                default: errors?.data?.errors?.default || 'Erro ao consultar o registros.',
            }
        };

        return response;
    }

}

export const HistoricoService = {
    getAll
};