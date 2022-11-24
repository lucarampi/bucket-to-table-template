import { BucketInfoType } from "../../typings";
import generateRowsFromBucketFolder from "../../utils/local_supabase/generateRowsFromBucketFolder";
import getDataFromBucketFolder from "../../utils/local_supabase/getDataFromBucketFolder";
import InsertButton from "./InsertButton";

export default async function Page() {
  //Localizanção dos arquivos
  const bucketInfo: BucketInfoType = {
    bucketName: "airbnb",
    folderName: "explore_nearby",
  };

  //Table onde serão adicionados os dados formatados
  const tableName = "example_table";

  //Retorna os primeiros 100 arquivos (em ordem alfabética crescente)
  //da pasta selecionada
  const bucketFiles = await getDataFromBucketFolder(bucketInfo);

  //Dados a serem vinculados as imagens
  //PS: Deve respeitar o formato do banco de dados
  const dataToInsert = [
    { time_distance: "1-hour drive" },
    { time_distance: "3-hour drive" },
    { time_distance: "30-minute drive" },
    { time_distance: "4.5-hour drive" },
    { time_distance: "7.5-hour drive" },
    { time_distance: "53-minute drive" },
    { time_distance: "12-hour drive" },
    { time_distance: "45-minute drive" },
  ];

  //Gera um array com as rows a serem adicionadas ao banco de dados SQL
  //Substitui title por 'location'
  const tableRows = generateRowsFromBucketFolder(
    bucketInfo,
    bucketFiles,
    dataToInsert,
    { replaceTitleFor: "location" }
  );


  return (
    <div className="flex flex-1 flex-col pt-4 px-8">
      <div className="grid sm:grid-cols-3 grid-cols-1 gap-6">
        <div className="flex justify-around shadow-md overflow-auto w-full flex-col gap-3 bg-gray-100 border-2 rounded-lg px-4 py-4">
          <div className="flex flex-col">
            <span className="font-medium">Supabase Credentials</span>
            <span className="text-red-500 text-xs font-medium">
              Set it on a .env.local file.
            </span>
          </div>
          <span className="text-xs break-all">
            NEXT_PUBLIC_SUPABASE_URL:
            <span className="block mt-1">
              {process.env.NEXT_PUBLIC_SUPABASE_URL ||
                "Add NEXT_PUBLIC_SUPABASE_URL to your .env.local file"}
            </span>
          </span>
          <hr />
          <span className="text-xs break-all  ">
            NEXT_PUBLIC_SUPABASE_URL:
            <span className="block mt-1">
              {process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
                "Add NEXT_PUBLIC_SUPABASE_ANON_KEY to your .env.local file"}
            </span>
          </span>
        </div>

        <div className="flex justify-around shadow-md overflow-auto w-full flex-col gap-3 bg-gray-100 border-2 rounded-lg px-4 py-4">
          <div className="flex flex-col">
            <span className="font-medium">Params</span>
            <span className="text-red-500 text-xs font-medium">
              Set it on your code.
            </span>
          </div>
          <span className="text-xs break-all  ">
            bucketName:
            <span className="block mt-1">
              {bucketInfo.bucketName ||
                "Add NEXT_PUBLIC_SUPABASE_ANON_KEY to your .env.local file"}
            </span>
          </span>
          <span className="text-xs break-all  ">
            folderName:
            <span className="block mt-1">
              {bucketInfo.folderName ||
                "Add NEXT_PUBLIC_SUPABASE_ANON_KEY to your .env.local file"}
            </span>
          </span>
          <span className="text-xs break-all  ">
            tableName:
            <span className="block mt-1">
              {tableName || "Please define the table you want to add the formated data."}
            </span>
          </span>
        </div>

        <div className="flex justify-around shadow-md overflow-auto w-full flex-col gap-3 bg-gray-100 border-2 rounded-lg px-4 py-4">
          <div className="flex flex-col">
            <span className="font-medium">Options</span>
            <span className="text-red-500 text-xs font-medium">
              Remember that you table need to have the same columns as the
              Formated Data items
            </span>
          </div>
          <div className="flex w-full gap-4 items-center justify-between">
            <button
              type="button"
              disabled
              className="rounded-md font-semibold w-1/2 border-2 border-blue-300 bg-blue-50 px-3 py-1"
            >
              Auto Search
            </button>
            <span className="w-1/2">
              Total files found: {bucketFiles?.length}
            </span>
          </div>

          <InsertButton tableName={tableName} tableRows={tableRows}/>
        </div>
      </div>

      <main className="grid grid-cols-2 w-full break-words pt-4">
        <div className="flex w-full pr-4 items-center flex-col gap-6">
          <div className="flex flex-col flex-wrap overflow-scroll w-full shadow-md gap-4 bg-gray-100 border-2 rounded-lg px-4 py-4">
            <div className="flex justify-start">
              <span>Data from Bucket:</span>
            </div>
            <pre>{JSON.stringify(bucketFiles, null, " ")}</pre>
          </div>
        </div>
        <div className="flex w-full pl-4 items-center flex-col gap-6">
          <div className="flex flex-col flex-wrap overflow-scroll w-full shadow-md gap-4 bg-gray-100 border-2 rounded-lg px-4 py-4">
            <div className="flex justify-start">
              <span>New formated data:</span>
            </div>
            <pre>{JSON.stringify(tableRows, null, " ")}</pre>
          </div>
        </div>
      </main>
    </div>
  );
}
