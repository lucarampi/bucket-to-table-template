import supabase from "../../service/supabase";
import { BucketInfoType } from "../../typings";
import generateRowsFromBucketFolder from "./generateRowsFromBucketFolder";
import getDataFromBucketFolder from "./getDataFromBucketFolder";


const template = async () => {
    //Localizanção dos arquivos
    const bucketInfo: BucketInfoType = {
        bucketName: "your_bucket_name",
        folderName: "your_folder_name",
    };

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

    //Inserir no banco de dados SQL
    //   const res = await supabase.from('your_table_name').insert(tableRows)
    //   console.log(res)
}
