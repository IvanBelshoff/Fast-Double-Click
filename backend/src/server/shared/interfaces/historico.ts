

export interface IHistorico {
    id: string;
    apelido: string;
    data_inicio: Date;
    data_fim: Date;
    data_registro: Date;
    duracao: string;
}

export interface IHistoricoBody extends Omit<IHistorico, 'id' | 'data_registro' | 'apelido'> {
    apelido?: string;
}

export interface IGetAllHistoricoQuery {
    page?: number;
    limit?: number;
    filter?: string;
    sort?: string;
}