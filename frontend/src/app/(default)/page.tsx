"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Alert } from "@/shared/components/Alert";
import { createHistoricoAction, ICreateHistoricoAction } from "@/shared/server-actions/actions";
import { redirect } from "next/navigation";
import { useActionState, useEffect, useState } from "react";
import { MdClear, MdPause, MdPlayCircle } from "react-icons/md";

interface IDates {
  dataInicial: Date;
  dataFinal: Date;
  segundos: number;
}

export default function Home() {
  const [running, setRunning] = useState<boolean>(false);
  const [data, setData] = useState<IDates | null>(null);
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [elapsedTime, setElapsedTime] = useState<number>(0); // tempo em ms
  const [inputValue, setInputValue] = useState<string>("");
  const [alert, setAlert] = useState<boolean>(false);

  const [responseCreateHistorico, setResponseCreateHistorico] = useState<ICreateHistoricoAction | null>(null);

  const handleRegister = () => {
    if (!startDate) {
      // Primeiro clique: iniciar
      const now = new Date();
      setStartDate(now);
      setRunning(true);
    } else {
      // Segundo clique: finalizar
      const now = new Date();
      const diffMs = now.getTime() - startDate.getTime();
      const diffSec = diffMs / 1000;

      setData({
        dataInicial: startDate,
        dataFinal: now,
        segundos: diffSec,
      });

      setStartDate(null);
      setRunning(false);
      setElapsedTime(0);
    }
  };

  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (running && startDate) {
      interval = setInterval(() => {
        const now = new Date();
        const diffMs = now.getTime() - startDate.getTime();
        setElapsedTime(diffMs);
      }, 10); // Atualiza a cada 10ms para suavizar
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [running, startDate]);

  const formatElapsedTime = (ms: number) => {
    const seconds = Math.floor(ms / 1000);
    const milliseconds = ms % 1000;

    return `${seconds}.${milliseconds.toString().padStart(3, "0")}`;
  };

  const handleClear = () => {
    setData(null);
    setInputValue("");
    setElapsedTime(0);
    setStartDate(null);
    setRunning(false);
  }

  const [stateCreateJustificativa, formActionCreateJustificativa, isPendingCreateJustificativa] = useActionState(createHistoricoAction, null);

  useEffect(() => {

    if (stateCreateJustificativa?.errors) {

      setAlert(true);

      setResponseCreateHistorico({
        errors: {
          default: stateCreateJustificativa.errors.default,
          body: {
            apelido: stateCreateJustificativa.errors.body?.apelido,
            data_inicio: stateCreateJustificativa.errors.body?.data_inicio,
            data_fim: stateCreateJustificativa.errors.body?.data_fim
          }
        }
      });

      setTimeout(() => {
        setAlert(false);
        setResponseCreateHistorico(null);
      }, 2000);
    }

    if (stateCreateJustificativa?.success) {
      setAlert(true);

      setResponseCreateHistorico({
        success: {
          default: stateCreateJustificativa.success.default,
        },
      });

      setTimeout(() => {
        setAlert(false);
        setResponseCreateHistorico(null);
        redirect('/');
      }, 2000);
    }

  }, [stateCreateJustificativa]);

  return (
    <main className="flex flex-col">
      <div className="flex gap-2 h-[calc(100vh-56px)]">
        <Alert
          type={(responseCreateHistorico?.errors?.default || responseCreateHistorico?.errors?.default) ? 'danger' : 'sucess'}
          message={responseCreateHistorico?.errors?.default || responseCreateHistorico?.errors?.default || responseCreateHistorico?.success?.default || ''}
          view={(responseCreateHistorico?.errors?.default || responseCreateHistorico?.errors?.default || responseCreateHistorico?.success?.default) ? true : false}
        />
        <div className="w-full flex">
          <div className="max-w-[400px] w-full flex flex-col gap-4 items-center justify-center mx-auto">
            <h1>Deseja inserir um apelido?</h1>
            <Input onChange={(e) => setInputValue(e.target.value)} placeholder="Digite seu apelido" value={inputValue} />

            <form action={formActionCreateJustificativa}>

              {inputValue && <input type="hidden" name="apelido" id="apelido" value={inputValue} />}
              {data?.dataInicial && <input type="hidden" name="data_inicio" id="data_inicio" value={data.dataInicial.toISOString()} />}
              {data?.dataFinal && <input type="hidden" name="data_fim" id="data_fim" value={data.dataFinal.toISOString()} />}
              {data?.segundos && <input type="hidden" name="duracao" id="duracao" value={`${data.segundos.toFixed(3)} segundos`} />}

              <Button
                onClick={handleRegister}
                type={running ? "button" : "submit"}
                disabled={isPendingCreateJustificativa || alert}
                className="mt-4 cursor-pointer"
              >
                {running ? "Parar" : "Iniciar"}
                {running ? (
                  <span className="ml-2"><MdPause /></span>
                ) : (
                  <span className="ml-2"><MdPlayCircle /></span>
                )}
              </Button>
            </form>


            {/* Tempo real durante a contagem */}
            <p>
              <strong>Tempo atual:</strong>{" "}
              {running ? formatElapsedTime(elapsedTime) : "0.000"} segundos
            </p>

            {/* Tempo final após a parada */}
            {data && !running && (
              <>
                <div className="mt-4 text-center border rounded-lg p-6">
                  <h2 className="text-xl font-bold mb-4">Registro</h2>
                  {inputValue != "" && (
                    <p>
                      <strong>Apelido:</strong> {inputValue}
                    </p>
                  )}
                  <p><strong>Data Inicial:</strong> {data.dataInicial.toLocaleString()}</p>
                  <p><strong>Data Final:</strong> {data.dataFinal.toLocaleString()}</p>
                  <p><strong>Tempo decorrido:</strong> {data.segundos.toFixed(3)} segundos</p>
                </div>
                <Button
                  onClick={handleClear}
                  className="mt-4 cursor-pointer"
                  variant={'outline'}>
                  Limpar
                  <MdClear />
                </Button>
              </>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
