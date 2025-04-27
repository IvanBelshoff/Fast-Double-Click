import { HistoricoService } from "@/services/Historico/historicoService";
import { PageRegistros } from "@/shared/components/PageRegistros";
import Clear from "@/shared/components/search/Clear";
import { DateTimeRangePicker } from "@/shared/components/search/DateTimeRangePicker";
import Search from "@/shared/components/search/Search";
import { IHistorico } from "@/shared/interfaces";

interface IPagePedidosProps {
  searchParams?: Promise<{
    query?: string,
    sort?: string,
    dates?: string
  }>
}
export default async function Registros(props: IPagePedidosProps) {

  const searchParams = await props.searchParams;

  const sort = searchParams?.sort || undefined;
  const filter = searchParams?.query || undefined;
  const dates = searchParams?.dates || undefined;

  const result = await HistoricoService.getAll(filter, undefined, undefined, sort, dates);

  let registros: IHistorico[] = [];
  let totalCount = 0;

  if (result?.sucess) {
    registros = result.sucess.data
    totalCount = result.sucess.totalCount;
  }

  return (
    <main className="flex flex-col">
      <div className="flex gap-2 h-[calc(100vh-56px)] justify-center items-center overflow-hidden">

        <div className="w-[95%] max-h-[95%] flex flex-col gap-2 p-4 bg-paper border-primary border rounded-lg shadow-md overflow-y-auto">

          {totalCount > 0 && (
            <div className="flex h-auto w-full flex-1 gap-2 justify-center items-center ">
              <div className="w-1/2 flex gap-2 items-center">
                <Search placeholder="Pesquisar..." typeSearch="text" />
                {filter && <Clear />}
              </div>
              <div className="w-1/2 flex items-center">
                <DateTimeRangePicker />
              </div>
            </div>

          )}
          <PageRegistros
            registros={registros}
            heads={[
              { key: 'apelido', value: 'Apelido' },
              { key: 'data_inicio', value: 'Data Início' },
              { key: 'data_fim', value: 'Data Fim' },
              { key: 'data_registro', value: 'Data Registro' },
              { key: 'duracao', value: 'Duração' },
              { key: 'deletar', value: 'Deletar' },
            ]}
            idSort={sort?.split('.')[0]}
            orderSort={sort?.split('.')[1]}
          />

        </div>

      </div>
    </main >
  );
}
