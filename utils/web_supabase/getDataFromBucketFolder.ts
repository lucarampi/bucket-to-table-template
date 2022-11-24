import { BucketInfoType } from "../../typings";
import { createClient, SupabaseClient } from "@supabase/supabase-js";



async function getDataFromBucketFolder(bucketInfo: BucketInfoType, supabase: SupabaseClient<any, "public", any> | undefined) {
    if (!supabase) return

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
    //Remove folders, and keep files.
    return data.filter((item) => !!item.id);
};

export default getDataFromBucketFolder