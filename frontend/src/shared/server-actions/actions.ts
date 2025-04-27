"use server";
import { Api } from "@/app/api/services/api-config";
import { isAxiosError } from "axios";
import { revalidatePath } from "next/cache";

export interface ICreateHistoricoAction {
    errors?: {
        default?: string
        body?: {
            apelido?: string,
            data_inicio?: string,
            data_fim?: string
            duracao?: string
        }
    }
    success?: {
        default?: string
    }
}

export interface IActionCreateHistorico {
    response: {
        data: {
            errors?: {
                default?: string
                body?: {
                    apelido?: string,
                    data_inicio?: string,
                    data_fim?: string
                    duracao?: string
                }
            }
        }
    }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function createHistoricoAction(prevState: any, formData: FormData) {

    try {

        const apelido = formData.get('apelido') as string;
        const data_inicio = formData.get('data_inicio') as string;
        const data_fim = formData.get('data_fim') as string;
        const duracao = formData.get('duracao') as string;

        const create = await Api().post('historico',
            {
                apelido: apelido != null ? apelido : undefined,
                data_inicio,
                data_fim,
                duracao
            }
        );

        if (create.status == 201) {

            const response: ICreateHistoricoAction = {
                success: {
                    default: 'Registro criado com sucesso',
                }
            };

            return response;

        }

    } catch (error) {

        if (isAxiosError(error)) {

            const errors = (error as IActionCreateHistorico).response?.data.errors;

            const response: ICreateHistoricoAction = {
                errors: {
                    default: errors?.default,
                    body: {
                        apelido: errors?.body?.apelido,
                        data_inicio: errors?.body?.data_inicio,
                        data_fim: errors?.body?.data_fim,
                        duracao: errors?.body?.duracao
                    }
                }
            };

            // Retorno de um objeto indicando que ocorreu um erro durante a recuperação de senha.
            return response;

        } else {

            const response: ICreateHistoricoAction = {
                errors: {
                    default: 'Erro desconhecido ao criar o histórico.'
                }
            };

            // Retorno de um objeto indicando que ocorreu um erro durante a recuperação de senha.
            return response;
        }
    }
    revalidatePath('/historico');
}


export interface IDeleteHistoricoByIdAction {
    errors?: {
        default?: string
    }
    success?: {
        default?: string
    }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function deleteHistoricoById(prevState: any, formData: FormData) {

    try {

        const id = formData.get('id') as string;

        const create = await Api().delete(`/historico/${id}`);

        if (create.status == 204) {

            const response: IDeleteHistoricoByIdAction = {
                success: {
                    default: 'Registro deletado com sucesso',
                }
            };

            return response;

        }

    } catch (error) {

        if (isAxiosError(error)) {

            const response: IDeleteHistoricoByIdAction = {
                errors: {
                    default: 'Erro ao deletar a registro.'
                }
            };

            // Retorno de um objeto indicando que ocorreu um erro durante a recuperação de senha.
            return response;

        } else {

            const response: IDeleteHistoricoByIdAction = {
                errors: {
                    default: 'Erro desconhecido ao deletar a registro'
                }
            };

            // Retorno de um objeto indicando que ocorreu um erro durante a recuperação de senha.
            return response;
        }
    }
    revalidatePath('/registros');
}