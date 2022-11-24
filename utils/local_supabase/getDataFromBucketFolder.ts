import supabase from "../../service/supabase";
import { BucketInfoType } from "../../typings";



async function getDataFromBucketFolder(bucketInfo:BucketInfoType) {
    const { data, error } = await supabase.storage
        .from(`${bucketInfo.bucketName}`)
        .list(`${bucketInfo.folderName}`, {
            offset: 0,
            sortBy: { column: "name", order: "asc" },
        });
    if (error) {
        console.error(error);
        return [];
    }
    return data;
};

export default getDataFromBucketFolder